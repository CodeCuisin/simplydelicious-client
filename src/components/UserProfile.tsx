import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../utils/user.routes";
import { User } from "../pages/types";
import { useAuth } from "../context/auth.context";
import { uploadToCloudinary } from "./CreateRecipe";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedBio, setUpdatedBio] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(Number(userId));
        if (data) {
          setUser(data);
          setUpdatedBio(data.bio || "");
        } else {
          setError("User not found");
        }
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
      const updatedUser = await updateUser(user.id, { bio: updatedBio });
      setUser(updatedUser);
    } catch (error) {
      setError("Error updating bio");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    try {
      const imageUrl = await uploadToCloudinary(file);
      const updatedUser = await updateUser(Number(userId), { image: imageUrl });
      setUser(updatedUser);
    } catch (error) {
      setError("Error updating user image");
    }
  };

  if (loading)
    return (
      <div className="text-white text-center text-lg mt-10">Loading...</div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center text-lg mt-10">{error}</div>
    );
  if (!user)
    return (
      <div className="text-white text-center text-lg mt-10">User not found</div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-darkgreen p-4">
      <div className="bg-green-900 text-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.image || "default-image-url.jpg"}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-lightgreen shadow-lg object-cover"
          />
          <h1 className="text-3xl font-bold text-lightgreen mt-4">
            {user.name}
          </h1>
          <p className="text-lg text-gray-300">{user.email}</p>

          {user.bio && <p className="text-md text-gray-300 mt-4">{user.bio}</p>}
        </div>

        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold text-lightgreen">Bio</h2>
          <textarea
            className="w-full p-3 mt-2 rounded-md text-darkgreen bg-lightgreen border border-lightgreen resize-none"
            value={updatedBio || ""}
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

        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold text-lightgreen">
            Profile Image
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full bg-white text-darkgreen  bg-lightgreen border border-lightgreen rounded-lg cursor-pointer"
          />
        </div>

        {loggedInUser && user.id === loggedInUser.id && (
          <div className="mt-6 flex gap-4">
            <button className="w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
            <button className="w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
