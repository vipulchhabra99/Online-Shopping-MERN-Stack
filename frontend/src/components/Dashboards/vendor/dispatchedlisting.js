import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-dom";

class dispatchlisting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemspresent: false
    };
  }

  componentDidMount() {
    Axios.get(
      "http://localhost:4000/product/fetch/" +
        JSON.parse(localStorage["token"]).user_name +
        "/past"
    )
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          alert("No item found !");
          this.setState({ itemspresent: false });
        } else {
          this.setState({ items: resp.data });
          console.log(resp.data);
          if (Object.keys(this.state.items).length != 0) {
            this.setState({ itemspresent: true });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="row d-flex justify-content-center mt-4 ml-5">
        <h3>Past Orders</h3>
        {this.state.itemspresent && (
          <Table className="text-center mt-5" striped hover boadered>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Bundle Price</th>
              <th>Reviews And Ratings</th>
            </tr>
            <tbody>
              {this.state.items.map((item, i) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <a
                        href={
                          "/ratings/" +
                          JSON.parse(localStorage["token"]).user_name +
                          "/" +
                          item._id
                        }
                      >
                        Click here
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

export default dispatchlisting;
