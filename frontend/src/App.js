import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login, Register } from "./components/login/index";
import Navbar from "./components/Common/navbar";
import Dashboard from "./components/Dashboards/Dashboard";
import Logout from "./components/Common/logout";
import Addprod from "./components/Dashboards/vendor/addprod";
import ViewListing from "./components/Dashboards/vendor/viewlisting";
import CusOrders from "./components/Dashboards/customer/orders";
import Ratings from "./components/Dashboards/customer/ratings";
import Reviews from "./components/Dashboards/customer/review";
import Seller from "./components/Dashboards/Seller";
import RatingProd from "./components/Dashboards/vendor/rating_per";
import Update from "./components/Dashboards/customer/updateitem";
import Front from "./components/Common/front";
//import UsersList from "./components/users-list.component";
//import CreateUser from "./components/create-user.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkLogin() {
    try {
      var login = JSON.parse(localStorage["token"]).login;

      if (login == true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <Router>
        <Navbar id="main" />
        <Route path="/" exact component={Front}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/addprod" component={Addprod}></Route>
          <Route path="/viewlisting" component={ViewListing}></Route>
          <Route path="/orders" component={CusOrders}></Route>
          <Route
            path="/rating/:oid/:sid/:pid/:prod_name"
            component={Ratings}
          ></Route>
          <Route path="/ratings/:id/:prod" component={RatingProd}></Route>
          <Route
            path="/review/:oid/:sid/:pid/:prod_name"
            component={Reviews}
          ></Route>
          <Route path="/seller/:id" component={Seller}></Route>
          <Route path="/update/:id/:poid/:name" component={Update}></Route>
        </>
      </Router>
    );
  }
}

export default App;
