import {
  Paper,
  Typography,
  Divider,
  Box,
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { Form, Field, Formik, ErrorMessage } from "formik";
import {
  getToken,
  getCurrentUser,
  updateUser,
  getUserById,
  destroySession,
} from "../services/UserService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/Fi";
import ProfileAvatar from "../../public/assets/images/user.png";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import * as yup from "yup";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { setIsUserLoggedIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  let token = getToken();
  let user = getCurrentUser();

  let initVal = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
  };

  const handleError = () => {
    destroySession();
    setIsUserLoggedIn(false);
    navigate("/login");
  };

  const update = (values, { resetForm }) => {
    if (token && user) {
      if (
        user.firstName != values.firstName ||
        user.lastName != values.lastName ||
        values.password != "" ||
        user.email != ""
      ) {
        let payload = {};

        if (values.password == "") {
          payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          };
        } else {
          payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };
        }

        updateUser(user.id, payload, token)
          .then((res) => {
            getUserById(user.id, token)
              .then((res1) => {
                let localUser = {
                  id: res1.data.id,
                  firstName: res1.data.firstName,
                  email: res1.data.email,
                  lastName: res1.data.lastName,
                  username: res1.data.username,
                };
                localStorage.setItem("user", JSON.stringify(localUser));
                window.location.reload();
              })
              .catch((err) => handleError());
          })
          .catch((err) => handleError());
      }
    } else {
      handleError();
    }
    resetForm({ values: "" });
  };

  const updateSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Must have atleast 2 characters!")
      .max(60, "First name is too long!")
      .required("First name is required!"),
    lastName: yup
      .string()
      .min(2, "Must have atleast 2 characters!")
      .max(60, "Last name is too long!")
      .required("Last name is required!"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .min(6, "Must be atleast 6 characters!")
      .max(60, "Cannot exceed 60 characters!"),
  });

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <div className="profile-container">
          <div className="left-profile-container">
            <Paper>
              <div>
                <img
                  className="profile-img"
                  src={ProfileAvatar}
                  alt="profile"
                />
              </div>
              <div className="left-content">
                <Typography variant="h5">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                  @{user.username}
                </Typography>
              </div>
            </Paper>
          </div>
          <div className="right-profile-container">
            <Paper>
              <div className="right-profile-content">
                <Typography variant="h5">User Information</Typography>
                <div
                  className={`profile-info ${edit && "edit-active"}`}
                  onClick={() => setEdit(!edit)}
                >
                  <FiEdit />
                  <Typography
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    variant="body2"
                  >
                    Edit
                  </Typography>
                </div>
              </div>
              <Divider />

              <Formik
                initialValues={initVal}
                validationSchema={updateSchema}
                onSubmit={update}
              >
                <Form className="form-profile-container">
                  <div className="input-group-container">
                    <Box className="form-group">
                      <Typography variant="body2">First Name</Typography>
                      <Field
                        className={`login-input  ${edit && "border-active"}`}
                        name="firstName"
                        type="text"
                        disabled={edit ? `` : true}
                      />
                      <ErrorMessage name="firstName">
                        {(msg) => (
                          <Typography variant="body2" sx={{ color: "red" }}>
                            {msg}
                          </Typography>
                        )}
                      </ErrorMessage>
                    </Box>
                    <Box className="form-group">
                      <Typography variant="body2">Last Name</Typography>
                      <Field
                        className={`login-input  ${edit && "border-active"}`}
                        name="lastName"
                        type="text"
                        disabled={edit ? `` : true}
                      />
                      <ErrorMessage name="lastName">
                        {(msg) => (
                          <Typography variant="body2" sx={{ color: "red" }}>
                            {msg}
                          </Typography>
                        )}
                      </ErrorMessage>
                    </Box>
                  </div>
                  <div className="input-group-container">
                    <Box className="form-group">
                      <Typography variant="body2">Email</Typography>
                      <Field
                        className={`login-input  ${edit && "border-active"}`}
                        name="email"
                        type="email"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <Typography variant="body2" sx={{ color: "red" }}>
                            {msg}
                          </Typography>
                        )}
                      </ErrorMessage>
                    </Box>
                    <Box className="form-group">
                      <Typography variant="body2">Password</Typography>
                      <Box className="password-container">
                        <Field
                          className={`login-input  ${edit && "border-active"}`}
                          name="password"
                          type={`${showPassword ? "text" : "password"}`}
                          disabled={edit ? `` : true}
                        />
                        <Box className="password-icons">
                          {showPassword ? (
                            <FiEye
                              onClick={() => setShowPassword(false)}
                              className={`${edit && "edit-active"}`}
                            />
                          ) : (
                            <FiEyeOff
                              onClick={() => setShowPassword(true)}
                              className={`${edit && "edit-active"}`}
                            />
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
                  </div>
                  <button
                    type="submit"
                    className="register-btn"
                    onClick={() => {
                      setIsUpdated(true);
                    }}
                  >
                    Update
                  </button>
                  <Snackbar
                    autoHideDuration={2000}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={isUpdated}
                    onClose={() => {
                      setIsUpdated(false);
                    }}
                  >
                    <Alert
                      onClose={() => {
                        setIsUpdated(false);
                      }}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Profile Updated
                    </Alert>
                  </Snackbar>
                </Form>
              </Formik>
            </Paper>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
export default Profile;
