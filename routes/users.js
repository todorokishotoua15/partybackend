var express = require('express');
var router = express.Router();
const axios = require('axios');
User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}).then((users) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		console.log(users);
		res.json(users);
	})
});

router.post('/', function(req,res,next) {

	var newuser = new User({
		name: req.body.name,
		prod : req.body.prod,
		mobile : req.body.prod,
		email : req.body.email
	});

	newuser.save((err,doc) => {
		if (!err) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true, status: 'Saved Successfully!'});
		}
		else {
			console.log(err);
			res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
		}
	})

})

router.post('/message', function(req,res,next) {
	var phone_number = req.body.mobile;

	var flag = 0;

	
	axios.post('http://localhost:5000/chat/sendmessage/' + phone_number, {
	message: req.body.message,
	}).then(function(res1) {
		console.log(res1);
		flag  = 1;
	}).catch(function(err) {
		console.log(err);
	})
	

	
	
	if (flag == 1) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({success: true, status: 'Successfull!'});
	}

	else {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.json({err: "some error occured"});
	}
	
})

module.exports = router;
