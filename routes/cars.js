const express = require("express")
const router = express.Router()
const carInfo = require("../public/car-info.json")


router.route("/").get((req, res) => {
  res.render("all-cars", { carsData: (carInfo.cars)})
})

router.route("/:id")
  .get((req, res) => {
    console.log('REQ', carInfo.cars[req.params.id])

    res.render("single-car", {
      id: req.params.id,
      carData: Object.entries(carInfo.cars[req.params.id])
    })
  })
  .post((req, res) => {
    res.send("post")
  })
  .put((req, res) => {
    res.send("put")
  })
  .delete((req, res) => {
    res.send("delete")
  })

module.exports = router
