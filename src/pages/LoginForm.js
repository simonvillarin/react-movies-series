import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Paper,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { SlLock } from "react-icons/Sl";
import { FiEye, FiEyeOff } from "react-icons/Fi";
import * as yup from "yup";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { login, getUserId, getUserById } from "../services/UserService";
import { createSession } from "../services/UserService";
import { UserContext } from "../context/UserContext";
import Logo from "../../public/assets/images/logo.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(UserContext);
  const [hasError, setHasError] = useState(false);

  const initVal = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    login(values)
      .then((res1) => {
        getUserId()
          .then((res2) => {
            getUserById(res2.data, res1.data.token)
              .then((res3) => {
                let user = {
                  id: res3.data.id,
                  firstName: res3.data.firstName,
                  lastName: res3.data.lastName,
                  email: res3.data.email,
                  username: res3.data.username,
                };

                createSession(res1.data.token, user);
                setIsUserLoggedIn(true);
                navigate("/home");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
    resetForm({ values: "" });
  };

  const signInSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
  });

  return (
    <React.Fragment>
      <AppBar elevation={0}>
        <Toolbar>
          <Container>
            <Box className="nav">
              <img src={Logo} className="logo" onClick={() => navigate("/")} />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Box className="container">
        <Box className="custom-shape-divider-top">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </Box>

        <Paper elevation={5} sx={{ m: 2 }}>
          <Box className="login-container">
            <Box className="left-login">
              <Typography variant="h4" className="login-title">
                Sign in
              </Typography>
              <Box className="login-icon">
                <SlLock />
              </Box>
              <Formik
                initialValues={initVal}
                validationSchema={signInSchema}
                onSubmit={handleSubmit}
              >
                <Form className="form">
                  {hasError ? (
                    <div style={{ width: "20rem" }}>
                      <Alert
                        open={hasError}
                        onClose={() => {
                          setHasError(false);
                        }}
                        severity="error"
                        sx={{ width: "100%" }}
                      >
                        Invalid Credentials!
                      </Alert>
                    </div>
                  ) : null}
                  <Box className="form-group">
                    <Typography variant="body2">Username </Typography>

                    <Field
                      className="login-input"
                      name="username"
                      type="text"
                    />
                    <ErrorMessage name="username">
                      {(msg) => (
                        <Typography variant="subtitle2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Box>

                  <Box className="form-group">
                    <Typography variant="body2">Password</Typography>
                    <Box className="password-container">
                      <Field
                        className="login-input"
                        name="password"
                        type={showPassword ? "text" : "password"}
                      />
                      <Box className="password-icons">
                        {showPassword ? (
                          <FiEye onClick={() => setShowPassword(false)} />
                        ) : (
                          <FiEyeOff onClick={() => setShowPassword(true)} />
                        )}
                      </Box>
                    </Box>
                    <ErrorMessage name="password">
                      {(msg) => (
                        <Typography variant="subtitle2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Box>
                  <span onClick={() => navigate("/send-otp")}>
                    Forgot Password?
                  </span>
                  <button type="submit" className="login-btn">
                    Sign In
                  </button>
                </Form>
              </Formik>
            </Box>
            <Box className="right-login">
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Join us!
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Have a lot of free time? Discover amazing shows with us.
                </Typography>
                <button
                  type="submit"
                  className="sign-up-btn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
