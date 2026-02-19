import React from 'react'
import logo from  '../../assets/logo.png'
const Dashboard = () => {
  const studentName = localStorage.getItem("studentName") || "Student";
  return (
    <div className='header-logo'>
      <img src={logo} alt="Dashboard" />
      <h2>Welcome,{studentName} </h2>
    </div>
  )
}

export default Dashboard