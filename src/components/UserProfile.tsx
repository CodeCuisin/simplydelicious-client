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
  console.log("User ID from URL:", userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(`${API_URL}/users/${userId}`);
        setUser(response.data);
        setUpdatedBio(response.data.bio || "");
        setError(null);
      } catch (err) {
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      // 🔹 Upload to Cloudinary
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      const imageUrl = uploadRes.data.secure_url;

      // 🔹 Update user profile with new image URL
      const updatedUser = await axios.put(`${API_URL}/users/${userId}`, {
        image: imageUrl,
      });

      setUser(updatedUser.data);
    } catch (error) {
      setError("Error updating user image");
    }
  };

  if (loading) return <div className="text-white text-center text-lg mt-10">Loading...</div>;

  if (error) return <div className="text-red-500 text-center text-lg mt-10">{error}</div>;

  if (!user) return <div className="text-white text-center text-lg mt-10">User not found</div>;

  return (
    <div className="min-h-screen bg-darkgreen flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-green-900 text-white p-8 rounded-xl shadow-lg">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.image || "default-image-url.jpg"}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-lightgreen shadow-lg"
          />
          <h1 className="text-3xl font-bold text-lightgreen mt-4">{user.name}</h1>
          <p className="text-lg text-gray-300">{user.email}</p>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-lightgreen">Bio</h2>
          <textarea
            className="w-full p-3 mt-2 rounded-md text-darkgreen bg-white border border-lightgreen"
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            rows={4}
          />
          <button
            className="w-full bg-lightgreen text-darkgreen font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-500 transition"
            onClick={handleUpdateBio}
          >
            Update Bio
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-lightgreen">Profile Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full bg-white text-darkgreen border border-lightgreen rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
