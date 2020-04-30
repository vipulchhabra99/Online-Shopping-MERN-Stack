import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class addproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Prodname: "",
      Prodquantity: 0,
      Prodprice: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    if (this.state.Prodname === "") {
      alert("Please enter Name of Product !");
    } else if (this.state.Prodquantity === 0) {
      alert("Please enter valid Product Quantity !");
    } else if (this.state.Prodprice === 0) {
      alert("Please enter valid product Price !");
    }

    var Product = {
      name: this.state.Prodname,
      seller: JSON.parse(localStorage["token"]).user_name,
      quantity: this.state.Prodquantity,
      price: this.state.Prodprice
    };

    axios
      .post("http://localhost:4000/product/add", Product)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          alert("Product Successfully Listed");
          this.props.history.push("dashboard");
        } else {
          alert("Please enter Valid data");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

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
      <div className="row d-flex justify-content-center mt-4 ml-5">
        <Container>
          <Row>
            <Col md="6">
              <form onSubmit={this.onSubmit}>
                <p className="h4 text-center mb-4">Add New Product</p>
                <label htmlFor="ProdName" className="grey-text">
                  Product Name
                </label>
                <input
                  type="text"
                  id="Prodname"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <label htmlFor="ProdQuantity" className="grey-text">
                  Quantity
                </label>
                <input
                  type="number"
                  id="Prodquantity"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <label htmlFor="Prodprice" className="grey-text">
                  Product Price
                </label>
                <input
                  type="number"
                  id="Prodprice"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <div className="text-center mt-4">
                  <Button type="submit" variant="outline-success">
                    Add Prod
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

export default addproduct;
