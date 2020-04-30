import React, { Component } from "react";
import { InputGroup, FormControl, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      items: [],
      submit: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateProducts = this.validateProducts.bind(this);
    this.sortProduct = this.sortProduct.bind(this);
    this.listAll = this.listAll.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.fetchRatings = this.fetchRatings.bind(this);
    //this.checkSeller = this.checkSeller.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkSeller(seller_id) {
    try {
      localStorage.removeItem("seller");
    } catch (e) {
      console.log(e);
    }

    //console.log(seller_id.target);

    var seller = {
      seller_name: seller_id
    };
    localStorage.setItem("seller", JSON.stringify(seller));
  }

  listAll = e => {
    e.preventDefault();

    this.setState({ submit: false });
    this.setState({ search: "" });

    Axios.get("http://localhost:4000/product/fetchall")
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          this.setState({ search: "" });
          alert("No item found !");
        } else {
          //console.log(resp.data);
          this.setState({ items: resp.data });
          this.validateProducts();
          if (Object.keys(this.state.items).length != 0) {
            this.setState({ submit: true });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ submit: false });

    if (this.state.search == "") {
      alert("Please enter item to search !");
      return;
    }

    Axios.get(
      "http://localhost:4000/product/fetch/" + this.state.search.toLowerCase()
    )
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          this.setState({ search: "" });
          alert("No item found !");
        } else {
          this.setState({ items: resp.data });
          this.validateProducts();
          if (Object.keys(this.state.items).length != 0) {
            this.setState({ submit: true });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  sortProduct(e) {
    var newArray = this.state.items.slice();
    newArray.sort((a, b) => b[e.target.value] - a[e.target.value]);
    console.log(newArray);
    this.setState({ items: newArray });
  }

  validateProducts() {
    var temp_arr = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].quantity > 0) {
        temp_arr.push(this.state.items[i]);
      }
    }

    this.setState({ items: temp_arr });
  }

  buyItem = e => {
    e.preventDefault();

    var quantity = prompt("Please enter the quantity to order");
    var order = {
      prod_id: e.target.value,
      quantity: parseInt(quantity),
      buyer_name: JSON.parse(localStorage["token"]).user_name
    };

    Axios.post("http://localhost:4000/order/place", order)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          alert("Product Successfully Ordered");
        } else {
          alert("Please enter Valid data");
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  fetchRatings(seller_name) {
    Axios.get("http://localhost:4000/ratings/" + seller_name)
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          return 0;
        } else {
          //console.log(resp.data);
          var int_rating = 0;

          for (var i = 0; i < resp.data.length; i++) {
            int_rating += parseInt(resp.data[i].ratings);
          }

          int_rating /= resp.data.length;
          console.log(int_rating);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

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
          <h2>User Dashboard</h2>
        </div>
        <div>
          <div className="row d-flex justify-content-center mt-4">
            <h3>Welcome User {JSON.parse(localStorage["token"]).user_name}</h3>
            <div className="row d-flex justify-content-right ml-5 mt-1  ">
              <Link to="/logout">logout</Link>
            </div>
            <div className="row d-flex justify-content-right ml-5 mt-1  ">
              <Link to="/orders">Orders</Link>
            </div>
            <br />
          </div>
          <Form
            inline
            className="row d-flex justify-content-center mt-5"
            onSubmit={this.onSubmit}
          >
            <FormControl
              type="text"
              id="search"
              placeholder="Search"
              className="mr-sm-2"
              onChange={this.onChange}
              value={this.state.search}
            />
            <Button type="submit" variant="outline-primary">
              Search
            </Button>
            <Button
              variant="outline-danger"
              className="ml-2"
              onClick={this.listAll}
            >
              List All Product
            </Button>
          </Form>
          <br />
        </div>
        {this.state.submit && (
          <div className="searchResult row d-flex justify-content-center mt-4">
            <div className="m-4">
              <select onChange={this.sortProduct}>
                <option value="" selected disabled hidden>
                  Sort By(Desc. Order)
                </option>
                <option value="price_pc">Price</option>
                <option value="quantity">Quantity</option>
                <option value="rating">Rating of seller</option>
              </select>
            </div>
            <Table className="text-center" striped hover boadered>
              <thead>
                <tr>
                  <th className="col-ml-5">Name of Item</th>
                  <th className="col-ml-5">Name of Seller</th>
                  <th className="col-ml-5">Quantity Available</th>
                  <th className="col-ml-5">Price Per Item</th>
                  <th className="col-ml-5">Average Rating</th>
                  <th className="col-ml-5">Place Order</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, i) => {
                  return (
                    <tr>
                      <td className="mt-5">{item.name}</td>

                      <td className="mt-5">
                        {
                          <a
                            href={"/seller/" + item.seller}
                            value={item.seller}
                            id={item.seller}
                          >
                            {item.seller}
                          </a>
                        }
                      </td>

                      <td className="mt-5">{item.left_quantity}</td>
                      <td className="mt-5">{item.price_pc}</td>
                      <td className="mt-5">{this.fetchRatings(item.seller)}</td>
                      <td className="mt-5">
                        <Button
                          type="submit"
                          value={item._id}
                          onClick={this.buyItem}
                        >
                          Buy Now
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default UserDashboard;
