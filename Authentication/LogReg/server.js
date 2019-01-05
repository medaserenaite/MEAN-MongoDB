var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(express.static(__dirname + "/client/static"));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + "/client/views");
app.set('view engine', 'ejs');
app.use(session({secret: 'goodforyou'}));

mongoose.Promise = global.Promise;

require('./server/config/mongoose.js');

var router = require('./server/config/routes.js');
router(app);

var PORT = 8000;
var line = "\n************************\n"
app.listen(8000, function(){
	console.log(line + "Listening on port " + PORT + line);
})

// var express = require('express');
// var path = require('path');
// var app = express();
// var bodyParser = require('body-parser');
// var port = 1234;
// var session = require('express-session');

// app.use(session({secret: 'codeswin'}));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/client/static'));
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/client/views');

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);

//   app.listen(8080, function() {
//     console.log("listening on port 8080");
// })
// // var express = require('express');
// // var app = express();
// // var bodyParser = require('body-parser');
// // var path = require('path');
// // var mongoose = require('mongoose');
// // var session = require('express-session');
// // const flash = require('express-flash');


// // mongoose.connect('mongodb://localhost/mbDB'),{useMongoClient: true};//added usemongoclienthere

// // mongoose.Promise = global.Promise;

// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, './static')));
// // app.set('views', path.join(__dirname, './views'));
// // app.set('view engine', 'ejs');
// // app.use(flash());
// // app.use(session({
// //     secret: 'keyboardkitteh',
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { maxAge: 60000 }
// //   }))

  
// // //-------------- S C H E M A S ------------------------------------
// // var Schema = mongoose.Schema;
   
// // var UserSchema = new mongoose.Schema({
// //     email: {
// //         type: String,
// //         required: [true, 'Please enter your email.'],
// //         unique: [true, 'Email already taken.'],
// //     },
// //     name: {
// //         type: String,
// //         required: [true, 'Please enter your first name.'],
// //     },
// //     lastname: {
// //         type: String,
// //         required: [true, 'Please enter your last name.'],
// //     },
// //     password: {
// //         type: String,
// //         required:[true,"Password is required."],
// //         minlength: [8,"Password must be between 8-255 characters."],
// //         maxlength: [255,"Password must be between 8-255 characters."],
// //         validate: {
// //           validator: function( value ) {
// //             return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{2,32}/.test( value );
// //           },
// //           message: "Password failed validation, you must have at least 1 number, uppercase and special character"
// //         }},
// //     // password_confirm: {
// //     //     type: String,
// //     //     required:[true,"Password Confirmation is required."],
// //     //     validate: {
// //     //         validator: function(value){
// //     //             return value == this.password;
// //     //         }, message:"Passwords must match."
// //     //     }},
// //     bd: {
// //         type: Date,
// //         required: [true, 'Please enter your birthday.'],
// //     },
// // }, {timestamps: true});
// // mongoose.model('User', UserSchema);
// // var User = mongoose.model('User');

// // //-------------------------------------------------------------
// //   app.listen(8080, function() {
// //     console.log("listening on port 8080");
// // })

// // // Routes
// // //GET '/'
// // app.get('/', function(req, res) {
// //     res.render('index');
// // })

// // function Users() {
// //     this.index = function(req, res){
// //         res.render('index', {errors: ''})
// //     }
// //     this.signup = function(req, res){
// //         let user = new User(req.body);
// //         user.save(function(err){
// //             if(err){
// //                 console.log(err);
// //                 res.render('index', {errors: err});
// //             }
// //             console.log('user created');
// //             req.session.user_id = user.id;
// //             req.session.name = user.first_name+ " "+user.last_name;
// //             res.redirect('/welcome');
// //         });
// //     }
// //     this.login = function(req, res){
// //         User.findOne({email: req.body.email}, function(err, result) {
// //             if(err){
// //                 console.log(err);
// //                 res.render('index', {errors: err});
// //             }
// //             console.log('login successful');
// //             req.session.user_id = result.id;
// //             req.session.name = result.first_name+ " "+result.last_name;
// //             res.redirect('/welcome');
// //         });
// //     }
// //     this.welcome = function(req, res){
// //         if(!req.session.user_id) {
// //             res.redirect('/');
// //         }
// //         else{
// //             res.render('welcome', {id: req.session.user_id, name: req.session.name});
// //         }
// //     }
// //     this.logout = function(req, res) {
// //         req.session.destroy();
// //         res.redirect('/')
// //     }
// // }

// // module.exports = new Users();

// // //-------------log-------------
// // // app.post('/log', (req,res) => {
// // //     console.log("req.body: ", req.body);
// // //     User.findOne({email:req.body.email, password:req.body.password}, (err, user) =>{
// // //         if (err){
// // //             for(var key in err.errors){
// // //                 req.flash('addmessage', err.errors[key].message);
// // //             }
// // //             res.redirect('/') ;
// // //         } 
// // //         else{
// // //             req.session.user_id = user._id;
// // //             req.session.email = user.email;
// // //             res.redirecr('home');
// // //         }
// // //     })
    
// // // })


// // // //-------------reg-------------
// // // app.post('/reg', function(req,res){
// // //     User.findOne({_id: req.params.id}, function(err, message){
// // //         var user = new User(
// // //             {name: req.body.name,
// // //             lastname: req.body.lastname,
// // //             email: req.body.email,
// // //             password: req.body.password,
// // //             confirm: req.body.confirm,
// // //             bd: req.body.bd
// // //         });
// // //         User.save(function(err){
// // //             if(err){
// // //                 console.log(user.errors);
// // //                 for(var key in err.errors){
// // //                     req.flash('adduser', err.errors[key].message);
// // //                 }
// // //                 res.redirect('/')
// // //             } else {
// // //                 console.log('Successfully registered a new user')
// // //                 res.redirect('/');
// // //             }
// // //         })
            
// // //     })
// // //     res.render('home');
// // // })
