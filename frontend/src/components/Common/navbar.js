import React, { Component } from "react";
import axios from "axios";
import { Nav, Navbar, Form, Button, FormControl } from "react-bootstrap";

class navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
    this.checkCurrent = this.checkCurrent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  onChange = e => {
    this.setState({ authenticated: this.checkCurrent() });
  };

  componentDidMount() {
    this.checkCurrent();
  }

  componentWillReceiveProps() {
    this.render();
  }

  checkCurrent() {
    try {
      var user = JSON.parse(localStorage["token"]).login;
      if (user === true) return JSON.parse(localStorage["token"]).user_name;
      else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  render() {
    return (
      <div className="user-log" onChange={this.onChange} onLoad={this.onChange}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">IIIT-SHOPPING</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/login">Home</Nav.Link>
            <Nav.Link href="/">Main Page</Nav.Link>
          </Nav>
          <Form inline></Form>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
