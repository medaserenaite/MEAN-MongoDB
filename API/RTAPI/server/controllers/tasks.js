// const mongoose = require('mongoose');
// const Task = mongoose.model('Task');
// mongoose.Promise = global.Promise;

// module.exports = {
//   showAll: (req, res) => {
//     // console.log(Task.db.name)
//     // console.log(Task.db.port)
//     // console.log(Task.db.host)
//     // let task = new Task({name: 'foo', description: 'this is the description'});
//     // task.save().then(function(response){
//     //   console.log('respose', response)
//       Task.find({}, (err, tasks) => {
//        // console.log(tasks, '----------')
//         if (err) {
//           res.json(err);
//         }
//         else {
//           res.json(tasks);
//         }
//       })
//   },
//   show: (req, res) => {
//     Task.findOne({name: req.params.name}, {description: req.params.description}, (err, task) => {
//       if (err) {
//         res.json(err);
//       }
//       else {
//         res.json(task);
//       }
//     })

//   },
//   add: (req, res) => {
//     let zmogus = new Zmogus({name: req.params.name});
//     let promise = zmogus.save();

//     promise.then((doc) => {
//       res.json("added!" + doc);
//     })
//     promise.catch((err) => {
//       res.json(err);
//     })
//   },

//   remove: (req, res) => {
//     Zmogus.remove({name: req.params.name}, (err) => {
//       if (err) {
//         console.log("Issue deleting: " + err);
//       }
//       else {
//         res.redirect('/');
//       }
//     })
//   }
// }