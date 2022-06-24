const express = require("express")
const router = express.Router()
const carInfo = require("../public/car-info.json")


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

module.exports = router
