import React, { Component } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: { cellphone: "", password: "" },
      formData: { cellphone: "", password: "" }
    };

    this.navigate = useNavigate();
    this.authContext = useAuth();
  }

  storeTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  };

  validateCellphone = (cellphone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cellphone);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, errors: { cellphone: "", password: "" } });

    const { cellphone, password } = this.state.formData;

    if (!this.validateCellphone(cellphone)) {
      this.setState({
        errors: { cellphone: "Invalid cellphone number" },
        isLoading: false
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://spinz-server-100d0276d968.herokuapp.com/login",
        { cell: cellphone, password },
        { withCredentials: true }
      );

      this.setState({ isLoading: false });

      if (response.status === 200) {
        this.authContext.setToken(response.data.token);
        this.storeTokenInLocalStorage(response.data.token);
        this.authContext.setUserData(response.data.Data);
        this.navigate("/dashboard");
        this.setState((prevState) => ({
          errors: { ...prevState.errors, password: "Login Successful!" }
        }));
      } else if (response.status === 201) {
        this.setState((prevState) => ({
          errors: { ...prevState.errors, cellphone: "Incorrect Cellphone number" }
        }));
      } else if (response.status === 202) {
        this.setState((prevState) => ({
          errors: { ...prevState.errors, password: "Incorrect Password" }
        }));
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.error("Login Error:", error);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          password: "An error occurred. Please try again later."
        }
      }));
    }
  };

  render() {
    const { isLoading, errors, formData } = this.state;

    return (
      <div className="login">
        <div className="login_container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="cellphone">Cellphone</label>
              <input
                type="text"
                id="cellphone"
                name="cellphone"
                value={formData.cellphone}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
  }
}

export default Login;
