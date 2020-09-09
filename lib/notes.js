'use strict';

const noteDB = require('./model/notes-collection');

class Notes {
  constructor(input) {
    this.data = input;
  }

  async execute() {
    if (this.data.text) {         // save if stated with -a/--add
      let objNote = await noteDB.save(this.data.text, this.data.category);
      console.log('Note saved: ', objNote.text);
    };

    if (this.data.delete) {   // delete 1 note with --delete id
      let deletedNote = await noteDB.deleteOne(this.data.delete);
      console.log(`Deleted Note ${deletedNote}`);
    };

    if (this.data.deleteFilter) { // delete bunch of notes by category or all if stated with --clear category or --clear
      let deletedNotes = await noteDB.deleteBunch(this.data.deleteFilter);
      console.log(`Deleted All Notes ${this.data.deleteFilter ? "in Category " + this.data.deleteFilter : ""}`);
    };

    let objArray = await noteDB.get(this.data.getNotes); // get all notes or 1 note if stated with --get id
    objArray.forEach(note => {
      console.log(` ${note.Text}`, '\n', 
      `Category: ${note.Category}     ID: ${note._id}`, '\n'
      , "--------------------------------------------------");
    });
    
    mongoose.disconnect()
  }
  
  valid() {
    return this.data.methods && // checks if methods exists
    ((this.data.text && typeof this.data.text != "boolean") //checks if text exists
    || this.data.delete 
    || this.data.getNotes
    || this.data.deleteFilter);
  }

  help() {
    console.log(
      `Error bad input
      api usage: 'node notes.js -a/--add <note> -c <category><optional> --get<ID><optional> --delete <ID> --clear <Category><optional>'
      --------------------------------------------------
      -a/--add adds the following note to the database along with an optional category
      --get lists specified note or all saved notes if empty
      --delete deletes the note on the specified ID
      --clear deletes notes in the specified category or all notes if left empty`
    );

    mongoose.disconnect()
  }
}

module.exports = Notes;
