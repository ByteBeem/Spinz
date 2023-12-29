import React from 'react';
import './Forex.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import ForexChart from './ForexChart';

const Forex = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div className="forex">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="forex_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">

          <ForexChart />
        </div>
      </div>
    </div>
  );
};

export default Forex;
