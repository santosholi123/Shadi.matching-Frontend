import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
const Profile = () => {
  const { id } = useParams(); // Retrieve the user ID from the URL
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile based on ID
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/profile/${id}`);
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div className="profile-page">
      {userProfile ? (
        <div className="profile-details">
          <h1>{userProfile.full_name}</h1>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>phoneNumber:</strong> {userProfile.phoneNumber}</p>
          <p><strong>Date of Birth:</strong> {userProfile.dob}</p>
          <p><strong>Bio:</strong> {userProfile.bio}</p>
          <img src={userProfile.profilePic} alt="Profile" className="profile-img" />
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
