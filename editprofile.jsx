import React, { useState } from "react";
import "./editprofile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    dob: "",
    bio: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", profile);
    alert("Profile Saved Successfully!");
  };

  return (
    <div className="profile-container">
      <h1>Edit Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={profile.fullName}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Date of Birth */}
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
          required
        />

        {/* Upload Picture */}
        <label htmlFor="profilePic">Upload Picture</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Bio */}
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Tell us about yourself"
          rows="4"
          value={profile.bio}
          onChange={handleChange}
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
