import React, { useState } from "react";
import "./Betslip.css";

const Betslip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [selectedBets, setSelectedBets] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBetAmountChange = (event) => {
    setBetAmount(Number(event.target.value));
  };

  const handleAddToBetslip = (bet) => {
    // Implement your logic to add a bet to the betslip
    setSelectedBets([...selectedBets, bet]);
  };

  const handleSubmitBet = () => {
    // Implement your logic to submit the bet
    console.log(`Submitting bet with amount: ${betAmount}`);
    console.log("Selected Bets:", selectedBets);
  };

  return (
    <div className="betslip">
      <button onClick={openModal}>Betslip</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Your betslip content goes here */}
            <h2>Bet Slip</h2>

            {/* Example content: Selected bets */}
            <p>Selected Bets:</p>
            <ul>
              {selectedBets.map((bet, index) => (
                <li key={index}>{bet}</li>
              ))}
            </ul>

            {/* Bet amount input */}
            <label htmlFor="betAmount">Bet Amount:</label>
            <input
              type="number"
              id="betAmount"
              value={betAmount}
              onChange={handleBetAmountChange}
            />

            {/* Example content: Bet summary */}
            <p>Bet Summary:</p>
            <p>Total Bets: {selectedBets.length}</p>
            <p>Total Amount: {betAmount}</p>

            {/* Submit button */}
            <button onClick={handleSubmitBet}>Submit Bet</button>

            {/* Close button */}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Betslip;
