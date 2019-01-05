var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
// app.use(session({
//     secret: 'keyboardkitteh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))
mongoose.connect('mongodb://localhost/quoteDB'),{useMongoClient: true};//added usemongoclienthere
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//here add validations as well
var MonkeySchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 2},
    type: {type:String, required: true, minlength:2},
    age: {type:Number, required: true}
   });
   mongoose.model('Monkey', MonkeySchema);
   var Monkey = mongoose.model('Monkey')

// Routes
//GET '/' Displays all of the mongooses.
app.get('/', function(req, res) {
    arr = Monkey.find({}, function(err, monkeys) {
        res.render('index', {arr:monkeys});
    })
})

// GET '/mongooses/:id' Displays information about one mongoose.
app.get('/show/:id', function(req, res) {
    monk = Monkey.findOne({_id:req.params.id}, function(err, monkeys) {
         res.render('monkey', {monk:monkeys});
    })
   
})

// GET '/mongooses/new' Displays a form for making a new mongoose.
app.get('/monkey/new', function(req,res) {
    res.render('new');
})

// POST '/mongooses' Should be the action attribute for the form in the above route (GET '/mongooses/new').
app.post('/add', function(req, res) {
    var monkey = new Monkey({name: req.body.name, type:req.body.type, age:req.body.age});
    monkey.save(function(err) {
        if(err) {
            console.log('##################### ERRORS ######################')
            console.log(monkey.errors);
            res.render('index', {errors:monkey.errors})
        } else {
            res.redirect('/')
        }
    })
})

// GET '/mongooses/edit/:id' Should show a form to edit an existing mongoose.
app.get('/edit/:id', function(req, res) {
    monk = Monkey.findOne({_id:req.params.id}, function(err, monkeys){
        res.render('edit',  {monk:monkeys});
    })
})

// POST '/mongooses/:id' Should be the action attribute for the form in the above route (GET '/mongooses/edit/:id').
app.post('/update/:id', function(req, res) {
    console.log(req);
    Monkey.update({_id: req.params.id}, 
        {name : req.body.name,
        type : req.body.type,
        age : req.body.age},
        function(err){
            if(err){
            console.log("smths wrong-----------------------")
            res.redirect('/edit/${req.params.id}')
            }
            else {
                res.redirect("/")
            }
        })
})

// POST '/mongooses/destroy/:id' Should delete the mongoose from the database by ID.
app.post('/delete/:id', function(req, res) {
    Monkey.remove({_id: req.params.id}, function(err){
        res.redirect('/');
    }) 
})

  app.listen(8000, function() {
    console.log("listening on port 8000");
})
