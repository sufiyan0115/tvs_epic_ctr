import { useState, useEffect, useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { API_URL } from "../../config/constants";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, user } = useAuth();

  const authCtx = useAuth();

  const submitHandler = (event: any) => {
    event.preventDefault();
    const values = {
      password,
      email,
    };
    login(values);
  };

  const emailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const nameChange = (event: any) => {
    setName(event.target.value);
  };
  const passwordChange = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input type="name" id="name" required onChange={nameChange} />
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required onChange={emailChange} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChange}
            required
          />
        </div>
        <div>
          <button>{"Create Account"}</button>
          <button type="button">{"Create new account"}</button>
        </div>
      </form>
      <a href="/">Home</a>
    </section>
  );
};

export default AuthForm;
