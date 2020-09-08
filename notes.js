#!/usr/bin/env node

'use strict';

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');
const mongoose = require('mongoose');

const input = new Input();
const notes = new Notes(input);
const MONGOOSE_URL = 'mongodb://localhost:27017/notes';

mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true,
  useFindAndModify : false
});

notes.valid() ? notes.execute() : notes.help();
