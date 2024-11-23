import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Update.css';

export default function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // 전달된 id를 받아옴

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    grade: "",
    city: "",
  });

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [updateCount, setUpdateCount] = useState(0); // 총 수정 횟수

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get("https://672c2c2a1600dda5a9f778f1.mockapi.io/students")
      .then((response) => {
        const data = response.data.find((item) => item.id === id); // 특정 ID 데이터 찾기
        if (data) {
          setFormData(data); // 데이터 설정
        } else {
          console.error("해당 ID에 맞는 데이터를 찾을 수 없습니다.");
        }
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("데이터 로드 중 오류:", error);
        setLoading(false); // 로딩 완료
      });
  }, [id]);

  // 입력 변경 시 실시간으로 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 상태 업데이트
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // 수정 횟수 증가
    setUpdateCount((prevCount) => prevCount + 1);

    // 서버에 실시간 반영
    axios
      .put("https://672c2c2a1600dda5a9f778f1.mockapi.io/students", {
        ...formData,
        [name]: value,
      })
      .then((response) => {
        console.log("실시간 업데이트 성공:", response.data);
      })
      .catch((error) => {
        console.error("실시간 업데이트 중 오류:", error);
      });
  };

  const goBackToList = () => {
    navigate("/list");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>수정 페이지</h1>
      <div>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>나이:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>학년:</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>도시:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <p>총 수정 횟수: {updateCount}</p>
      </div>
      <button onClick={goBackToList}>Back to List</button>
    </div>
  );
}
