import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    axios.get('http://localhost:9000/api/user/profile', {
      withCredentials: true, // Include credentials
    })
      .then(response => setUserData(response.data))
      .catch(error => console.error("Error fetching profile data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:9000/api/user/profile', userData, {
      withCredentials: true, // Include credentials
    })
      .then(response => {
        alert('Profile updated successfully!');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <label>Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        {/* Add other fields as required */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
