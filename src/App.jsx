import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import EditProfile from "./components/editprofile"; // Import EditProfile.jsx
import ViewMatches from "./components/view";
import Profile from "./components/profile"; // Import Profile.jsx
import Home from "./components/home";
import "./App.css";  
import UserTable from "./components/UserTable";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editprofile" element={<EditProfile />} /> {/* Corrected Component Name */}
        <Route path="/view-matches" element={<ViewMatches />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/home" element={<Home />} />

        
        
        </Routes>
    </Router>
  );
}

export default App; 