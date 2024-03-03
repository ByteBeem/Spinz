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
      .get("https://spinz-server-100d0276d968.herokuapp.com/paypal-client-id")
      .then((response) => {
        const clientId = response.data.clientId;
        localStorage.setItem("idclient", clientId);
        this.setState({ payPalClientId: clientId });
      })
      .catch((error) => {
        console.error("Error fetching PayPal client ID:", error);
      });
  }
  handleDeposit = () => {
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
    };

    axios
      .post("https://spinz-server-100d0276d968.herokuapp.com/deposit", requestBody, {
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

  createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "depositToSpinz",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        this.setState({ orderId });
        return orderId;
      });
  };

  onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      this.setState({ success: true });
    });
  };

  onError = () => {
    this.setState({ errorMessage: "Something went wrong" });
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
                    amount: 5000, 
                    currency: "ZAR", 
                    publicKey: 'pk_test_44509a0fdac95e27a8c42e8d591ec5550f08efc5',
                  }}
                />
              </div>
              <div className="info">
                <h2><b>International Method :</b> </h2>
                <PayPalScriptProvider
                  options={{
                    "client-id": payPalClientId,
                  }}
                >
                  {show ? (
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={this.createOrder}
                      onApprove={this.onApprove}
                      onError={this.onError}
                    />
                  ) : null}
                </PayPalScriptProvider>
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
