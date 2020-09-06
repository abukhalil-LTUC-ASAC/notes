'use strict';

// Notice: This is not a constructor.
// this demonstrates exporting a POJO (plain old javascript object)
const Notes = {};

Notes.execute = function (opts) {
  if (opts) {
    if (opts.error || opts.note.length == 0) {
        console.log('Error! Bad Input');
    } else {
      console.log(`Adding Note: "${opts.note}"`);
      // console.log(`Method "${opts.method}"`);  
    }
  }
};

module.exports = Notes;
