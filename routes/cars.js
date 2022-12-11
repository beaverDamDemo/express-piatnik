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

router.route("/statistics/resetSingleCar")
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
          db.db("piatnik_cars").collection("statistics").findOneAndUpdate({
            carName: req.body.carName
          }, {
            $set: {
              statistics: {
                won: 0,
                draw: 0,
                lost: 0
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
      message: "resetting statistics"
    })
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

      Object.entries(req.body).forEach(entry =>{
        db.db("piatnik_cars").collection("statistics").findOneAndUpdate({
            carName: entry[0],
          }, {
            $inc: {
              "statistics.won": parseInt(entry.duelsWon),
              "statistics.draw": parseInt(entry.duelsTie),
              "statistics.lost": parseInt(entry.duelsLost)
            }
          }, {
            upsert: true,
          })
      })
    });
    res.json({
      message: "put statistics"
    })
  })
  .delete((req, res) => {
    client.connect(function(err, db) {
      if (err || !db) {
        return err
      }
      db.db("piatnik_cars").collection("statistics").drop()
      res.send("delete statistics")
    })
  })

router.get("/statistics/:carName", (req, res) => {
  client.connect(function(err, db) {
    if (err || !db) {
      return err
    }
    db.db("piatnik_cars").collection("statistics").find({
      carName: req.params.carName,
    }).toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json({
          message: `Here we showing statistics for particular name : ${req.params.carName}`,
          value: result
        });
      }
    });
  })
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
