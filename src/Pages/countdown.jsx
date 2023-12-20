import React from 'react';
import './ComingSoon.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const ComingSoon = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div className="coming-soon-container">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <Navbar showSidebar={showSidebar} />
      <div className="coming-soon-content">
       
        <p>
          Get ready for a groundbreaking addition to our platform! 📈 Our upcoming Forex trading service brings you the opportunity to let us handle the trading for you, with profits delivered within 24 hours.
        </p>
        <div className="how-it-works">
          <h2>💹 How It Works:</h2>
          <ul>
            <li>Deposit: Start with a minimum investment of R200.</li>
            <li>Sit Back: Let our automated trading system work its magic.</li>
            <li>Profit: Enjoy your earnings delivered straight to your account within 24 hours.</li>
          </ul>
        </div>
        <div className="why-trust-us">
          <h2>🚀 Why Trust Us with Your Trades?</h2>
          <ul>
            <li>Expertise: Our team of experienced traders manages your investments.</li>
            <li>Automation: Cutting-edge technology ensures swift and accurate trading decisions.</li>
            <li>Transparency: Track your progress and earnings seamlessly on our platform.</li>
          </ul>
        </div>
       

        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default ComingSoon;
