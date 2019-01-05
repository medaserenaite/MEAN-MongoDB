const mongoose = require('mongoose');

const ZmogusSchema = new mongoose.Schema({
  name: {type: String, required: true},
  food: {type: String}
}, {timestamps: true});

const Zmogus = mongoose.model('Zmogus', ZmogusSchema);