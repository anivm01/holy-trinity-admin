import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utilities/api";
import axios from "axios";
import { LoggedInUpdate } from "../../utilities/LoggedInContext";
import "./Login.scss";

function Login() {
  const changeLoggedIn = LoggedInUpdate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmailInput(event.target.value);
  };

  const changePassword = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.email.value || !event.target.password.value) {
      setIsLoginError(true);
      setErrorMessage("Make sure to fill out all the fields");
      return;
    }

    const userInfo = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const login = async () => {
      try {
        const response = await axios.post(`${API_URL}/users/login`, userInfo);
        if (!response.data) {
          setIsLoginError(true);
          setErrorMessage(
            "Something went wrong. Check your email and password and try again!"
          );
          return;
        }
        sessionStorage.setItem("authToken", response.data.token);
        changeLoggedIn();
        navigate("/");
      } catch (error) {
        setIsLoginError(true);
        console.log(error);
        if (!error.response.data.message) {
          setErrorMessage("Something went wrong. Try again later");
        }
        setErrorMessage(error.response.data.message);
      }
    };
    login();
  };
  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__fields">
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          className={`login__input ${emailInput ? "login__input--filled" : ""}`}
          type="email"
          name="email"
          onChange={changeEmail}
          value={emailInput}
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          className={`login__input ${
            passwordInput ? "login__input--filled" : ""
          }`}
          type="password"
          name="password"
          onChange={changePassword}
          value={passwordInput}
        />
      </div>
      {isLoginError && <h2 className="login__error">{errorMessage}</h2>}
      <input type="submit" className="button" name="submit" />
    </form>
  );
}

export default Login;
