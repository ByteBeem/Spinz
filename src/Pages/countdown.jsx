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
        <h1>🌐 Coming Soon: Automated Forex Trading at Your Fingertips!</h1>
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
        <p>
          🌍 Global Markets, Local Convenience: Explore global markets hassle-free while we handle the complexities. Your journey into Forex trading is about to become effortless.
        </p>
        <p>
          🔒 Secure and Swift Payouts: Rest assured, your profits are secure, and withdrawals are processed promptly. Our commitment is to provide you with a seamless and secure trading experience.
        </p>
        <p>
          📆 Countdown to Profits: The clock is ticking! Prepare for a new era of hassle-free Forex trading. Stay tuned for the official launch date and join us on this exciting venture.
        </p>
        <p>
          🔥 Subscribe for Updates: Don't miss out on the latest developments! Subscribe to our newsletter and stay in the loop for exclusive insights, promotions, and more.
        </p>
        <p>
          Get ready to experience the future of Forex trading – effortless, profitable, and coming soon to [Your Website Name]! 💰🌐
        </p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default ComingSoon;
