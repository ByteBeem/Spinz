import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ cellphone: "", password: "" });
  const [formData, setFormData] = useState({ cellphone: "", password: "" });
  const authContext = useAuth();
 const navigate = useNavigate();
  

 const storeTokenInCookie = (token) => {
  document.cookie = `jwt=${token}; path=/; secure; HttpOnly`;
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
        "https://spinz-server-100d0276d968.herokuapp.com/login",
        { cell: cellphone, password },
        { withCredentials: true }
      );

      setIsLoading(false);

      if (response.status === 200) {
        const token = response.data.token;
        authContext.setToken(token);
        
        storeTokenInCookie(token);
        authContext.setUserData(response.data.Data);
        navigate("/dashboard");
        setErrors((prevState) => ({ ...prevState, password: "Login Successful!" }));
      } else if (response.status === 201) {
        setErrors((prevState) => ({ ...prevState, cellphone: "Incorrect Cellphone number" }));
      } else if (response.status === 202) {
        setErrors((prevState) => ({ ...prevState, password: "Incorrect Password" }));
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login Error:", error);
      setErrors((prevState) => ({
        ...prevState,
        password: "An error occurred. Please try again later."
      }));
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
            {errors.cellphone && <p className="error-message">{errors.cellphone}</p>}
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
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="form_btn" disabled={isLoading}>
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
