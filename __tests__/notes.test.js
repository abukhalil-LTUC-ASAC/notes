'use strict';

const schema = require('../lib/model/notes-schema');
const NotesDB = require('../lib/model/notes-collection');
const Notes = require('../lib/notes');

require('@code-fellows/supergoose');

describe('Note Model', () => {
  it('can create a new Note item', async () => {
      let obj = { Text: 'test Note 1', Category: 'Schedule'};
      const record = await NotesDB.save(obj);
      Object.keys(obj).forEach(key => {
        expect(record[key]).toEqual(obj[key]);
      });
  });

  it('can get() a note item', async ()=> {
    let obj = { Text: 'test Note 2', Category: 'Study'};
    const record = await NotesDB.save(obj);
    const note = await NotesDB.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(note[key]).toEqual(obj[key]);
    });
  }); 

  it('can delete() a note item', async ()=> {
    let obj = { Text: 'test Note 3', Category: 'Work'};
    const record = await NotesDB.save(obj);
    await NotesDB.deleteOne(record._id);
    const note = await NotesDB.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(note).toEqual(null);
    });
  }); 

  it('can deleteBunch() to delete all notes', async ()=> {
    let array = await NotesDB.deleteBunch({});
    console.log(array);
    expect(array.deletedCount).toEqual(2);
  }); 

  it('can deleteBunch() to delete a bunch of note items from 4 to 2', async ()=> {
    let obj1 = { Text: 'test Note 12', Category: 'Schedule'};
    let obj2 = { Text: 'test Note 22', Category: 'Study'};
    let obj3 = { Text: 'test Note 3', Category: 'Work'};
    let obj4 = { Text: 'test Note 4', Category: 'Work'};
    await NotesDB.save(obj1);
    await NotesDB.save(obj2);
    await NotesDB.save(obj3);
    await NotesDB.save(obj4);

    let array = await NotesDB.get();
    expect(array.length).toEqual(4);  // compare left notes equal to 4 before and 2 after

    await NotesDB.deleteBunch({Category: 'Work'});
    array = await NotesDB.get();
    expect(array.length).toEqual(2);
  }); 

  it('can update() a note item', async ()=> {
    let obj = { Text: 'test Note 4', Category: 'Morning'};
    const record = await NotesDB.save(obj);

    let search = {updateID: `${record._id}`, update: {Text: 'Not a note anymore', Category: 'Evening'}}; // tests with custom input
    await NotesDB.updateOne(search);
    const note = await NotesDB.get(record._id); // gets updated note
    Object.keys(obj).forEach(key => {
      expect(note[key]).toEqual(search.update[key]);
    });
  }); 
});

