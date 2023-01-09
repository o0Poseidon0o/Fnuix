import React from "react";
import Container from "../../UI/Container";
import BlueContainer from "../../UI/BlueContainer";
import "./Register.css";

// Cấu trúc component Register
const Register = () => {
  return (
    <BlueContainer>
      <Container className="register">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <form>
          <input type="text" placeholder="Your Email"></input>
          <button type="submit">Subcrible</button>{" "}
        </form>
      </Container>
    </BlueContainer>
  );
};

export default Register;
