import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

import firebase from "../firebase";

export default function SignUp() {
  const emailRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pw = passwordRef.current.value;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, pw);
      console.log("yay");
      history.push("/dashboard");
    } catch {
      setError("Failed to create an account");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="text" ref={emailRef}></input>
        </label>
        <label>
          password:
          <input type="password" ref={passwordRef}></input>
        </label>
        <label>
          confirm password:
          <input type="password" ref={passwordConfirmRef}></input>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}