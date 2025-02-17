import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Shaadi Matching</h2>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li> {/* New Profile Link */}
          <li><Link to="/editprofile">Edit Profile</Link></li>
          <li><Link to="/view-matches">View Matches</Link></li>
          {/* Add Profile Link here */}
          
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome to Shaadi Matching</h1>
        </header>

       
       
      </main>
    </div>
  );
};

export default Dashboard;
