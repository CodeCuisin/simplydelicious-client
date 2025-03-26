import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import "./profile.css";

const Profile: React.FC = () => {
  const { user } = useAuth(); 

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="user-profile">
      <div className="profile-card">
        <img src={user.image || "/default-user.png"} alt={user.name} className="profile-image" />
        <h2>{user.name}</h2>
        <p><b>Email:</b> {user.email}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
      </div>
      <Link to =""></Link>
      <button>Update</button>
    </div>
  );
};

export default Profile;