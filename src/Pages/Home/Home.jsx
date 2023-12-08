// import React, { useState, useEffect } from "react";
// import "./Home.css";
// import Typed from "typed.js";

// const backgroundStyle = {
//   backgroundImage:
//     'url("https://www.elegantthemes.com/blog/wp-content/uploads/2013/09/bg-10-full.jpg")',
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
// };

// const Home = () => {
//   useEffect(() => {
//     // Typed text animation script
//     var typed = new Typed(".startButtonText", {
//       strings: ["Welcome", "Play & Win", "Deposit Now", "Instant Withdrawals"],
//       typeSpeed: 100,
//       backSpeed: 60,
//       loop: true,
//     });

//     return () => {
//       // Clean up Typed instance on component unmount
//       typed.destroy();
//     };
//   }, []);

//   const logout = () => {
//     // Implement your logout logic here
//   };

//   return (
//     <div className="container" style={backgroundStyle}>
//       <div className="home-container">
//         <div className="user-info">
//           <div className="user-label">Account</div>
//           <div className="user-name">Donald</div>
//         </div>
//         <div className="balance-info">
//           <div className="balance-label">Balance</div>
//           <div className="balance">R50</div>
//         </div>
//         <button className="deposit-button">Deposit</button>
//       </div>
//       <div className="home-typo">
//         <h3>
//           <p className="startButtonText"></p>
//         </h3>
//       </div>
//       <div className="home-info">
//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Slot machine game</h2>
//         </section>
//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Word Puzzzle game</h2>
//         </section>
//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Profile</h2>
//         </section>

//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Activities</h2>
//         </section>

//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Withdraw</h2>
//         </section>

//         <section className="section" style={{ backgroundColor: "darkgrey" }}>
//           <h2>Log Out</h2>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";

const Home = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div className="home">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="home_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
          <div className="games_slider">
            <div className="game_box"></div>
            <div className="game_box"></div>
            <div className="game_box"></div>
            <div className="game_box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
