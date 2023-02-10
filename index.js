const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
// establishing the connection
const Apartment = require("./models/Apartment");
const {
  getAllApartments,
  createNewApartment,
  getApartmentById,
  deleteApartmentById,
  updateApartmentById,
} = require("./controllers/queries");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// now we can serve static files to the client
app.use(express.static("public"));
app.use(cors());
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
// ----- ----- ----- ----- ----- ----- ----- -----
// ROUTE: /apartments
app
  .route("/apartments")
  .get((req, res) => {
    // price: asc/desc; rooms= any integer number;
    const { price, rooms: rooms_param } = req.query;
    // generating our query options depending on what query-parameters we have
    const options = {};
    if (Object.keys(req.query).length === 2) {
      options["where"] = { rooms: parseInt(rooms_param) };
      options["order"] = [["price", price.toUpperCase()]];
    } else if (price) {
      options["order"] = [["price", price.toUpperCase()]];
    } else if (rooms_param) {
      options["where"] = { rooms: parseInt(rooms_param) };
    }

    getAllApartments(options)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, 4));
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ info: "Error while retrieving list of all apartments" });
      });
  })
  .post((req, res) => {
    const body_params = req.body;
    createNewApartment(body_params)
      .then((data) => {
        res
          .status(200)
          .json({ info: "New apartment has been added succesfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ info: "Data you have provided is invalid" });
      });
  });
// ----- ----- ----- ----- ----- ----- ----- -----
// ROUTE: /apartments/:id
app
  .route("/apartments/:id")
  .get((req, res) => {
    const id = req.params.id;
    getApartmentById(id)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, 4));
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          info: "Error occured while retrieving data about this apartment",
        });
      });
  })
  .delete((req, res) => {
    const id = req.params.id;
    deleteApartmentById(id)
      .then((data) => {
        res
          .status(200)
          .json({ info: "Apartment has been deleted succesfully" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ info: "Error occured while deleting this apartment" });
      });
  })
  .put((req, res) => {
    const id = req.params.id;
    const body_params = req.body;
    updateApartmentById(id, body_params)
      .then((data) => {
        res
          .status(200)
          .json({ info: "Apartment info has been updated succesfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ info: "Data you have provided is invalid" });
      });
  });