import "./wallet.scss";
import "../../App.scss";
import React from 'react';
import { Link } from 'react-router-dom'; 

const wallet = ({ balance }) => {
  return (
    <div className="account_info">
      <span>Account Balance:</span>
      <div className="balance">{`R${balance}`}</div>

      <Link className="form_btn" to="/withdraw">
        Withdraw
      </Link>
      <Link className="form_btn" to="/deposit">
        Deposit
      </Link>
    </div>
  );
};

export default wallet;