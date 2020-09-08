'use strict';

const Notes = require('../lib/notes');
// spy on the log
jest.spyOn(global.console, 'log');
 
describe('Notes Module', ()=> {

  it('execute() does nothing with no input', () =>{
    const notes = new Notes();
    notes.execute();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('execute() should work with an input', () =>{
    const notes = new Notes(['a', 'This works!']);
    notes.execute();
    expect(console.log).toHaveBeenCalled();
    });
});