import React from "react";
import GlobalStyle from "./styles/global-styles";
import { ThemeProvider } from "./styles/typed-components";
import { theme } from "./styles/theme";
import SignUp from "./Routes/SignUp";
import Home from "./Routes/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import LogIn from "./Routes/LogIn";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./Queries/UserQueries";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
  </Switch>
);
const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/" exact={true} component={LogIn} />
    <Route path="/signup" exact={true} component={SignUp} />
  </Switch>
);
const App = (props: any) => {
  const isLoggedIn = props.data.auth.isLoggedIn;
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
      </ThemeProvider>
      <ToastContainer draggable={true} position="top-center" autoClose={2000} />
    </>
  );
};

export default graphql(IS_LOGGED_IN)(App);
