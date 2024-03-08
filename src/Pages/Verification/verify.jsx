import React, { useState } from "react";
import "./verify.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

function DocumentSubmitter({ showSidebar, active, closeSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
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

    if (!document) {
      setError("Please upload the required document.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("document", document);
    formData.append("token", token);

    try {
      const response = await axios.post("https://spinzserver-e34cd148765a.herokuapp.com/submitDocument", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        setMessage("Document submitted successfully.");
      } else {
        setError(response.data.message || "An error occurred while submitting the document.");
      }
    } catch (error) {
      setError("An error occurred while submitting the document.");
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
          <div className="form">
            <div>
              <label htmlFor="documentType">Document Type</label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">Select Document Type</option>
                <option value="ID">ID Document</option>
                <option value="Bank Statement">Bank Statement</option>
              </select>
            </div>
            <div>
              <label htmlFor="document">Upload Document</label>
              <input
                type="file"
                id="document"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setDocument(e.target.files[0])}
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
  );
}

export default DocumentSubmitter;
