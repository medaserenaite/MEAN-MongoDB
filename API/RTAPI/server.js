var express = require('express');
var app = express();
var path = require('path');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static( __dirname + '/public/dist/public/' ));
app.set('view engine', 'html');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskies');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String}
},{timestamps:true});

var Task = mongoose.model('Task',TaskSchema);

//-----------ADD A TASK-------------------------------
app.post('/tasks/', function(req,res){
    console.log(req.body);
    Task.create({name: req.body.name, description:req.body.description}, function(err, task){
        if(err){
            console.log(err);
            res.json({message:'ATTENTION! Something is wrong!',error:err});
        }            
        else{
            res.json({message:'You added a task!', task:task});
        } 
    })
    // task = new Task(req.body);
    // task.save(function(err){
// })
})
//-----------------------GET ALL TASKS-----------------
app.get('/tasks', function(req,res){
    Task.find({}, function(err,tasks){
        if(err){
            console.log(err);
            res.json({message:'Error',error:err});
        }     
        else{
            res.json({message:'Here are your tasks:', tasks:tasks});
        }          
    })
})

app.get('/tasks/:id', function(req,res){
    Task.find({_id:req.params.id},(err,results)=>{
        if(err){
            console.log(err);
            res.json({message:'Error',error:err});
        }     
        else{
            res.json({message:'Check this task:',data:results});
        }        
    })
})

//-----------------------UPDATE A TASK-----------------
app.put('/tasks/:id', function(req,res){
    Task.update({_id:req.params.id},{$set:{name:req.body.name, description:req.body.description}}, function(err){
        if(err){
            console.log(err);
            res.json({message:'Error',err});
        }     
        else{
            res.json({message:'Task updated successfully!'});
        }        
    })
})

//-----------------------DELETE A TASK-----------------
app.delete('/tasks/:id',(req,res)=>{
    Task.remove({_id:req.params.id},(err,tasks)=>{
        if(err){
            console.log(err);
            res.json({message:'Error',error:err});
        }     
        else{
            res.json({message:'You deleted the task'});
        }        
    })
})

app.listen(8000,function(){
    console.log('********listening on port 8000********')
})
