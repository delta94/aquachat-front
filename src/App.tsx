import React from "react";
import GlobalStyle from "./styles/global-styles";
import { ThemeProvider } from "./styles/typed-components";
import { theme } from "./styles/theme";
import LogIn from "./Routes/LogIn";
import Home from "./Routes/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={LogIn} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
