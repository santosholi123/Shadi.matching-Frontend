import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    console.log(email, password);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("roleId", response.data.user.roleId);
     

      if (response.status === 200) {
        // Assuming the response contains the userId and token
        const { userId, token } = response.data; 
        
        // Save userId and token in localStorage
        localStorage.setItem("authToken", token);

        alert("Login successful!");
        navigate("/dashboard");  // Redirect to Dashboard
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
  );
};

export default Login;
