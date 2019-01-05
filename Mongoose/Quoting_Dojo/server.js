var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/quoteDB'),{useMongoClient: true};//added usemongoclienthere

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//here add validations as well
var QuoteSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 2},
    text: {type:String, required: true, minlength: 10}
   },{timestamps: true});
   mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
   var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'


// Routes
app.get('/', function(req, res) {
    res.render('index');
})
app.get('/quotes', function(req, res) {
    arr = Quote.find({}, function(err, quotes) {
        res.render('quotes', {arr:quotes});
    })
})

app.post('/add', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, text: req.body.text});
    quote.save(function(err) {
      if(err) {
        console.log('something went wrong');
        console.log(quote.errors);
        res.render('index', {errors:quote.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote!');
        res.redirect('/quotes')
      }
    })
  })

  app.listen(8000, function() {
    console.log("listening on port 8000");
})