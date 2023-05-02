import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/Fi";
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
import { updatePassword } from "../services/UserService";
import { getAllUsers } from "../services/UserService";
import Logo from "../../public/assets/images/logo.png";

const ResetPassword = () => {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  let initVal = {
    password: "",
    confirmPassword: "",
  };

  const resetPassSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Must be atleast 6 characters!")
      .max(60, "Cannot exceed 60 characters!")
      .required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password does not match!")
      .required("Confirm Password is required!"),
  });

  const resetPass = (values) => {
    let otp = localStorage.getItem("otp");

    if (otp) {
      let findUser = users.find((user) => user.id == JSON.parse(otp).id);
      if (findUser) {
        updatePassword(findUser.id, values)
          .then(() => {
            setAlert(true);
          })
          .catch(() => {
            navigate("/login");
          });
      }
      localStorage.removeItem("otp");
    } else {
      localStorage.removeItem("otp");
      navigate("/login");
    }
  };

  const handleClose = () => {
    setAlert(false);
    navigate("/login");
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
              Reset Password
            </Typography>
            <Box>
              <Formik
                initialValues={initVal}
                validationSchema={resetPassSchema}
                onSubmit={resetPass}
              >
                <Form>
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
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Box>
                  <Box className="form-group">
                    <Typography variant="body2">Confirm Password</Typography>
                    <Box className="password-container">
                      <Field
                        className="login-input"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <Box className="password-icons">
                        {showConfirmPassword ? (
                          <FiEye
                            onClick={() => setShowConfirmPassword(false)}
                          />
                        ) : (
                          <FiEyeOff
                            onClick={() => setShowConfirmPassword(true)}
                          />
                        )}
                      </Box>
                    </Box>
                    <ErrorMessage name="confirmPassword">
                      {(msg) => (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </Box>
                  <button type="submit" className="register-btn">
                    Reset Password
                  </button>
                  <Snackbar
                    autoHideDuration={2000}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={alert}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Password Updated
                    </Alert>
                  </Snackbar>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default ResetPassword;
