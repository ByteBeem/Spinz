import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUserData } = useAuth();

  const [errors, setErrors] = useState({
    cellphone: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    cellphone: "",
    password: "",
  });

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCellphone = (cellphone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cellphone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      cellphone: "",

      password: "",
    });

    if (!validateCellphone(formData.cellphone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: "Invalid cellphone number",
      }));
      setIsLoading(false);
      return;
    }

    const { cellphone, password } = formData;

    try {
      const response = await axios.post(
        "https://warm-honored-cuticle.glitch.me/login",
        {
          cell: cellphone,
          password: password,
        },
        { withCredentials: true }
      );

      setIsLoading(false);

      if (response.status === 200) {
        setToken(response.data.token);
        storeTokenInLocalStorage(response.data.token);

        setUserData(response.data.Data);

        navigate("/dashboard");

        setErrors((prevErrors) => ({
          ...prevErrors,
          password: " Successfully! ",
        }));
      } else if (response.status === 201) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cellphone: "Incorrect Cellphone number",
        }));
      } else if (response.status === 202) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Incorrect Password",
        }));
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "An error occurred. Please try again later.",
      }));
    }
  };

  return (
    <div className="login">
      <h1>Login to your Spinz Account</h1>

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
          <button type="submit" className="login_btn" disabled={isLoading}>
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
            <Link className="link" to="/reset">
              Reset
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
