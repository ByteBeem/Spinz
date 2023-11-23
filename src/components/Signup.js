import React, { useState } from 'react';
import './styles/Signup.css';
import logo from '../assets/new.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    full: '',
    surname: '',
    cellphone: '',
    ID: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    full: '',
    surname: '',
    cellphone: '',
    ID: '',
    password: '',
    confirmPassword: '',
  });

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

  const validateID= (ID) => {
  
    const phoneRegex = /^[0-9]{13}$/;
    return phoneRegex.test(ID);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    } else if (password.length < 6 || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      return 'Password must be at least 6 characters long and contain both letters and numbers';
    }
    return '';
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      username: '',
      full: '',
      surname: '',
      cellphone: '',
      ID: '',
      password: '',
      confirmPassword: '',
    });

    // Validate the cellphone number
    if (!validateCellphone(formData.cellphone)) {
      setErrors((prevErrors) => ({ ...prevErrors, cellphone: 'Invalid cellphone number' }));
      setIsLoading(false);
      return;
    }

    if (!validateID(formData.ID)) {
      setErrors((prevErrors) => ({ ...prevErrors, ID: 'Invalid ID number' }));
      setIsLoading(false);
      return;
    }

    // Validate the username
    if (!validateName(formData.username)) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Invalid username. Use letters and spaces only' }));
      setIsLoading(false);
      return;
    }

    // Validate the full name
    if (!validateName(formData.full)) {
      setErrors((prevErrors) => ({ ...prevErrors, full: 'Invalid full name. Use letters and spaces only' }));
      setIsLoading(false);
      return;
    }

    // Validate the surname
    if (!validateName(formData.surname)) {
      setErrors((prevErrors) => ({ ...prevErrors, surname: 'Invalid surname. Use letters and spaces only' }));
      setIsLoading(false);
      return;
    }

    // Validate the password
    const passwordError = validatePassword(formData.password, formData.confirmPassword);
    if (passwordError) {
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
      setIsLoading(false);
      return;
    }

    const { username, full, surname, cellphone, ID, password } = formData;

    try {
        const response = await axios.post('https://heavenly-onyx-bun.glitch.me/signup', {
          fullName: full,
          surname: surname,
          cell: cellphone,
          idNumber: ID,
          password: password,
        });
      
        console.log(response.status);
        console.log(response.data.error); // Use response.data.error
      
        setIsLoading(false);
      
        if (response.status === 200) {
          // Handle successful registration
          setErrors((prevErrors) => ({ ...prevErrors, password: 'Account Opened Successfully! Login Now' }));
        } else if (response.status === 201) { 
          setErrors((prevErrors) => ({ ...prevErrors, cellphone: 'Cellphone Already registered!' }));
        }
        else if (response.status === 208) { 
          setErrors((prevErrors) => ({ ...prevErrors, ID: 'ID number Already registered!' }));
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Registration error:', error);
        setErrors('Registration Error. Please try again later.');
      }
    }      

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <img src={logo} className="small-logo" alt="logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="full">Full Name(s)</label>
          <input
            type="text"
            id="full"
            name="full"
            value={formData.full}
            onChange={handleChange}
            required
          />
          {errors.full && <p className="error-message">{errors.full}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          {errors.surname && <p className="error-message">{errors.surname}</p>}
        </div>
        <div className="input-group">
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
        <div className="input-group">
          <label htmlFor="ID">ID number</label>
          <input
            type="numeric"
            id="ID"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            required
            inputMode="numeric"
          />
          {errors.ID && <p className="error-message">{errors.ID}</p>}
        </div>
        <div className="input-group">
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
        {isLoading && <div id="loading-indicator" className="loading-indicator"></div>}
      </form>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  );
}

export default Signup;
