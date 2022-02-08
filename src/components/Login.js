import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const googleLoginHandlear = () => {
    loginWithGoogle((response) => {
      if (response.msg) {
        navigate("/home");
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <Section>
      <div>
        <LoginTitle>Login Now</LoginTitle>
        <Form>
          <input
            type="text"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </Form>
        <GoogleLogin onClick={googleLoginHandlear}>
          <img src="images/google.svg" alt="google svg" />
          Login with Google
        </GoogleLogin>
      </div>
    </Section>
  );
};

const Section = styled.section`
  width: 500px;
  margin: auto;
  padding: 20px 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  @media (max-width: 728px) {
    width: 95%;
  }
  margin-top: 100px;
  background-color: white;
`;
const LoginTitle = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 30px;
`;

const Form = styled.form`
  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    margin-bottom: 15px;
    font-size: 18px;
    outline: none;
  }
  button {
    padding: 9px 0;
    font-size: 18px;
    margin-bottom: 15px;
    width: 100%;
    background-color: #209cee;
    border: none;
    color: white;
    &:hover {
      background-color: #278acb;
      cursor: pointer;
    }
  }
`;
const GoogleLogin = styled.button`
  width: 100%;
  padding: 8px 0;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  border: 1px solid #4285f4;
  background-color: white;
  &:hover {
    background-color: #4285f459;
    border: 1px solid #4285f459;
  }
  img {
    pointer-events: none;
  }
`;

export default Login;
