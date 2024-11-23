import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Detail.css';

export default function Detail() {
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    axios.get('https://672c2c2a1600dda5a9f778f1.mockapi.io/students')
      .then(response => {
        setDetailData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (detailData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Page</h1>
      {detailData.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Grade: {item.grade}</p>
          <p>City: {item.city}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}