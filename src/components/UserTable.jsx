import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./UserTable.css"; // Import CSS for styling

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // State for editing user

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/all");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditUser(user);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited user
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/update/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Update user list with edited data
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{user.full_name || "N/A"}</td>
                <td>{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-users">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Overlay (Modal) */}
      {editUser && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <h3>Edit User</h3>
            <label>
              Full Name:
              <input type="text" name="full_name" value={editUser.full_name} onChange={handleInputChange} />
            </label>
            <label>
              DOB:
              <input type="date" name="dob" value={editUser.dob} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editUser.email} onChange={handleInputChange} />
            </label>
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditUser(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Prop validation
UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      full_name: PropTypes.string,
      dob: PropTypes.string,
      email: PropTypes.string,
    })
  ),
};

export default UserTable;
