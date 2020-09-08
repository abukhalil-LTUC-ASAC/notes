#!/usr/bin/env node

'use strict';

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();
const notes = new Notes(input.data);


notes.valid() ? notes.execute() : notes.help();
