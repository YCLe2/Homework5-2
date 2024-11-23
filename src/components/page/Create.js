import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function Create() {
  const [formData, setFormData] = useState({ name: '', age: '', grade: '', city: '' });
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const gradeRef = useRef(null);
  const cityRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateInput = (ref, name) => {
    if (!ref.current.value) {
      alert(`${name} is required`);
      return false;
    }
    if (name === 'age' && isNaN(ref.current.value)) {
      alert('Valid age is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(nameRef, 'Name') && validateInput(ageRef, 'Age') &&
        validateInput(gradeRef, 'Grade') && validateInput(cityRef, 'City')) {
      // API 호출하여 데이터 저장
      axios.post('https://672c2c2a1600dda5a9f778f1.mockapi.io/students', formData)
        .then(response => {
          console.log('Created:', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div>Create</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            ref={ageRef}
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            ref={gradeRef}
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            ref={cityRef}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}