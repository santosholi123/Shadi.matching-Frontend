import React, { useState, useEffect } from "react";
import "./view.css";
import { useNavigate } from "react-router-dom";

const ViewMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = () => {
      const sampleMatches = [
        {
          id: 1,
          name: "Priya Sharma",
          age: 26,
          country: "India",
          image: "https://via.placeholder.com/150",
          instagram: "priya_sharma26",
        },
        {
          id: 2,
          name: "Rahul Verma",
          age: 28,
          country: "USA",
          image: "https://via.placeholder.com/150",
          instagram: "rahul_v28",
        },
        {
          id: 3,
          name: "Anjali Mehta",
          age: 25,
          country: "UK",
          image: "https://via.placeholder.com/150",
          instagram: "anjali_mehta25",
        },
      ];
      setMatches(sampleMatches);
    };

    fetchMatches();
  }, []);

  return (
    <div className="matches-container">
      <h1>View Matches</h1>
      <div className="matches-list">
        {matches.map((match) => (
          <div className="match-card" key={match.id}>
            <img src={match.image} alt={match.name} />
            <h3>{match.name}</h3>
            <p>Age: {match.age}</p>
            <p>Country: {match.country}</p>
            <p>
              Instagram:{" "}
              <a
                href={`https://www.instagram.com/${match.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-link"
              >
                @{match.instagram}
              </a>
            </p>
            <button className="connect-btn">Connect</button>
          </div>
        ))}
      </div>

      {/* Back to Dashboard Button */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewMatches;
