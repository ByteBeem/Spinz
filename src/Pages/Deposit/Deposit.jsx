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
      paystackKey: '', 
    };

    this.token = localStorage.getItem("token");
    this.idClient = localStorage.getItem("idclient");
  }

  componentDidMount() {
    axios
      .get("https://spinz-server-100d0276d968.herokuapp.com/pay")
      .then((response) => {
        const paystackKey = response.data.paystackKey;
        localStorage.setItem("paystackKey", paystackKey);
        this.setState({ paystackKey });
      })
      .catch((error) => {
        console.error("Error fetching Paystack public key:", error);
      });
  }

  handleDeposit = () => {
    // Handle deposit logic here
  };

  render() {
    const { amount, loading, message, error, currentBalance, paystackKey } = this.state;
    const { showSidebar, active, closeSidebar } = this.props;

    return (
      <div className="deposit">
        <Sidebar active={active} closeSidebar={closeSidebar} />
        <div className="deposit_container">
          <Navbar showSidebar={showSidebar} />
          <div className="content">
            <div className="middle">
              <div className="info">
                <h2><b>Paystack Method :</b> </h2>
                <PaystackButton
                  className="paystack-button"
                  {...{
                    text: "Make Payment",
                    onSuccess: (response) => console.log(response),
                    onClose: () => console.log('Closed'),
                    onError: (error) => console.error('Error:', error),
                    email: "user@example.com",
                    amount: 5000, // amount in kobo
                    publicKey: 'pk_test_44509a0fdac95e27a8c42e8d591ec5550f08efc5',
                  }}
                />
              </div>
              <div className="info">
                <h2><b>International Method :</b> </h2>
                {/* Add your international payment method component here */}
              </div>
              <div className="deposit_form">
                <h2><b>SA Local bank :</b> </h2>
                <div>
                  <label>Deposit Amount</label>
                  <br />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => this.setState({ amount: e.target.value })}
                    inputMode="numeric"
                  />
                  <button
                    className="form_btn"
                    onClick={this.handleDeposit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Deposit"}
                  </button>
                  {message && <p className="success-message">{message}</p>}
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Deposit;
