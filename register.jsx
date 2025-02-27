import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dob: "",
    bio: "",
    profilePic: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isStrongPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/");
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup Form</h1>
      <p>Let's Create Your Account</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange}  />

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <textarea name="bio" placeholder="Tell us about yourself" rows="4" value={formData.bio} onChange={handleChange}></textarea>
        <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} />
        <button className="signup-button" type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
      <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;