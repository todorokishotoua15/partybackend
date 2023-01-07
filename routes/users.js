var express = require('express');
var router = express.Router();
const axios = require('axios');
User = require('../models/user');

function sendmessage(mes, mobile) {
	var phone_number = mobile;
	axios.post('https://whatapi.onrender.com/chat/sendmessage/' + phone_number, {
	message: mes,
	}).then(function(res1) {
		console.log(res1);
		flag  = 1;
	}).catch(function(err) {
		console.log(err);
	})
}

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
		mobile : req.body.mobile,
		email : req.body.email
	});

	newuser.save((err,doc) => {
		if (!err) {
			sendmessage("Hello " + req.body.name + ",\n", "You have selected " + req.body.prod + ".\n We will bring it to you as soon as we can!", req.body.mobile);
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

// router.post('/message', function(req,res,next) {
// 	var phone_number = req.body.mobile;

// 	var flag = 0;

	

	
	
	

	
	
// 	if (flag == 1) {
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'application/json');
// 		res.json({success: true, status: 'Successfull!'});
// 	}

// 	else {
// 		res.statusCode = 500;
// 		res.setHeader('Content-Type', 'application/json');
// 		res.json({err: "some error occured"});
// 	}
	
// })

module.exports = router;
