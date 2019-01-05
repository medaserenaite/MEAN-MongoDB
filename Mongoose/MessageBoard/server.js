var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
const flash = require('express-flash');


mongoose.connect('mongodb://localhost/mbDB'),{useMongoClient: true};//added usemongoclienthere
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

  var Schema = mongoose.Schema;
//-------------- S C H E M A S ------------------------------------
var MessageSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 2},
    messagetext: {type:String, required: true, minlength:2},
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]}, {timestamps: true})
    mongoose.model('Message', MessageSchema);
    var Message = mongoose.model('Message');
   

var CommentSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 2},
    commenttext: {type:String, required: true, minlength:2},
    }, {timestamps: true});
    _message: {type: Schema.Types.ObjectId; ref:'Message'}
    mongoose.model('Comment', CommentSchema);
    var Comment = mongoose.model('Comment');
    

// Routes
//GET '/'
app.get('/', function(req, res) {
    mess = Message.find({}).exec(function(err, messages) {
        res.render('index', {mess:messages});
    })
    comm = Comment.find({}).exec(function(err, comments) {
        res.render('index', {comm:comments});
    })
})

// POST --------------- CREATE A MESSAGE ---------------------
app.post('/addmessage', function(req, res) {
    console.log("POST DATA", req.body);
    var message = new Message({name: req.body.name, messagetext: req.body.messagetext});
    message.save(function(err) {
      if(err) {
        console.log('something went wrong');
        console.log(message.errors);

        for(var key in err.errors){
            req.flash('addmessage', err.errors[key].message);
        }
        res.redirect('/')
      } 
      else {
        console.log('successfully added a Message!');
        res.redirect('/');
      }
    })
  })

// POST --------------- CREATE A COMMENT ---------------------


app.post('/addcomment/:id', function (req, res){
    Message.findOne({_id: req.params.id}, function(err, message){
        console.log(req.body.comment_name);
        console.log(req.body.comment_message);
        var comment = new Comment(
            {name: req.body.comment_name,
            commenttext: req.body.comment_message,
            _message: message._id
            });
        console.log(comment);
        comment.save(function(err){
            message.comments.push(comment);
            message.save(function(err){
                if(err) {
                    console.log('something went wrong');
                    console.log(comment.errors);
                    res.redirect('/')
                  } 
                  else {
                    console.log('successfully added a Comment!');
                    res.redirect('/');
                  }
            });
        });
    });
});

// app.post('/addcomment/:id', function(req, res) {
//     console.log("POST DATA", req.body);
//     var comment = new Comment({name: req.body.name, commenttext: req.body.commenttext});
//     comment.save(function(err) {
//       if(err) {
//         console.log('something went wrong');
//         console.log(comment.errors);

//         for(var key in err.errors){
//             req.flash('addcomment', err.errors[key].message);
//         }
//         res.redirect('/')
//       } 
//       else {
//         console.log('successfully added a Comment!');
//         res.redirect('/');
//       }
//     })
//   })

 


  app.listen(8000, function() {
    console.log("listening on port 8000");
})
