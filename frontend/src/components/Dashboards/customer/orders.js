import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Table } from "react-bootstrap";
import Axios from "axios";

class Orders extends Component {
  constructor(pros) {
    super(pros);

    this.state = {
      orderspresent: false,
      orders: [],
      left_quant: 0
    };

    this.checkUser = this.checkUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchOrder = this.fetchOrder.bind(this);
    this.fetchRemaining = this.fetchRemaining.bind(this);
    this.ReviewOrder = this.ReviewOrder.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.className]: e.target.value });
  };

  ReviewOrder(order_id, seller_id, item_name, prod_id) {
    try {
      localStorage.removeItem("review");
    } catch (e) {
      console.log(e);
    }

    var review = {
      order_id: order_id,
      seller_id: seller_id,
      item_name: item_name,
      prod_id: prod_id
    };

    console.log(review);

    localStorage.setItem("review", JSON.stringify(review));
  }

  fetchRemaining(prod_id) {
    var order = {
      id: prod_id
    };
    var x = 0;

    Axios.post("http://localhost:4000/product/fetch", order)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log(res.data[0].left_quantity);
          //this.setState({ left_quant: res.data[0].left_quantity });
          return Object(res.data[0]).left_quantity;
        } else {
          alert("Please enter Valid data");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  fetchOrder = e => {
    Axios.get(
      "http://localhost:4000/order/fetch/" +
        JSON.parse(localStorage["token"]).user_name
    )
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          alert("No orders found !");
          this.setState({ orderspresent: false });
        } else {
          for (var i = 0; i < resp.data.length; i++) {
            if (Object(resp.data[i]).status === "pending") {
              console.log(this.fetchRemaining(Object(resp.data[i]).prod_id));
            }
          }

          this.setState({ orders: resp.data });
          console.log(resp.data);
          if (Object.keys(this.state.orders).length != 0) {
            this.setState({ orderspresent: true });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    try {
      this.checkUser();
      this.fetchOrder();
    } catch (e) {
      console.log(e);
    }
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
    return (
      <div className="app">
        <Jumbotron>
          <div className="text-center">
            <h2>Past Orders</h2>
          </div>
        </Jumbotron>
        <div>
          {this.state.orderspresent && (
            <Table className="text-center" striped hover boadered>
              <tr>
                <th>Prod. Name</th>
                <th>Prod. Quantity</th>
                <th>Price of Order</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Update Order</th>
                <th>Review Order</th>
                <th>Rate Order</th>
              </tr>
              <tbody>
                {this.state.orders.map((order, i) => {
                  return (
                    <tr>
                      <td>{order.name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.price}</td>
                      <td>{order.seller}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "pending" ? (
                          <a
                            href={
                              "/update/" +
                              order._id +
                              "/" +
                              order.prod_id +
                              "/" +
                              order.name
                            }
                          >
                            Update Order
                          </a>
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        {order.status === "Dispatched" ? (
                          <a
                            href={
                              "/review/" +
                              order._id +
                              "/" +
                              order.seller +
                              "/" +
                              order.prod_id +
                              "/" +
                              order.name
                            }
                          >
                            Review
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {order.status === "Dispatched" ? (
                          <a
                            href={
                              "/rating/" +
                              order._id +
                              "/" +
                              order.seller +
                              "/" +
                              order.prod_id +
                              "/" +
                              order.name
                            }
                          >
                            Rate Order
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    );
  }
}

export default Orders;
