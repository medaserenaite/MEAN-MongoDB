const mongoose = require('mongoose');
const Zmogus = mongoose.model('Zmogus');
mongoose.Promise = global.Promise;

module.exports = {
  showAll: (req, res) => {
    Zmogus.find({}, (err, zmones) => {
      console.log(zmones, '----------')
      if (err) {
        res.json(err);
      }
      else {
        res.json(zmones);
      }
    })
  },
  add: (req, res) => {
    let zmogus = new Zmogus({name: req.params.name});
    let promise = zmogus.save();

    promise.then((doc) => {
      res.json("added!" + doc);
    })
    promise.catch((err) => {
      res.json(err);
    })
  },
  show: (req, res) => {
    Zmogus.findOne({name: req.params.name}, (err, zmogus) => {
      if (err) {
        res.json(err);
      }
      else {
        res.json(zmogus);
      }
    })
  },
  remove: (req, res) => {
    Zmogus.remove({name: req.params.name}, (err) => {
      if (err) {
        console.log("Issue deleting: " + err);
      }
      else {
        res.redirect('/');
      }
    })
  }
}