import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../pages/types";
import axios from "axios";

const API_URL = "http://localhost:5005";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedBio, setUpdatedBio] = useState<string>("");

  const { userId } = useParams<{ userId: string }>();
  console.log(userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(`${API_URL}/users/${userId}`);
        setUser(response.data);
        setUpdatedBio(response.data.bio || "");
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateBio = async () => {
    if (!user) return;

    try {
      const updatedUser = await axios.put(`${API_URL}/users/${user.id}`, {
        bio: updatedBio,
      });
      setUser(updatedUser.data);
    } catch (error) {
      setError("Error updating user bio");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string;
        try {
          if (!userId) {
            console.error("User ID is missing");
            return;
          }
          const updatedUser = await axios.put(`${API_URL}/users/${userId}`, {
            image: imageBase64,
          });
          setUser(updatedUser.data);
        } catch (error) {
          setError("Error updating user image");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-darkgreen text-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <img
          src={user.image || "default-image-url.jpg"}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-lightgreen"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-semibold text-lightgreen">{user.name}</h1>
        <p className="text-lg">{user.email}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-medium text-lightgreen">Bio</h2>
        <textarea
          className="w-full p-2 mt-2 rounded-lg text-darkgreen"
          value={updatedBio}
          onChange={(e) => setUpdatedBio(e.target.value)}
          rows={4}
        />
        <button
          className="bg-darkgreen text-white p-2 rounded-lg mt-4 hover:bg-lightgreen"
          onClick={handleUpdateBio}
        >
          Update Bio
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-medium text-lightgreen">Profile Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-lightgreen rounded-lg mt-4"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
