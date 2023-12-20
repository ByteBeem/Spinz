import React from 'react';
import './ComingSoon.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const ComingSoon = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div className="coming-soon-container">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <Navbar showSidebar={showSidebar} />
      <h1>Coming Soon</h1>
      <p>We're working hard to bring you something amazing. Stay tuned!</p>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default ComingSoon;
