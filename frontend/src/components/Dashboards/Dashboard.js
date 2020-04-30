import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vendordash from "./vendordashbaord";
import Userdash from "./userdashboard";

class dashboard extends Component {
  constructor(pros) {
    super(pros);

    this.checkUser = this.checkUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.className]: e.target.value });
  };

  componentDidMount() {
    try {
      this.checkUser();
    } catch (e) {
      console.log(e);
    }
  }

  checkUser() {
    try {
      var userType = JSON.parse(localStorage["token"]).user_type;
      if (userType == "customer") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className="app">
        {this.checkUser() && <Userdash />}
        {!this.checkUser() && <Vendordash />}
      </div>
    );
  }
}

export default dashboard;
