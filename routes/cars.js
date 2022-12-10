const express = require("express")
const router = express.Router()
const carInfo = require("../public/car-info.json")
const path = require('path');
const mongoose = require('mongoose')
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const connectionString = "mongodb+srv://dbUser:secret747400@cluster0.mqvqgm4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

router.post("/about", function(req, res) {
  res.send("About this wiki");
});

// app.get(/:id, (req, res) => {
//     const id = req.params.id;
// });

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
    client.connect(function(err, db) {
      if (err || !db) {
        return err
      }
      db.db("piatnik_cars").collection("statistics").insert({
        "carName": req.body.carName,
        "statistics": req.body.statistics
      })
    });
    res.json({
      message: "post statistics"
    })
  })









  .put((req, res) => {
    client.connect(function(err, db) {
      if (err || !db) {
        return err
      }

      let _won, _draw, _lost
      const entries = db.db("piatnik_cars").collection("statistics").find({
        carName: req.body.carName
      }).toArray(function(err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          _won = parseInt(result[0].statistics.won) + parseInt(req.body.statistics.won)
          _draw = parseInt(result[0].statistics.draw) + parseInt(req.body.statistics.draw)
          _lost = parseInt(result[0].statistics.lost) + parseInt(req.body.statistics.lost)

          db.db("piatnik_cars").collection("statistics").findOneAndUpdate({
            carName: req.body.carName
          }, {
            $set: {
              statistics: {
                won: _won,
                draw: _draw,
                lost: _lost
              },
            }
          }, {
            upsert: true,
            returnNewDocument: true
          })
        }
      })
    });
    res.json({
      message: "put statistics"
    })
  })
  .delete((req, res) => {
    res.send("delete statistics")
  })

router.get("/statistics/:id", (req, res) => {
  res.send(`Here we showing statistics for particular id : ${req.params.id}`)
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

router.route("/get-single-car-image/:id")
  .get((req, res) => {
    // console.log(carInfo.cars[req.params.id]["image_url"])
    res.sendFile(path.join(__dirname, "../public/images/cars/toyota_celica.jpeg"))
  })

module.exports = router
