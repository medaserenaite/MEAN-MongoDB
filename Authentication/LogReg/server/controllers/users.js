var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');

module.exports = {
	register: function(req, res){
		session.errors = [];
		if(req.body.password != req.body.password_conf){
			session.errors.push("Password and confirmation must match.")
		}
		var user = new User({first_name: req.body.first_name, 
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			bday: req.body.bday});
		user.save(function(err){
			if(err){
				for(let k in err.errors){
					if(err.errors.hasOwnProperty(k)){
						session.errors.push(err.errors[k]);
					}
				}
			}
			else{
				session.user = user;
			}
			res.redirect("/");
		})
	},

	login: function(req, res){
		//1. query db by email
		User.findOne({email: req.body.email}, function(err, user){
			session.errors = [];
			if(user == null){
				session.errors.push("No account associated with that email address.");
			}
			else{
				if(user.password == req.body.password){
					//if match, log in user (i.e. set user as session.user)
					session.user = user;
				}
				else{
					session.errors.push("Password incorrect.")
				}
			}
			res.redirect("/")
		})
	}
}