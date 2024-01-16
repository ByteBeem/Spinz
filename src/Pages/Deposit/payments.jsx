import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deposit.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payments({ showSidebar, active, closeSidebar }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentBalance, setCurrentBalance] = useState("0.00");

  const token = localStorage.getItem("token");

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "https://spinz-server-100d0276d968.herokuapp.com/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 206) {
        alert("Token Expired, Please Login again!");
      } else {
        setCurrentBalance(response.data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    setShow(true);
    fetchBalance();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://spinz-server-100d0276d968.herokuapp.com/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
          setCurrentBalance(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, []);

  const handleDeposit = () => {
    setError("");
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount");
      setLoading(false);
      return;
    }

    const requestBody = {
      amount: parseFloat(amount),
    };

    axios
      .post(
        "https://spinz-server-100d0276d968.herokuapp.com/depositPaypal",
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setMessage(`Redirecting...`);
        window.location.href = response.data.redirectUrl;
        setAmount("");
      })
      .catch((error) => {
        setError("Deposit failed. " + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [orderId, setOrderId] = useState(false);

  const createOrder = (data, actions) => {
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
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("Something went wrong");
  };

  return (
    <div className="deposit">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="deposit_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
                        <PayPalScriptProvider
                options={{
                  "client-id": "Aft3OCQujzt42-4_EAtWyIeLnZ-RsLynG4BbhVztRHfKHLe2OxPEl3a1HakXW1b4ASv1YCsUaOjLgm-A",
                }}
              >
                {show ? (
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                ) : null}
              </PayPalScriptProvider>
          <div className="middle">
            <div className="deposit_form">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
