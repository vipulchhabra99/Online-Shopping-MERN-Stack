import React, { Component } from "react";
import loginImg from "../../download.svg";
import axios from "axios";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  loginCheck() {
    try {
      const validate = JSON.parse(localStorage["token"]).login;

      if (validate == true) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  onRegister() {
    this.props.history.push("/register");
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    //console.log(newUser);

    axios.post("http://localhost:4000/login", newUser).then(res => {
      if (res.status >= 200 && res.status < 300) {
        var token = res.data;
        token.login = true;
        localStorage.setItem("token", JSON.stringify(token));
        this.props.history.push("dashboard");
      } else {
        alert("Incorrect Email Id or Password !");
      }
    });

    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="app">
        {!this.loginCheck() && (
          <form onSubmit={this.onSubmit}>
            <div className="base-container" ref={this.props.containerRef}>
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  <img src={loginImg} />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Email-ID</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email-Id"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button type="submit" className="btn btn-primary m-3 ">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-3"
                  onClick={this.onRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        )}
        {this.loginCheck() && <Redirect to="/dashboard"></Redirect>}
      </div>
    );
  }
}
