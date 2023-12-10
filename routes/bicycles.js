const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const connectionString =
'mongodb+srv://dbUser:secret747400@cluster0.mqvqgm4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

router.route('/').get((req, res)=>{
	client.connect(function(err, db) {
		if(err || !db) {
			return err;
		}
		db.db('test').collection('biciklete').find({}).toArray(function(err, result) {
			if(err) {
				res.status(400).send("Error fetching listings");
			} else {
				res.json({
					message: `Here we showing all bicycles`,
					value: result
				})
			}
		})
	})
})

router.route('/single-bicycle/:id').put((req, res) => {
	client.connect(function(err, db) {
		if(err || !db) {
			return err;
		}
		const entry = db.db('test').collection('biciklete').findOne({
			_id: req.body._id
		}, function(err, doc){
			if(err){
				res.status(400).send("Error fetching listing.")
			} else {
				db.db('test').collection('biciklete').findOneAndUpdate({
					_id: req.body._id
				}, {
					$set: {
						in_working_order: req.body.newValue,
					}
				}, {
					upsert: true,
					returnNewDocument: true
				}, function(err, updatedDoc) {
					if(err) {
						res.status(500).send("Error updating listing.")
					}		else {
						res.json({
							message: `Looks like it has been updated, ${req.body._id} ${req.body.newValue}`
						})
					}
				})
			}
		})
	})
})

module.exports = router;