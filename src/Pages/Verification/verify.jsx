import React, { useState } from "react";
import "./verify.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

function DocumentSubmitter({ showSidebar, active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [idDocument, setIdDocument] = useState("");
  const [bankStatement, setBankStatement] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    setSuccessMessage(null);
    const token = localStorage.getItem("token");
    if(!token){
      setError("You need to log in first!");
      setIsLoading(false);
      return;
    }

    if (!idDocument && !bankStatement) {
      setError("Please upload at least one document.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    if (idDocument) {
      formData.append("documentType", "ID");
      formData.append("document", idDocument);
    }
    if (bankStatement) {
      formData.append("documentType", "Bank Statement");
      formData.append("document", bankStatement);
    }
    formData.append("token", token);

    try {
      const response = await axios.post("https://spinzserver-e34cd148765a.herokuapp.com/submitDocument", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        setMessage("Document(s) submitted successfully.");
      } else {
        setError(response.data.message || "An error occurred while submitting the document(s).");
      }
    } catch (error) {
      setError("An error occurred while submitting the document(s).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="document-submitter">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="document-submitter_container">
        <Navbar showSidebar={showSidebar} />

        <div className="content">
        <div className="div_space">
            
          <div className="form">
            <div>
              <label htmlFor="idDocument">Upload ID Document</label>
              <input
                type="file"
                id="idDocument"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setIdDocument(e.target.files[0])}
              />
            </div>
            <div>
              <label htmlFor="bankStatement">Upload Bank Statement</label>
              <input
                type="file"
                id="bankStatement"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setBankStatement(e.target.files[0])}
              />
            </div>
            <button
              className="form_btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DocumentSubmitter;
