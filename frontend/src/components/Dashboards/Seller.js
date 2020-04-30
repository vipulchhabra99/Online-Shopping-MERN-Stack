import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Jumbotron, Table } from "react-bootstrap";

class review extends Component {
  constructor(pros) {
    super(pros);

    this.state = {
      seller_name: "",
      ratings: [],
      reviews: [],
      rating_avail: false,
      avg_rating: 0
    };
    this.onChange = this.onChange.bind(this);
  }

  fetchRatings(seller_name) {
    Axios.get("http://localhost:4000/ratings/" + seller_name)
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          alert("No ratings found !");
          this.setState({ ratings: [] });
        } else {
          //console.log(resp.data);
          this.setState({ ratings: resp.data });

          var int_rating = 0;

          for (var i = 0; i < resp.data.length; i++) {
            int_rating += parseInt(resp.data[i].ratings);
          }

          int_rating /= resp.data.length;

          this.setState({ avg_rating: int_rating });

          if (Object.keys(this.state.items).length != 0) {
            this.setState({ rating_avail: true });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  fetchReviews(seller_name) {
    console.log(this.state.seller_name);
    Axios.get("http://localhost:4000/reviews/" + seller_name)
      .then(resp => {
        if (Object.keys(resp.data).length === 0) {
          alert("No reviews found !");
          this.setState({ reviews: [] });
        } else {
          //console.log(resp.data);
          this.setState({ reviews: resp.data });

          if (Object.keys(this.state.items).length != 0) {
            this.setState({ rating_avail: true });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChange = e => {
    this.setState({ [e.target.className]: e.target.value });
  };

  componentDidMount() {
    this.setState({ seller_name: this.props.match.params.id });
    this.fetchReviews(this.props.match.params.id);
    this.fetchRatings(this.props.match.params.id);
  }

  render() {
    return (
      <div className="app">
        <Jumbotron className="text-center">
          <h3>SELLER DETAILS</h3>
        </Jumbotron>
        <div className="mt-5">
          <div className="row d-flex justify-content-center mt-5"></div>
          <div>
            <br></br>
            <div className="row d-flex justify-content-center mt-5">
              <h3>SELLER NAME</h3>
              <h3 className="ml-4">{this.state.seller_name}</h3>
            </div>

            <div>
              <Table className="text-center mt-5 mb-5" striped hover boadered>
                <tr>
                  <th>Ratings</th>
                  <th></th>
                </tr>
                <tbody>
                  {this.state.ratings.map((rating, i) => {
                    return (
                      <tr>
                        <td className="mt-5">{rating.ratings}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td>AVG RATINGS</td>
                    <td>{this.state.avg_rating}</td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-center mt-5" striped hover boadered>
                <tr>
                  <th>Reviews</th>
                </tr>

                <tbody>
                  {this.state.reviews.map((review, i) => {
                    return (
                      <tr>
                        <td className="mt-5">{review.review}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default review;
