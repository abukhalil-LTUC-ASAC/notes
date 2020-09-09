'use strict';
// require the schema and move all notes crud operations
const schema = require('./notes-schema');

class NotesDB {
  constructor() {}
  
  save(obj) {
    return new schema({Text: obj.text, Category: obj.category}).save();
  }

  get(_id) {
    if (_id) {
      return schema.findOne({_id});
    } else {
      return schema.find();
    }
  }

  deleteOne(_id) {
    return schema.findByIdAndDelete({_id});
  }

  deleteBunch(category) {
    return schema.deleteMany(category);
  }
}

module.exports = new NotesDB;