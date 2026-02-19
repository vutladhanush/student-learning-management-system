import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
     
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 

    navigate('/login');
  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};
