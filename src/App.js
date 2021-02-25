import React, { Component } from 'react';
import './App.css';
import 'animate.css/animate.compat.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import ProductContent from './components/ProductContent';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import FeedAddPage from './components/FeedAddPage';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={ProductContent} />
          <Route path="/feed" component={FeedAddPage} />
        </Switch>
        <Footer />
      </Router>
    )
  }
}

export default App;
