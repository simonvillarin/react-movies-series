import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../context/EmailContext";
import Logo from "../../public/assets/images/logo.png";

const InputOtp = () => {
  const { emailContext } = useContext(EmailContext);
  const navigate = useNavigate();
  const storedOtp = localStorage.getItem("otp");

  const [alert, setAlert] = useState({
    isOpen: false,
    variant: "success",
    message: "",
  });
  const { isOpen, variant, message } = alert;

  let initVal = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const sendOTP = (values) => {
    const otpValues = Object.values(values).join("");
    if (otpValues == JSON.parse(storedOtp).otp) {
      setAlert({
        ...alert,
        isOpen: true,
        variant: "success",
        message: "OTP validation successful!",
      });
    } else {
      setAlert({
        ...alert,
        isOpen: true,
        variant: "error",
        message: "OTP validation failed!",
      });
    }
  };

  const sendOTPSchema = yup.object().shape({
    otp1: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
    otp2: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
    otp3: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
    otp4: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
    otp5: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
    otp6: yup
      .number("Must be a number!")
      .min(0, "Must be 1 digit!")
      .max(9, "Must be 1 digit!")
      .required("Number is required!"),
  });

  const handleClose = () => {
    setAlert({ ...alert, isOpen: false });
    if (isOpen && variant == "success") {
      navigate("/reset-password");
    }
  };

  return (
    <React.Fragment>
      <AppBar elevation={0}>
        <Toolbar>
          <Container>
            <Box className="nav">
              <img src={Logo} className="logo" onClick={() => navigate("/")} />
              <Box className="landing-right-nav">
                <div onClick={() => navigate("/signup")}>Sign Up</div>
                <div>|</div>
                <div onClick={() => navigate("/login")}>Login</div>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box className="container signup-container">
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
        <Paper elevation={5}>
          <Box className="sign-up-container">
            <Typography variant="h5" sx={{ mb: 2 }}>
              Enter One Time Pin
            </Typography>
            <Box>
              <Formik
                initialValues={initVal}
                validationSchema={sendOTPSchema}
                onSubmit={sendOTP}
              >
                <Form>
                  <Box className="form-group">
                    <Typography variant="body2">
                      Enter the code that we sent to your email {emailContext}
                    </Typography>
                    <Box className="otp-input-container">
                      <Field className="otp-input" name="otp1" type="text" />
                      <Field className="otp-input" name="otp2" type="text" />
                      <Field className="otp-input" name="otp3" type="text" />
                      <Field className="otp-input" name="otp4" type="text" />
                      <Field className="otp-input" name="otp5" type="text" />
                      <Field className="otp-input" name="otp6" type="text" />
                    </Box>
                    <ErrorMessage name="otp1">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <ErrorMessage name="otp2">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <ErrorMessage name="otp3">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <ErrorMessage name="otp4">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <ErrorMessage name="otp5">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <ErrorMessage name="otp6">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <button
                      type="submit"
                      className="login-btn"
                      style={{ marginTop: "1rem" }}
                    >
                      Submit
                    </button>
                    <Snackbar
                      autoHideDuration={2000}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={isOpen}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity={variant}
                        sx={{ width: "100%" }}
                      >
                        {message}
                      </Alert>
                    </Snackbar>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default InputOtp;
