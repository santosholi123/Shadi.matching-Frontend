import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editprofile.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const userID= localStorage.getItem('userId');

 

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePhoto: '',
    dob: '',
    bio: '',
    phoneNumber: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user data when the component mounts or userID changes
  useEffect(() => {
    if (userID) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${userID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });

          setUserData({
            name: response.data.full_name,
            email: response.data.email,
            profilePhoto: response.data.profilePic,
            dob: response.data.dob,
            bio: response.data.bio,
            phoneNumber: response.data.phoneNumber,
          });
        } catch (error) {
          setError('Error fetching profile data');
        }
      };

      fetchUserData();
    }
  }, [userID]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', userData.name);
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('dob', userData.dob);
    formData.append('bio', userData.bio);

    if (file) {
      formData.append('profilePic', file);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/update/${userID}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-picture-container">
          <div className="profile-pic-preview">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Profile"
                className="profile-pic"
              />
            ) : userData.profilePhoto ? (
              <img
                src={userData.profilePhoto}
                alt="Profile"
                className="profile-pic"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=random&color=ffffff&size=100`}
                alt="Default Avatar"
                className="profile-picture"
              />
            )}
          </div>
          <label htmlFor="fileInput" className="file-label">Change Picture</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
