import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deposit.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "./modal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const ButtonTable = ({ Buttons }) => {
  return (
    <table className="minesTable">
      <tbody>
        <tr>
          <td>
            {/* Assuming MinesSection is a component you have */}
            <MinesSection title="Red Mines" buttons={Buttons} />
          </td>
          <td className="verticalLine"></td>
        </tr>
      </tbody>
    </table>
  );
};

const DepositSection = ({ decideButtons }) => {
  const PaymentsButtons = [
    { label: "Paypal", onClick: () => decideButtons("Paypal") },
    { label: "Stripe", onClick: () => decideButtons("Stripe") },
    { label: "Crypto", onClick: () => decideButtons("Crypto") },
    { label: "SALocalBank", onClick: () => decideButtons("SALocalBank") },
  ];

  return (
    <div className="deposit-section">
      <ButtonTable Buttons={PaymentsButtons} />
    </div>
  );
};

function Deposit({ showSidebar, active, closeSidebar }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        alert("Token Expired. Please log in again!");
      } else {
        setCurrentBalance(response.data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
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
        setShow(true);
        setHide(true);
        setAmount("");
      })
      .catch((error) => {
        setError("Deposit failed. " + error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  const createOrder = (data, actions) => {
    setShowModal(true);
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

  const decideButtons = (label) => {
    setModalContent({ label });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="deposit">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="deposit-container">
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
            <div className="deposit-form">
              {hide ? (
                <div>
                  <h3>Deposit Funds</h3>
                  <label>Deposit Amount</label>
                  <br />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputMode="numeric"
                  />
                  <button
                    className="form-btn"
                    onClick={handleDeposit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Deposit"}
                  </button>
                  {message && (
                    <p className="success-message">{message}</p>
                  )}
                  {error && <p className="error-message">{error}</p>}
                </div>
              ) : null}
            </div>
            {showModal ? null : <div className="div"></div>}
          </div>
          <DepositSection showModal={openModal} decideButtons={decideButtons} />
          {showModal && (
            <Modal visible={showModal} closeModal={closeModal} content={modalContent} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Deposit;
