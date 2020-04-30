import React, { Component } from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Jumbotron
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

class VendorDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      items: [],
      submit: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkUser() {
    try {
      var userType = JSON.parse(localStorage["token"]).login;
      if (userType === true) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      this.props.history.push("login");
    }
  }
  render() {
    return (
      <div>
        <div className="row d-flex justify-content-center mt-4">
          <h2>Vendor Dashboard</h2>
        </div>
        <div>
          <div className="row d-flex justify-content-center mt-4">
            <h3>
              Welcome Vendor {JSON.parse(localStorage["token"]).user_name}
            </h3>
            <div className="row d-flex justify-content-right ml-5 mt-1  ">
              <Link to="/logout">logout</Link>
            </div>
            <br />
          </div>
          <br />
          <div className="ml-5 mt-1  mr-5">
            <Jumbotron className="text-center">
              <h3 className="text-center">Options</h3>
              <br></br>
              <br></br>
              <Link to="/addprod">
                <Button variant="outline-success" className="mr-5">
                  Add new Product
                </Button>
              </Link>
              <Link to="/viewlisting">
                <Button variant="outline-success" className="ml-5">
                  View Listing
                </Button>
              </Link>
            </Jumbotron>
          </div>
        </div>
      </div>
    );
  }
}

export default VendorDashboard;
