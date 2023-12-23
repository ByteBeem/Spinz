import React, { useState , useEffect } from "react";
import "./Signup.scss";
import logo from "../../assets/new.png";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Typed from 'typed.js';

function Signup() {

  useEffect(() => {
    var typed = new Typed(".typing", {
      strings: ["Sign up Now!", "Welcome to Spinz"],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true
    });
  }, []);

  const [formData, setFormData] = useState({
    full: "",
    surname: "",
    cellphone: "",
    ID: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    full: "",
    surname: "",
    cellphone: "",
    ID: "",
    password: "",
    confirmPassword: "",
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

  const validateID = (ID) => {
    const idRegex = /^[0-9]{13}$/;
    return idRegex.test(ID);
  };

  const CalcSumOfString = (valueToSum) => {
    var lengthOfString = valueToSum.length;
    var sumOfString = 0;
    for (var i = 0; i < lengthOfString; i++) {
      sumOfString += parseInt(valueToSum.substr(i, 1));
    }
    return sumOfString;
  };

  const SAIDCheck = (IdNumber, setErrors) => {
    var d1 = 0;
    var d2 = 0;
    var d3 = 0;
    var d4 = 0;
    var d5 = 0;
    var d6 = 0;
    var d7 = 0;
    var d8 = 0;
    var d9 = 0;
    var d10 = 0;
    var d11 = 0;
    var d12 = 0;
    var d13 = 0;
    var evsum = 0;
    var odsum = 0;
    var evnum1 = 0;
    var evnum2 = 0;
    var evnum3 = 0;
    var evnum4 = 0;
    var evnum5 = 0;
    var evnum6 = 0;
    var checkDigit = 0;
    if (IdNumber.length === 13) {
      d1 = parseInt(IdNumber.substr(0, 1), 10);
      d2 = parseInt(IdNumber.substr(1, 1), 10);
      d3 = parseInt(IdNumber.substr(2, 1), 10);
      d4 = parseInt(IdNumber.substr(3, 1), 10);
      d5 = parseInt(IdNumber.substr(4, 1), 10);
      d6 = parseInt(IdNumber.substr(5, 1), 10);
      d7 = parseInt(IdNumber.substr(6, 1), 10);
      d8 = parseInt(IdNumber.substr(7, 1), 10);
      d9 = parseInt(IdNumber.substr(8, 1), 10);
      d10 = parseInt(IdNumber.substr(9, 1), 10);
      d11 = parseInt(IdNumber.substr(10, 1), 10);
      d12 = parseInt(IdNumber.substr(11, 1), 10);
      d13 = parseInt(IdNumber.substr(12, 1), 10);
      evnum1 = d2 * 2;
      evnum2 = d4 * 2;
      evnum3 = d6 * 2;
      evnum4 = d8 * 2;
      evnum5 = d10 * 2;
      evnum6 = d12 * 2;
      evsum =
        CalcSumOfString(evnum1.toString()) +
        CalcSumOfString(evnum2.toString()) +
        CalcSumOfString(evnum3.toString()) +
        CalcSumOfString(evnum4.toString()) +
        CalcSumOfString(evnum5.toString()) +
        CalcSumOfString(evnum6.toString());
      odsum = d1 + d3 + d5 + d7 + d9 + d11;
      if ((evsum + odsum) % 10 === 0) checkDigit = 0;
      else checkDigit = 10 - ((evsum + odsum) % 10);

      return checkDigit === d13;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ID: "Invalid ID number" }));
      return false;
    }
  };

  const idValidationService = {
    checkNumber: (num) => {
      const result = {
        dob: null,
        age: null,
        gender: null,
        citizenship: null,
        race: null,
        error: null,
        isValid: null,
      };

      if (!validateID(num)) {
        result.error =
          "Invalid ID Number - does not match the required format.";
        return result;
      }

      const substrings = {
        dob: num.substring(0, 6),
        gender: num.substring(6, 7),
        citizenship: num.substring(10, 11),
        race: num.substring(11, 12),
      };

      const id = num;
      const yy = id.substring(0, 2);
      let cc = "19";
      if (parseInt(yy) <= moment().format("YY")) {
        cc = "20";
      }
      const ccyy = cc + yy;
      const mm = id.substring(2, 4);
      const dd = id.substring(4, 6);
      const dob = ccyy + "-" + mm + "-" + dd;
      result.dob = new Date(moment(dob, "YYYY-MM-DD"));
      result.age = moment().diff(dob, "years");

      if (isNaN(result.age)) {
        result.error = "Invalid ID Number - gender could not be determined";
        return result;
      }

      const genderDigit = parseInt(substrings.gender, 10);
      if (genderDigit >= 0 && genderDigit <= 4) result.gender = "Female";
      else if (genderDigit >= 5 && genderDigit <= 9) result.gender = "Male";
      else {
        result.error = "Invalid ID Number - gender could not be determined";
        return result;
      }

      const citizenshipDigit = parseInt(substrings.citizenship, 10);
      switch (citizenshipDigit) {
        case 0:
          result.citizenship = "SA Citizen";
          break;
        case 1:
          result.citizenship = "Non-SA Citizen";
          break;
        case 2:
          result.citizenship = "Refugee";
          break;
        default:
          result.error =
            "Invalid ID Number - citizenship could not be determined";
          return result;
      }

      const raceDigit = parseInt(substrings.race, 10);
      switch (raceDigit) {
        case 8:
          result.race = "White";
          break;
        case 9:
          result.race = "Black";
          break;
        default:
          result.race = null;
      }

      result.isValid = SAIDCheck(num);

      return result;
    },
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    } else if (
      password.length < 6 ||
      !/[0-9]/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      return "Password must be at least 6 characters long and contain both letters and numbers";
    }
    return "";
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      username: "",
      full: "",
      surname: "",
      cellphone: "",
      ID: "",
      password: "",
      confirmPassword: "",
    });

    // Validate the cellphone number
    if (!validateCellphone(formData.cellphone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: "Invalid cellphone number",
      }));
      setIsLoading(false);
      return;
    }

    if (
      !validateID(formData.ID) ||
      !idValidationService.checkNumber(formData.ID)
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, ID: "Invalid ID number" }));
      setIsLoading(false);
      return;
    }

    if (!SAIDCheck(formData.ID, setErrors)) {
      setErrors((prevErrors) => ({ ...prevErrors, ID: "Invalid ID number" }));
      setIsLoading(false);
      return;
    }

    // Validate the full name
    if (!validateName(formData.full)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        full: "Invalid full name. Use letters and spaces only",
      }));
      setIsLoading(false);
      return;
    }

    // Validate the surname
    if (!validateName(formData.surname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        surname: "Invalid surname. Use letters and spaces only",
      }));
      setIsLoading(false);
      return;
    }

    // Validate the password
    const passwordError = validatePassword(
      formData.password,
      formData.confirmPassword
    );
    if (passwordError) {
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
      setIsLoading(false);
      return;
    }

    const { username, full, surname, cellphone, ID, password } = formData;

    try {
      const response = await axios.post(
        "https://spinz-servers-17da09bbdb53.herokuapp.com/signup",
        {
          fullName: full,
          surname: surname,
          cell: cellphone,
          idNumber: ID,
          password: password,
        },
        { withCredentials: true }
      );

      setIsLoading(false);

      if (response.status === 200) {
        // Handle successful registration
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Account Opened Successfully! Login Now",
        }));
      } else if (response.status === 201) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cellphone: "Cellphone Already registered!",
        }));
      } else if (response.status === 208) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ID: "ID number Already registered!",
        }));
      }
    } catch (error) {
      setIsLoading(false);

      setErrors("Registration Error. Please try again later.");
    }
  };

  return (
    <div className="form">
      <div className="typing"></div>

      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="full">Full Name(s): </label>
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
            <label htmlFor="surname">Surname: </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            {errors.surname && (
              <p className="error-message">{errors.surname}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="cellphone">Cellphone: </label>
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
          <div className="input-group">
            <label htmlFor="ID">ID number: </label>
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
            <label htmlFor="password">Password: </label>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form_btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <div className="loading-spinner" />}
        </form>

        <div className="bottom">
          <span>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
