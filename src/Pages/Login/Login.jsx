import React, { useState , useRef} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.scss";

const Login = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const apiKey = process.env.REACT_APP_SERVER;
  const [recaptcha , setRecaptcha] = useState('');
  const newRecaptcha = useRef(null);;

  const saveTokenLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  function onChange(value) {
   
    setRecaptcha(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValidEmail = validateemail(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValidEmail ? "" : "Invalid email",
    }));
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    const isValidPassword = validatePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValidPassword ? "" : "Password must be at least 6 characters long and contain both letters and numbers",
    }));
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[0-9]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };


  const validateemail = (email) => {
    const emailRegex = new RegExp(
      "^(?!\\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    return emailRegex.test(email);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "" });

    const { email, password } = formData;

    if (!validateemail(email)) {
      setErrors({ email: "Invalid email " });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiKey}/login`, {
        email: email,
        password,
      });

      setIsLoading(false);

      if (response.status === 200) {
        saveTokenLocalStorage(response.data.token);

        window.location.href = "https://www.spinz4bets.co.za";

      } else if (response.status === 201) {
        setErrors({ email: "Incorrect email " });
        newRecaptcha.current.reset();
      } else if (response.status === 202) {
        setErrors({ password: "Incorrect Password" });
        newRecaptcha.current.reset();
      }
    } catch (error) {
      setIsLoading(false);
      newRecaptcha.current.reset();

      setErrors({
        password: "An error occurred. Please try again later.",
        
      });
    }
  };

  return (
    isOpen && (
      <div className="error-modal-overlay">
        <div className="login">
          <div className="login_container">
            <button className="close-button" onClick={onClose}>
              X
            </button>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? "error-input" : "valid-input"}
                />

                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChangePassword}
                  required
                  className={errors.password ? "error-input" : "valid-input"}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
              <ReCAPTCHA
              ref={newRecaptcha}
                sitekey="6LeTx8opAAAAAHER1oOMaYEoI4OxnuCY8a_vE_pa"
                onChange={onChange}
              />,
              <button
                type="submit"
                className={`form_btn ${Object.values(errors).some((error) => error) ? "disabled" : ""
                  }`}
                disabled={
                  isLoading || Object.values(errors).some((error) => error)
                }
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
      </div>
    )
  );
};

export default Login;
