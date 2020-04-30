import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Container, Col } from "react-bootstrap";
import axios from "axios";

class dashboard extends Component {
  constructor(pros) {
    super(pros);

    this.state = {
      review: "",
      order_id: "",
      prod_id: "",
      seller_id: "",
      prod_name: ""
    };

    this.checkUser = this.checkUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    try {
      this.checkUser();
    } catch (e) {
      console.log(e);
    }

    this.setState({
      order_id: this.props.match.params.oid,
      seller_id: this.props.match.params.sid,
      prod_id: this.props.match.params.pid,
      prod_name: this.props.match.params.prod_name
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var review = {
      id: this.state.order_id,
      buyer_id: JSON.parse(localStorage["token"]).user_name,
      seller_id: this.state.seller_id,
      review: this.state.review,
      prod_id: this.state.prod_id
    };

    axios
      .put("http://localhost:4000/order/review", review)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          alert("Order Reviewed Successfully");
          this.props.history.push("/dashboard");
        } else {
          alert("Please enter Valid data");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidUpdate() {
    this.checkUser();
  }
  checkUser() {
    try {
      var userType = JSON.parse(localStorage["token"]).user_type;
      if (userType == "Customer") {
        return true;
      } else {
        return false;
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
        <Container>
          <Row>
            <Col md="6">
              <div className="text-center mt-5">
                <h3>Review Order</h3>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="mt-5">
                  <label className="grey-text">Product Name : </label>
                  <input
                    name="order"
                    readOnly
                    className="form-control"
                    value={this.state.prod_name}
                  ></input>
                </div>
                <div className="mt-5">
                  <label className="grey-text">Seller Name : </label>
                  <input
                    name="seller"
                    readOnly
                    className="form-control"
                    value={this.state.seller_id}
                  ></input>
                </div>

                <div className="mt-5">
                  <label className="grey-text">Provide Reviews : </label>
                  <input
                    name="review"
                    id="review"
                    onChange={this.onChange}
                    className="form-control"
                    value={this.state.review}
                    type="text"
                  ></input>
                </div>

                <div className="mt-5">
                  <Button variant="outline-success" type="submit">
                    Submit review
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default dashboard;
