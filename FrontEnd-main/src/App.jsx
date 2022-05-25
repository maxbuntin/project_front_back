import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Users } from "./components/Users/Users.jsx";

import  Header  from "./components/Common/Header.jsx";

import { ThemeProvider } from "@material-ui/styles";
import {
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme
} from "@material-ui/core";



const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  return (
      <Router>
      <ThemeProvider theme={theme}>
      <Header />
        <Switch>
          <Route exact path="/" component={Users} />
  
          {/* <Route path="/edite" component={EditeBook} /> */}
        </Switch>
        </ThemeProvider>
      </Router>
  
  
  );
}

export default App;
