import React, { useState } from 'react';
import axios from 'axios';

const CreateReport = () => {
  const [formData, setFormData] = useState({
    placeOfDisappearance: '',
    name: '',
    age: '',
    gender: '',
    disappearanceDate: '',
    phoneOfReporter: '',
    description: '',
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });
  if (photo) {
    data.append('photo', photo);  // Ensure photo is added correctly
  }

    try {
      // Send the token as part of the request (via cookies)
      const response = await axios.post('http://localhost:9000/api/missing-reports/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      alert('Report created successfully!');
    } catch (error) {
      console.error('Error creating report:', error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="placeOfDisappearance"
        placeholder="Place of Disappearance"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        required
      />
      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        name="disappearanceDate"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneOfReporter"
        placeholder="Phone of Reporter"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <input type="file" name="photo" onChange={handleFileChange} required />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default CreateReport;
