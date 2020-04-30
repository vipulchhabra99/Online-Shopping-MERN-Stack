import React, { Component } from "react";
import registerImg from "../../download.svg";
import axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phoneno: "",
      password: "",
      password2: "",
      address: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBack = this.onBack.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
  }

  loginCheck() {
    try {
      const validate = JSON.parse(localStorage["token"]).login;

      if (validate == true) {
        this.props.history.push("/dashboard");
      }
    } catch (e) {
      return false;
    }
  }

  componentDidMount() {
    this.loginCheck();
  }

  onBack() {
    this.props.history.push("/login");
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      cust_type: this.state.userType,
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phoneno,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address
    };

    console.log(newUser);

    axios.post("http://localhost:4000/register", newUser).then(res => {
      if (res.status >= 200 && res.status < 300) {
        alert("User registered please Login to continue !");
        this.props.history.push("login");
      } else {
        alert("Some items are missing or not in required form!");
      }
    });

    this.setState({
      name: "",
      email: "",
      phoneno: "",
      password: "",
      password2: "",
      address: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Register</div>
          <div className="content">
            <div className="image">
              <img src={registerImg} />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="cust-type">User Type</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="customer"
                  name="userType"
                  id="userType"
                  className="m-1"
                  onChange={this.onChange}
                />
                Customer
                <input
                  type="radio"
                  value="vendor"
                  name="userType"
                  id="userType"
                  className="ml-5"
                  onChange={this.onChange}
                />
                Vendor
              </div>

              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Email-Id</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email-Id"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone No.</label>
                <input
                  type="tel"
                  name="phoneno"
                  placeholder="phoneno"
                  id="phoneno"
                  onChange={this.onChange}
                  value={this.state.phoneno}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  placeholder="confirm-password"
                  id="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  id="address"
                  onChange={this.onChange}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn btn-primary m-3">
              Register
            </button>
            <button
              type="button"
              className="btn btn-primary ml-3"
              onClick={this.onBack}
            >
              Back to Login
            </button>
          </div>
        </div>
      </form>
    );
  }
}
