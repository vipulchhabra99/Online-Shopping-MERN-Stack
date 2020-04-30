import React, { Component } from "react";
import { Button } from "react-bootstrap";
import logo from "./iiit-new.png";
import { Link } from "react-router-dom";

class Front extends Component {
  constructor(e) {
    super(e);
  }

  render() {
    return (
      <div id="app">
        <div>
          <br></br>
          <div className="row d-flex justify-content-center mt-4">
            <h3>Welcome To IIIT Shopping</h3>
          </div>
          <br></br>
          <div className="row d-flex justify-content-center mt-4 mb-5">
            <img src={logo} />
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <div className="mr-5">
              <Link to="/login">
                <Button variant="outline-primary" size="lg">
                  Login
                </Button>
              </Link>
            </div>
            <div className="ml-5">
              <Link to="/register">
                <Button variant="outline-primary" size="lg">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Front;
