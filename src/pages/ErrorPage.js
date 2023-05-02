import { Container, Typography } from "@mui/material";
import React from "react";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import ErrorImg from "../../public/assets/images/error.png";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <Container>
        <div className="error-container">
          <img className="error-img" src={ErrorImg} alt="error404" />
          <Typography variant="h5" fontWeight="bold">
            Oopsie! Something went wrong...
          </Typography>
          <Typography paragraph sx={{ mt: 1, mb: "1.5rem" }}>
            The page you were looking for doesn't exist, isn't available or was
            loading incorrectly.
          </Typography>
          <button className="error-btn" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default ErrorPage;
