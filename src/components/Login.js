import React, { useState, useEffect } from 'react';
import logo from '../assets/new.png';
import './styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const { setToken, setUserData } = useAuth();

  const [errors, setErrors] = useState({
    cellphone: '',
    password: '',
  });
  

  const [formData, setFormData] = useState({
    cellphone: '',
    password: '',
  });

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
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
      
      cellphone: '',
      
      password: '',
      
    });

   
    if (!validateCellphone(formData.cellphone)) {
        setErrors((prevErrors) => ({ ...prevErrors, cellphone: 'Invalid cellphone number' }));
        setIsLoading(false);
        return;
      }

   
    const { cellphone,password } = formData;

    try {
        const response = await axios.post('https://heavenly-onyx-bun.glitch.me/login', {
          
          cell: cellphone,
          
          password: password,
        });
      
        
      
        setIsLoading(false);
      
        if (response.status === 200) {
          setToken(response.data.token);
          storeTokenInLocalStorage(response.data.token);
         
     setUserData(response.data.Data)
     
            navigate('/dashboard');
          
          setErrors((prevErrors) => ({ ...prevErrors, password: ' Successfully! ' }));
        } else if (response.status === 201) { 
          setErrors((prevErrors) => ({ ...prevErrors, cellphone: 'Incorrect Cellphone number' }));
        }
        else if (response.status === 202) { 
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Incorrect Password' }));
          }
      } catch (error) {
        setIsLoading(false);
       
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Registration Error. Please try again later.' }));
        
      }
    }   

  return (
    <div className="signup-container">
      <h2>Log In</h2>
      <img src={logo} className="small-logo" alt="logo" />
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>

        {isLoading && <div className="loading-spinner" />}

      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p>
       Forgot Password? <Link to="/reset">Reset</Link>
      </p>
    </div>
  );
}

export default Login;
