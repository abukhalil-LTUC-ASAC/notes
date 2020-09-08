'use strict';

const minimist = require('minimist');

class Input {
  constructor() {
    const args = minimist(process.argv.slice(2));
    this.method = this.getMethod(args);
    this.note = this.addData(this.method, args);
    this.data = [this.method, this.note];
  }

  getMethod(args) {
    if (args) {
      let validAddMethods = /^a$|add$/gmi;
      for (let i = 1; i < Object.keys(args).length; i++) {
        let key = Object.keys(args)[i];
        return validAddMethods.test(key) ? key : 'Invalid';
      }
    } else 
    return undefined;
  }

  addData(key, args) {
    return (key &&  key != 'Invalid' && args[key] && args[key].length > 0) ? args[key] : undefined;
  }
}

module.exports = Input;
