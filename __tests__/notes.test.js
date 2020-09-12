'use strict';

const schema = require('../lib/model/notes-schema');
const NotesDB = require('../lib/model/notes-collection');

require('@code-fellows/supergoose');

describe('Note Model', () => {
  it('can create a new Note item', async () => {
      let obj = { text: 'test Note 1', category: 'Schedule'};
      const record = await NotesDB.save(obj);
      Object.keys(obj).forEach(key => {
        expect(record[key]).toEqual(obj[key]);
      });
  });

  it('can get() a note item', async ()=> {
    let obj = { text: 'test Note 2', category: 'Study'};
    const record = await NotesDB.save(obj);
    const note = await NotesDB.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(note[key]).toEqual(obj[key]);
    });
  }); 

  it('can delete() a note item', async ()=> {
    let obj = { text: 'test Note 3', category: 'Work'};
    const record = await NotesDB.save(obj);
    await NotesDB.deleteOne(record._id);
    const note = await NotesDB.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(note).toEqual(null);
    });
  }); 

  it('can update() a note item', async ()=> {
    let obj = { text: 'test Note 4', category: 'Morning'};
    const record = await NotesDB.save(obj);

    let search = {updateID: `${record._id}`, update: {Text: 'Not a note anymore', Category: 'Evening'}}; // tests with custom input
    await NotesDB.updateOne(search);
    const note = await NotesDB.get(record._id); // gets updated note
    Object.keys(obj).forEach(key => {
      expect(note[key]).toEqual(search.update[key]);
    });
  }); 
});

