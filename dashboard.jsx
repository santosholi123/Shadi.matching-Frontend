import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId"); // Get roleId from localStorage
  console.log(roleId, userId);

  useEffect(() => {
    // Fetch logged-in user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${userId}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]); // Dependency on userId to refetch if it changes

  useEffect(() => {
    // Fetch all users from the backend API excluding the current logged-in user
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/all/");
        const data = await response.json();
        
        // Filter out the logged-in user
        const filteredUsers = data.filter(user => user.id !== userId);
        
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    if (roleId === "1") { // Only fetch users if the logged-in user is an admin
      fetchUsers();
    }
  }, [roleId, userId]); // Dependency array to re-fetch if roleId or userId changes

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Shaadi Matching</h2>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/editprofile">Edit Profile</Link></li>

          {/* Show Users link only for Admins */}
          {roleId === "2" && <li><Link to="/users">Users</Link></li>}
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome to Shaadi Matching</h1>
        </header>

        {/* Display Logged-in User Profile */}
        {profile && (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {profile.full_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <img src={profile.profilePic} alt="Profile" className="profile-img" />
          </div>
        )}

        {/* Display All Users (Only for Admins) */}
        {roleId === "1" && (
          <div className="users-list">
            <h2>All Users</h2>
            <div className="profile-cards">
              {users.map((user) => (
                <div key={user.id} className="profile-card">
                  <img src={user.profilePic} alt={user.full_name} className="profile-card-img" />
                  <div className="profile-card-body">
                    <h3>{user.full_name}</h3>
                    <p>{user.email}</p>
                    <Link to={`/profile/${user.id}`} className="view-profile-btn">View Profile</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
