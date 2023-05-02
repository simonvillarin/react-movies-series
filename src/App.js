import React, { useContext, useEffect } from "react";
import theme from "./theme.js";
import Movies from "./pages/Movies.js";
import Series from "./pages/Series.js";
import Home from "./pages/Home.js";
import LoginForm from "./pages/LoginForm.js";
import SignUpForm from "./pages/SignUpForm.js";
import SearchResults from "./pages/SearchResults.js";
import MyList from "./pages/MyList.js";
import Landing from "./pages/Landing.js";
import Profile from "./pages/Profile.js";
import Show from "./pages/Show.js";
import Contact from "./pages/Contact.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.js";
import Terms from "./pages/Terms.js";
import { Input, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppbarContextProvider } from "./context/AppbarContext.js";
import { UserContext } from "./context/UserContext.js";
import { SearchContextProvider } from "./context/SearchContext.js";
import { destroySession } from "./services/UserService.js";
import FilterResult from "./pages/FilterResult.js";
import ErrorPage from "./pages/ErrorPage.js";
import SendEmail from "./pages/SendEmail.js";
import InputOtp from "./pages/InputOtp.js";
import ResetPassword from "./pages/ResetPassword.js";
import { EmailContextProvider } from "./context/EmailContext.js";

const App = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  let user = localStorage.getItem("user");
  let otp = localStorage.getItem("otp");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      destroySession();
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!otp && !user) {
      navigate("/login");
    }
  }, [otp]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppbarContextProvider>
          <SearchContextProvider>
            <EmailContextProvider>
              {isUserLoggedIn ? (
                <React.Fragment>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/list" element={<MyList />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/:type/:id" element={<Show />} />
                    <Route
                      path="/:category/genre/:genreIds"
                      element={<FilterResult />}
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </React.Fragment>
              ) : (
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/send-otp" element={<SendEmail />} />
                  <Route path="/type-otp" element={<InputOtp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              )}
            </EmailContextProvider>
          </SearchContextProvider>
        </AppbarContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
