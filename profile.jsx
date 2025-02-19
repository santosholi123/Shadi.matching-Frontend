import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./styles.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to other routes

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate back to the Dashboard
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
          <p><strong>Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Back to Dashboard button */}
      <button onClick={handleBackToDashboard} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
