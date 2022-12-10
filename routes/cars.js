const express = require("express")
const router = express.Router()
const carInfo = require("../public/car-info.json")
const path = require('path');

// router.route("/")
//   .get((req, res) => {
//     res.set('Content-Type', 'text/html')
//     res.send(Buffer.from('<h2>there\'s nothing on this route, try cars/display-all-cars for example</h2><a href="cars/display-all-cars">All</a>'));
//   })

router.route("/").get((req, res) => {
  res.render("all-cars", {
    carsData: (carInfo.cars)
  })
})

router.post("/about", function (req, res) {
  res.send("About this wiki");
});

// app.get(/:id, (req, res) => {
//     const id = req.params.id;
// });

router.route("/:id")
router.route("/display-all-cars")
  .get((req, res) => {
    res.render("all-cars", {
      carsData: (carInfo.cars)
    })
  })
  .post((req, res) => {
    // req.params
    // req.body
    // we need first to parse json from body, but it is already done as we enabled json() in server.js
    res.send({
      "req.params": req.params,
      "req.body": req.body,
      "carInfo": carInfo
    })
  })

router.route("display-single-car/:id")
  .get((req, res) => {
    console.log('REQ', carInfo.cars[req.params.id])

    res.render("single-car", {
      id: req.params.id,
      carData: Object.entries(carInfo.cars[req.params.id])
    })
  })
  .put((req, res) => {
    res.send("put")
  })
  .delete((req, res) => {
    res.send("delete")
  })

router.route("/statistics")
  .get((req, res) => {
    res.send("get statistics")
  })
  .post((req, res) => {
    db.db("piatnik_cars").collection("statistics").insert({
      "sample": "foo"
    })
    res.send("post statistics")
  })
  .put((req, res) => {
    res.send("put statistics")
  })
  .delete((req, res) => {
    res.send("delete statistics")
router.route("/get-all-cars")
  .get((req, res) => {
    res.send({
      carsData: (carInfo.cars)
    })
  })

router.route("/get-single-car/:id")
  .get((req, res) => {
    res.send({
      carData: Object.entries(carInfo.cars[req.params.id])
    })
  })

router.route("/get-single-car-image/:id")
  .get((req, res) => {
    // console.log(carInfo.cars[req.params.id]["image_url"])
    res.sendFile(path.join(__dirname, "../public/images/cars/toyota_celica.jpeg"))
  })

module.exports = router
