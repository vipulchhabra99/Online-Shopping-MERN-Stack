import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class logout extends Component {
  clearStorage() {
    try {
      var validate = JSON.parse(localStorage["token"]).login;

      if (validate === true) {
        localStorage.removeItem("token");
      } else {
        alert("User not logged in !");
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        {this.clearStorage()}
        <Redirect to="/login" />
      </div>
    );
  }
}

export default logout;
