import React from "react";
import { Link } from "react-router-dom";
import "./terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Last Updated: February 26, 2025</p>
      </header>

      <section className="terms-content">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Shaadi Matching! By accessing our website, you agree to
          comply with these terms and conditions.
        </p>

        <h2>2. User Responsibilities</h2>
        <p>
          - You must be at least 18 years old to use our service. <br />
          - You agree to provide accurate and truthful information. <br />
          - You will not misuse the platform for fraudulent activities.
        </p>

        <h2>3. Privacy Policy</h2>
        <p>
          Your privacy is important to us. Please read our Privacy Policy to
          understand how we handle your data.
        </p>

        <h2>4. Account Security</h2>
        <p>
          You are responsible for maintaining the security of your account.
          Please do not share your login credentials with others.
        </p>

        <h2>5. Prohibited Activities</h2>
        <p>
          - No spamming or harassment of other users. <br />
          - No fake profiles or misleading information. <br />
          - No sharing of inappropriate content.
        </p>

        <h2>6. Termination of Service</h2>
        <p>
          We reserve the right to suspend or terminate your account if you
          violate these terms.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions, feel free to contact us at
          support@shaadimatching.com.
        </p>
      </section>

      <div className="terms-actions">
        <Link to="/" className="back-button">Back to Home</Link>
        <button className="agree-button">I Agree</button>
      </div>
    </div>
  );
};

export default Terms;
