'use strict';

class Notes {
  constructor(input) {
    this.data = input;
  }

  execute() {
    if (this.data) {
      console.log(`Adding Note: "${this.data[1]}"`);
    }
  }
  
  valid() {
    return (this.data[0] != 'Invalid' || this.data[0 !=undefined]) && this.data[1] != undefined;
  }

  help() {
    console.log(
      `Error bad input
      api usage: 'node notes.js -a <note>' OR 'node notes.js --add <note>'
      -a/add adds the following argument to the database`
    );
  }
}


module.exports = Notes;
