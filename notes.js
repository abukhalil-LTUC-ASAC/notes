#!/usr/bin/env node

'use strict';

const mongoose = require('mongoose');
const MONGOOSE_URL = 'mongodb://localhost:27017/notes';
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true,
  useFindAndModify : false
});


const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();  
const notes = new Notes(input);

async function startApp() {
  if (notes.valid() && !input.help) {
    await notes.execute();
  } else {
    await notes.help();
  } 
  mongoose.disconnect();
}

startApp();