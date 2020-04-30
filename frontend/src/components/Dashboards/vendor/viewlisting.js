import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PendingListing from "./pendinglisting";
import ReadyListing from "./fulfilledlisting";
import PastListing from "./dispatchedlisting";

class ViewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkUser() {
    try {
      var userType = JSON.parse(localStorage["token"]).user_type;
      if (userType === "vendor") {
        return true;
      } else {
        this.props.history.push("dashboard");
      }
    } catch (e) {
      this.props.history.push("login");
    }
  }

  render() {
    {
      this.checkUser();
    }
    return (
      <div className="app">
        <div className="row d-flex justify-content-center">
          <Button
            variant="outline-primary"
            id="view"
            className="mr-5 mt-5"
            value="pending"
            onClick={this.onChange}
          >
            Pending Listings
          </Button>
          <Button
            variant="outline-primary"
            className="ml-5 mr-5 mt-5"
            onClick={this.onChange}
            id="view"
            value="fullfilled"
          >
            Fulfilled Orders
          </Button>
          <Button
            variant="outline-primary"
            className="ml-5 mr-5 mt-5"
            onClick={this.onChange}
            id="view"
            value="pastorders"
          >
            Past Orders
          </Button>
        </div>
        <div className="row d-flex justify-content-center"></div>
        {this.state.view === "pending" && (
          <h3>
            <PendingListing />
          </h3>
        )}
        {this.state.view === "fullfilled" && (
          <h3>
            <ReadyListing />
          </h3>
        )}
        {this.state.view === "pastorders" && (
          <h3>
            <PastListing />
          </h3>
        )}
      </div>
    );
  }
}

export default ViewListing;
