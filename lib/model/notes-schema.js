'use strict';

const mongoose = require('mongoose');

const note = mongoose.Schema({
  Text: {type: String, require: true},
  Category: {type: String}
})

// ENUMS 
// note study/info/idea/schedule
module.exports = mongoose.model('note', note);
