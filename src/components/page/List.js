import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './List.css';

export default function List() {
  const [tempList, setTempList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  const getList = () => { 
    axios.get("https://672c2c2a1600dda5a9f778f1.mockapi.io/students") 
    .then((response) => { 
        console.log(JSON.stringify(response.data)); 
        setTempList(response.data);
    }) 
    .catch((error) => { 
        console.log(error);
    }) 
  };

  // id를 state로 전달하도록 수정
  const goToUpdatePage = (id) => {
    navigate('/update', { state: { id: id } });
  };

  // 나머지 함수들은 동일
  const goToCreatePage = () => {
    navigate('/create');
  };

  const goToDetailPage = () => {
    navigate('/detail');
  };

  const deleteItem = (id) => {
    axios.delete(`https://672c2c2a1600dda5a9f778f1.mockapi.io/students/${id}`)
      .then(() => {
        setTempList(tempList.filter(item => item.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div>목록입니다!!</div>
      <div>
        {tempList.map((each) => (
          <div key={each.id}>
            <input value={each.name} readOnly />
            <button onClick={() => goToUpdatePage(each.id)}>수정</button>
            <button onClick={() => deleteItem(each.id)}>삭제</button>
          </div>
        ))}
      </div>
      <button onClick={getList}>
          call List
      </button>
      <button onClick={goToCreatePage}>
          create    
      </button>
      <button onClick={goToDetailPage}>
            detail
      </button>
    </>
  );
}
