import React from "react";
import { Container, Typography } from "@mui/material";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <div className="footer-link-container" style={{ minHeight: "100vh" }}>
          <Typography variant="h4" sx={{ mb: "1.5rem", fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Typography paragraph sx={{ mb: "1.5rem" }}>
            Thank you for your interest in Seven Shows. If you have any
            questions, comments, or feedback about our website or services,
            please do not hesitate to contact us.
          </Typography>
          <Typography paragraph sx={{ fontWeight: "bold" }}>
            Email: support@sevenshows.com
          </Typography>
          <Typography paragraph sx={{ mb: "1.5rem" }}>
            We strive to respond to all inquiries within 24-48 hours. Please
            note that our support team is available Monday-Friday, 9am-5pm PST.
          </Typography>
          <Typography paragraph>Thank you for using Seven Shows!</Typography>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
