import React, { useState, useContext, useEffect } from "react";
import emailjs from "@emailjs/browser";
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
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../context/EmailContext";
import { getAllUsers } from "../services/UserService";
import * as yup from "yup";
import Logo from "../../public/assets/images/logo.png";

const SendEmail = () => {
  const navigate = useNavigate();
  const { setEmailContext } = useContext(EmailContext);
  const [users, setUsers] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const [emailDetails, setEmailDetails] = useState({
    to_name: "77 Movie User",
    otp: Math.floor(Math.random() * 900000 + 100000),
    to_email: "",
  });

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  let initVal = {
    to_email: "",
  };

  const sendEmail = (values) => {
    let findUser = users.find((user) => user.email == values.to_email);

    if (findUser) {
      emailDetails.to_email = values.to_email;
      setEmailContext(values.to_email);
      emailjs
        .send(
          "service_bgfpb19",
          "template_9t1dcjn",
          emailDetails,
          "IKV-P9TmX79QWtFxH"
        )
        .then(
          (result) => {
            setIsSent(true);
            let otp = {
              otp: emailDetails.otp,
              id: findUser.id,
            };

            localStorage.setItem("otp", JSON.stringify(otp));
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      setIsError(true);
    }
  };

  const sendEmailSchema = yup.object().shape({
    to_email: yup
      .string()
      .email("Invalid email!")
      .required("Email is required!"),
  });

  const handleClose = () => {
    setIsSent(false);
    navigate("/type-otp");
  };

  const handleCloseError = () => {
    setIsError(false);
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
              Send OTP
            </Typography>
            <Box>
              <Formik
                initialValues={initVal}
                onSubmit={sendEmail}
                validationSchema={sendEmailSchema}
              >
                <Form>
                  <Box className="form-group">
                    <Typography variant="body2">Email</Typography>
                    <Field
                      className="login-input"
                      name="to_email"
                      type="text"
                    />
                    <ErrorMessage name="to_email">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <button
                      type="submit"
                      className="login-btn"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Send OTP
                    </button>
                    <Snackbar
                      autoHideDuration={2000}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={isSent}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        An OTP has been sent to your email
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      autoHideDuration={2000}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={isError}
                      onClose={handleCloseError}
                    >
                      <Alert
                        onClose={handleCloseError}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Email does not exist in our database
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

export default SendEmail;
