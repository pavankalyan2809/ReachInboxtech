
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/OneBoxDetail.css';

const OneBoxDetail = () => {
  const { threadId } = useParams();
  const [threadData, setThreadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchThreadData = async () => {
      try {
        const response = await axios.get(`/onebox/${threadId}`);
        setThreadData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchThreadData();
  }, [threadId]);

  const handleBack = () => {
    navigate('/onebox');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="onebox-detail-container">
      <button onClick={handleBack} className="back-button">Back to List</button>
      <div className="thread-detail">
        <h1>{threadData.title}</h1>
        <p>{threadData.content}</p>
      
      </div>
    </div>
  );
};

export default OneBoxDetail;
