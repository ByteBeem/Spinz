import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import "./Login.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ cellphone: "", password: "" });
  const [formData, setFormData] = useState({ cellphone: "", password: "" });
  const navigate = useNavigate();
  const authContext = useAuth();

  const saveTokenLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateCellphone = (cellphone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cellphone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ cellphone: "", password: "" });

    const { cellphone, password } = formData;

    if (!validateCellphone(cellphone)) {
      setErrors({ cellphone: "Invalid cellphone number" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.SERVER_API}/login`,
        { cell: cellphone, password }
      );

      setIsLoading(false);

      if (response.status === 200) {
        saveTokenLocalStorage(response.data.token);
        authContext.setAuthState(true); 
        navigate("/dashboard");
      } else if (response.status === 201) {
        setErrors({ cellphone: "Incorrect Cellphone number" });
      } else if (response.status === 202) {
        setErrors({ password: "Incorrect Password" });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login Error:", error);
      setErrors({
        password: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cellphone">Cellphone</label>
            <input
              type="text"
              id="cellphone"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              required
              inputMode="numeric"
            />
            {errors.cellphone && (
              <p className="error-message">{errors.cellphone}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="form_btn"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          {isLoading && <div className="loading-spinner" />}
        </form>
        <div className="bottom">
          <span>
            Don't have an account?{" "}
            <Link className="link" to="/signup">
              Signup
            </Link>
          </span>
          <span>
            Forgot Password?{" "}
            <Link className="link" to="#">
              Reset
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
