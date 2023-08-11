import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Logo from "../../assets/ecomotriz/LogoEcomotriz.svg";
import { LoginForm } from "../../components/loginform/LoginForm";
// import { HomeButton } from "../../components/home-button/HomeButton";

import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.loginPageContainer}>
      <Container fluid="md">
        <Row className="text-center justify-content-center">
          <Col md className={styles.logoContainer}>
            <img src={Logo} alt="logo" className={styles.logoImg} />
          </Col>
          <Col xs={8} sm={6} md className={styles.loginFormContainer}>
            <LoginForm />
          </Col>
        </Row>
      </Container>

      {/* <HomeButton /> */}
    </div>
  );
};
