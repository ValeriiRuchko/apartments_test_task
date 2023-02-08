const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// establishing the connection
const Apartment = require('./models/Apartment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// now we can serve static files to the client
app.use(express.static("public"));
// syncing our model with our database and catching all errors
Apartment.sync()
  .then((result) => {
    //console.log(result);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// all of our routes and corresponding http-requests 
app.route("/apartments")
.get((req, res) => {
  res.send("Hello world!");
});

// app.route("/apartments/:id").get((req, res) => {}))
// app.route("/apartments").post((req, res) => {}))
// app.route("/apartments/:id").delete((req, res) => {}))
// ------ ------ ------
// Would be a plus: 
// app.route("/apartments/:id").put((req, res) => {}))
