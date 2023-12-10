const express = require("express")
const router = express.Router()
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
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String
  }
}, {
  collection: 'user'
})
// const User = mongoose.model('User', userSchema);
// const bodyParser = require('body-parser');
// const app = express();
// const url = 'mongodb://localhost/blog';
// const User = require('../models/user.model');
// mongoose.set('strictQuery', true);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:  false}))
// module.exports = User;

// app.post('/api/user/login', (req, res) =>{
//   mongoose.connect(url, {}, function(err) {
//     if(err) throw err;
//     User.find({
//       username: req.body.username,
//       password: req.body.password
//     }, function(err, user) {
//       if(err) throw err;
//       if(user.length === 1) {
//         return res.status(200).json({
//           status: 'success',
//           data: user
//         })
//       } else {
//         return res.status(200).json({
//           status: 'fail',
//           message: 'Login Failed'
//         })
//       }
//     })
//   })
// })

router.route("/").get((req, res) => {
  res.send('Hello World!')
})

router.post("/", function(req, res) {
  res.send('Hello World!')
});

router.post("/login", function(req, res) {
  res.send('Hello World!')
});

router.post("/user/login", function(req, res) {
  res.send('Hello World!')
});

module.exports = router
