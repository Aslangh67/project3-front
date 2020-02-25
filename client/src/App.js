import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import SupplierAccountPage from "./Pages/SupplierAccountPage";
import CharityAccountPage from "./Pages/CharityAccountPage";

import './style/Resources/grid-css/grid.css';
import './style/Resources/normalize/normalize.css';

export default function App() {

  return (
    <div>
      <Router>

        <Switch>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/supplier">
            <SupplierAccountPage />
          </Route>

          <Route path="/charity">
            <CharityAccountPage />
          </Route>

          <Route exact path="/" component={Home} />

        </Switch>

        <Footer />

      </Router>
    </div>
  )
  }
