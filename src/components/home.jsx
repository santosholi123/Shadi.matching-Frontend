import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your profile and explore Shaadi Matching.</p>
      </header>

      <section className="dashboard-section">
        <h2>Dashboard Overview</h2>
        <p>
          This is your personal dashboard where you can view and update your profile, 
          browse other users, and manage your account settings.
        </p>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <ul>
          <li><strong>Edit Profile:</strong> Update your personal details and preferences.</li>
          <li><strong>View Profiles:</strong> Browse potential matches and connect with them.</li>
          <li><strong>Logout:</strong> Securely sign out of your account.</li>
        </ul>
      </section>

      <section className="cta-section">
        <h2>Get Started</h2>
        <p>Explore your matches and update your profile to get better recommendations.</p>
        <Link to="/edit-profile" className="cta-button">Edit Profile</Link>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Shaadi Matching. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
