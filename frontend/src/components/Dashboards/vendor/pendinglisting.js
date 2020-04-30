import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import Axios from "axios";

class pendinglisting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemspresent: false
    };

    this.DeleteListing = this.DeleteListing.bind(this);
  }

  DeleteListing = e => {
    e.preventDefault();

    var prod = {
      id: e.target.value
    };

    Axios.put("http://localhost:4000/product/delete", prod)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          alert("Deleted");
          this.componentDidMount();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  componentDidMount() {
    Axios.get(
      "http://localhost:4000/product/fetch/" +
        JSON.parse(localStorage["token"]).user_name +
        "/pending"
    )
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          alert("No item found !");
          this.setState({ itemspresent: false });
        } else {
          this.setState({ items: resp.data });
          //console.log(resp.data);
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
        <h3>PENDING LISTINGS</h3>
        {this.state.itemspresent && (
          <Table className="text-center mt-5" striped hover boadered>
            <tr>
              <th>Product Name</th>
              <th>Product Quantity</th>
              <th>Remaining Quantity</th>
              <th>Bundle Price</th>
              <th>Delete Listing</th>
            </tr>
            <tbody>
              {this.state.items.map((item, i) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.left_quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        value={item._id}
                        onClick={this.DeleteListing}
                      >
                        Delete
                      </Button>
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

export default pendinglisting;
