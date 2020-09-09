'use strict';
// require the schema and move all notes crud operations
const schema = require('./notes-schema');

class NotesDB {
  constructor() {}
  
  save(obj) {
    let newRecord = new schema(obj);
    return newRecord.save();
  }

  get(_id) {
    return _id ? schema.findById({_id}) : schema.find();
  }

  deleteOne(_id) {
    return schema.findByIdAndDelete({_id});
  }

  deleteBunch(category) {
    return schema.deleteMany(category);
  }

  updateOne(obj) {
    console.log(obj);
    return schema.findByIdAndUpdate(obj.updateID, {Text: obj.update.Text, Category: obj.update.Category});
  }
}

module.exports = new NotesDB;