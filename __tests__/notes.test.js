'use strict';

const Notes = require('../lib/notes');

var supergoose = require('supergoose');
var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  Text: {type: String, require: true},
  Category: {type: String}
});

noteSchema.plugin(supergoose, {instance: mongoose});

// spy on the log
jest.spyOn(global.console, 'log');


describe('Notes Module', ()=> {
  // deals with process.exit()
  const setProperty = (object, property, value) => {
    const originalProperty = Object.getOwnPropertyDescriptor(object, property)
    Object.defineProperty(object, property, { value })
    return originalProperty
  };
  const mockExit = jest.fn();
  setProperty(process, 'exit', mockExit);

  it('execute() does nothing with no input', async () =>{
    const notes = new Notes({});
    await notes.execute();
    expect(console.log).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith('ERROR_CODE');

  });

  it('execute() should work with an input', async () =>{
    const notes = new Notes({
      Text: 'add Note',
      Category: 'Spy'});
    await notes.execute();
    expect(console.log).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith('ERROR_CODE');
    });
    
});

