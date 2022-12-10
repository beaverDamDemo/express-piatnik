const express = require("express")
const app = express()
const port = 3000
const cors = require('cors')
app.use(logger)

const mongoose = require('mongoose')
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const connectionString = "mongodb+srv://dbUser:secret747400@cluster0.mqvqgm4.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//
// client.connect(function(err, db) {
//   if (err || !db) {
//     return err
//   }
//
//   db.db("bezkoder_db").collection("store")
//     .find({}).limit(50)
//     .toArray(function(err, result) {
//       if (err) {
//         res.status(400).send("Error fetching listings!");
//       } else {
//         console.log(" resulting", typeof(result))
//         for (let i = 0; i < result.length; i++) {
//           console.log(" inner resulting", result[i])
//         }
//         // result.json(result);
//       }
//     });
//   console.log("Successfully connected to MongoDB.");
// });


app.use(express.static("public"))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use('images/favicon.jpg', express.static('images/favicon.jpg'));
app.use(cors({
  origin: "*"
}))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("home")
})

const carsRouter = require("./routes/cars")
app.use("/cars", carsRouter)

function logger(req, res, next) {
  console.log("req originalUrl: ", req.originalUrl)
  next()
}


app.listen(process.env.PORT || port, () => console.log(`Program listening at http://localhost:${port}`))

// app.listen(3000)
