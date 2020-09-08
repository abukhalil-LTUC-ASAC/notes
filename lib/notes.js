'use strict';

const NotesDB = require('./model/notes-schema.js');

class Notes {
  constructor(input) {
    this.data = input;
  }

  async execute() {
    if (this.data.text) {
      await this.save(this.data.text, this.data.category);
    };
    if (this.data.listAll) {
      await this.listAll();
    };
    if (this.data.delete) {
      await this.delete(this.data.delete);
    };
    if (this.data.deleteFilter) {
      await this.filterNotes(this.data.deleteFilter);
    };
    process.exit();
  }
  
  valid() {
    return this.data.methods && // checks if methods exists
    ((this.data.text && typeof this.data.text != "boolean") //checks if text exists
    || this.data.delete 
    || this.data.listAll
    || this.data.deleteFilter);
  }

  help() {
    console.log(
      `Error bad input
      api usage: 'node notes.js -a/--add <note> -c <category><optional> --list --delete <ID> --clear <Category>'
      --------------------------------------------------
      -a/--add adds the following argument to the database along with optional category
      --list lists all available notes
      --delete deletes the note on the specified ID
      --clear deletes notes in the specified category or all notes if left empty`
    );
    process.exit();
    }

  async save(text, category) {
    let templateNote = {
      Text: `${text}`,
      Category: `${category}`
    };
  
    let noteItem = await new NotesDB(templateNote).save();
    console.log('note saved: ', text);
  }

  async listAll() {
    let listItems = await NotesDB.find();
    listItems.forEach(note => {
      console.log(` ${note.Text}`, '\n', 
      `Category: ${note.Category}     ID: ${note._id}`, '\n'
      , "--------------------------------------------------");
    })
  }

  async delete(id) {
    let deleteItem = await NotesDB.findByIdAndDelete(id);
    console.log(`Deleted Note ${deleteItem}`);
  }

  async filterNotes(category) {
    await NotesDB.deleteMany(category);
    console.log(`Deleted Notes ${category.category ? "in Category " + category.category : "All"}`);
    await this.listAll();
  }
}


module.exports = Notes;
