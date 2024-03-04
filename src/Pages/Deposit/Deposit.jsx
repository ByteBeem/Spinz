import React, { Component } from "react";
import axios from "axios";
import "./Deposit.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { PaystackButton } from "react-paystack";


class Deposit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      loading: false,
      message: "",
      error: "",
      currentBalance: "0.00",
      paystackKey: "pk_test_44509a0fdac95e27a8c42e8d591ec5550f08efc5",
      show: true,
    };

    this.token = localStorage.getItem("token");
    this.idClient = localStorage.getItem("idclient");
  }

  handleDepositPayStack = () => {
    this.setState({ error: "", message: "", loading: true });

    if (!this.token) {
      this.setState({ error: "Token not found, please log in again.", loading: false });
      return;
    }

    const { amount } = this.state;

    if (isNaN(amount) || amount <= 0) {
      this.setState({ error: "Invalid amount", loading: false });
      return;
    }

    if (amount < 10) {
      this.setState({ error: "Minimum amount is R10", loading: false });
      return;
    }

    if (amount > 1000) {
      this.setState({ error: "Maximum amount is R1000", loading: false });
      return;
    }

    const requestBody = {
      amount: parseFloat(amount),
      email: 'bettingusers@spinz4bets.com',
    };

    axios
      .post("https://spinz-server-100d0276d968.herokuapp.com/pay", requestBody, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((response) => {
        this.setState({ message: `Redirecting...` });
        window.location.href = response.data.redirectUrl;
        this.setState({ amount: "" });
      })
      .catch((error) => {
        this.setState({ error: "Deposit failed. " + error.response.data.error });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };




  render() {
    const { amount, message, error, paystackKey } = this.state;
    const { showSidebar, active, closeSidebar } = this.props;


    return (
      <div className="deposit">
        <Sidebar active={active} closeSidebar={closeSidebar} />
        <div className="deposit_container">
          <Navbar showSidebar={showSidebar} />
          <div className="content">
            <div className="middle">
              <div className="deposit_form">
                <h2><b>Secure Method :</b> </h2>
                <div>
                  <label>Deposit Amount</label>
                  <br />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => this.setState({ amount: e.target.value })}
                    inputMode="numeric"
                  />

                  {message && <p className="success-message">{message}</p>}
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button className="form_btn" onClick={this.handleDepositPayStack}>
                  press
                </button>


                <PaystackButton
                  className="form_btn"
                  {...{
                    text: "Make Payment",
                    onSuccess: () => alert("Payment Successful"),
                    onClose: () => console.log('Closed'),


                    email: "bettingusers@spinz4bets.com",
                    amount: amount * 100,
                    currency: "ZAR",
                    publicKey: paystackKey,
                  }}
                />
              </div>


            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Deposit;
