const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

//let User = require('./models/user');
app.use(cors());

//app.use((req, res, next) => {
//res.header("Access-Control-Allow-Origin", "*");
//next();
//});
//app.use(cookieParser());

// Body Parser middleware
app.use(bodyParser.json());
//app.use(express.json());

//app.use(express.urlencoded({extended : false}));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Connection to mongodb
mongoose.connect(
  "",
  {
    useNewUrlParser: true,
  }
);

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established succesfully.");
});

// API endpoints
// Login route of the API
app.use("/login", require("./routes/login"));

// Register route of the API
app.use("/register", require("./routes/register"));

//Logoute route of the API.
app.use("/logout", require("./routes/logout"));

// Product route of the API
app.use("/product", require("./routes/product"));

// Order route of the API
app.use("/order", require("./routes/orders"));

// Ratings route of the API
app.use("/ratings", require("./routes/ratings"));

// Reviews route of the API
app.use("/reviews", require("./routes/reviews"));

//404 Handler
app.use((req, res, next) => {
  res.status(404).send("You are lost in the space");
});

// Handler for 500 Error
app.use((err, req, res, next) => {
  console.error(err.stack);
});

app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});
