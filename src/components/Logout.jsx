// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Button onClick={handleLogout} type="primary">
      Logout
    </Button>
  );
};

export default Logout;
