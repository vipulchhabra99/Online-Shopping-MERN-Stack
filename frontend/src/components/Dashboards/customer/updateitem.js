import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class addproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Prodname: "",
      Prodquantity: 0,
      Prodprice: 0,
      prod_name: "",
      prod_id: "",
      o_id: "",
      Prodquant: 0,
      left_quant: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchQuantit = this.fetchQuantit.bind(this);
  }

  onChange = e => {
    if (this.state.Prodquant > this.state.left_quant) {
      alert("Entered quantity more than left quantity !");
      this.setState({ Prodquant: 0 });
      return;
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    if (this.state.Prodquant === 0) {
      alert("Please enter Additional Quantity !");
    } else if (this.state.Prodquant > this.state.left_quant) {
      alert("Please enter valid Product Quantity !");
    }

    var Product = {
      id: this.state.o_id,
      quantity: this.state.Prodquant,
      prodid: this.state.prod_id
    };

    axios
      .put("http://localhost:4000/product/update", Product)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          alert("Order successfully updated");
        } else {
          alert("Please enter Valid data");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  fetchQuantit() {
    var obj = {
      id: this.props.match.params.poid
    };
    axios.post("http://localhost:4000/product/fetchquantity", obj).then(res => {
      if (res.status >= 200 && res.status < 300) {
        this.setState({
          left_quant: parseInt(Object(res.data[0])["left_quantity"])
        });
      } else {
        alert("Internal server error !");
      }
    });
  }
  checkUser() {
    try {
      var userType = JSON.parse(localStorage["token"]).user_type;
      if (userType === "Customer") {
        return true;
      } else {
        this.props.history.push("dashboard");
      }
    } catch (e) {
      this.props.history.push("login");
    }
  }

  componentDidMount() {
    this.checkUser();
    this.fetchQuantit();
    this.setState({
      prod_name: this.props.match.params.name,
      prod_id: this.props.match.params.poid,
      o_id: this.props.match.params.id
    });
  }

  render() {
    return (
      <div className="row d-flex justify-content-center mt-4 ml-5">
        <Container>
          <Row>
            <Col md="6">
              <form onSubmit={this.onSubmit}>
                <p className="h4 text-center mb-4">Update Product</p>
                <label htmlFor="ProdName" className="grey-text">
                  Product Name
                </label>
                <input
                  type="text"
                  id="Prodname"
                  className="form-control"
                  onChange={this.onChange}
                  readOnly
                  value={this.state.prod_name}
                />
                <br />
                <label htmlFor="ProdQuantity" className="grey-text">
                  Left Quantity
                </label>
                <input
                  type="number"
                  id="left_quant"
                  className="form-control"
                  readOnly
                  value={this.state.left_quant}
                />
                <br />
                <label htmlFor="Prodprice" className="grey-text">
                  Additional Quantity
                </label>
                <input
                  type="number"
                  id="Prodquant"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <div className="text-center mt-4">
                  <Button type="submit" variant="outline-success">
                    Modify
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
