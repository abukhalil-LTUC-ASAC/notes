'use strict';

const Notes = require('../lib/notes');

var supergoose = require('supergoose');
var mongoose = require('mongoose');

var noteSchema = new Schema({
  Text: {type: String, require: true},
  Category: {type: String}
});

noteSchema.plugin(supergoose, {instance: mongoose});

// spy on the log
jest.spyOn(global.console, 'log');
 
describe('Notes Module', ()=> {

  it('execute() does nothing with no input', () =>{
    const notes = new Notes();
    notes.execute();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('execute() should work with an input', () =>{
    const notes = new Notes({
      Text: 'add Note',
      Category: 'Spy'});
    notes.execute();
    expect(console.log).toHaveBeenCalled();
    });
});