import React from 'react';
import "./tic.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const TicTacToeComponent = ({ showSidebar, active, closeSidebar }) => {
  return (
    <>
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <Navbar showSidebar={showSidebar} />
      <div className="container main">
        <div className="board-area">
          <table className="board">
            <tbody>
              <tr>
                <td className="space text-center empty" id="space-0"></td>
                <td className="space text-center empty" id="space-1"></td>
                <td className="space text-center empty" id="space-2"></td>
              </tr>
              <tr>
                <td className="space text-center empty" id="space-3"></td>
                <td className="space text-center empty" id="space-4"></td>
                <td className="space text-center empty" id="space-5"></td>
              </tr>
              <tr>
                <td className="space text-center empty" id="space-6"></td>
                <td className="space text-center empty" id="space-7"></td>
                <td className="space text-center empty" id="space-8"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="selection-area hide-me">
          <h3>Play As:</h3>
          <button className="btn" id="X">X</button>
          <button className="btn" id="O">O</button>
        </div>
        <div className="message-area hide-me">
          <h3 className="message">You Lose.</h3>
          <button className="btn" id="replay">Play Again</button>
        </div>
      </div>
    </>
  );
};

export default TicTacToeComponent;
