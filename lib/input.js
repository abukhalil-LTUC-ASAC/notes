'use strict';

const minimist = require('minimist');

class Input {
  constructor() {
    const args = minimist(process.argv.slice(2));
    this.methods = this.getMethods(args);

    this.text = args[this.methods[0]] || undefined;
    this.category = args[this.methods[1]];
    this.getNotes = this.methods[2];
    this.delete = args[this.methods[3]] || undefined;
    this.deleteFilter = this.methods[4].length > 0 && (args[this.methods[4]] != true && args[this.methods[4]].length > 0) ? {Category: args[this.methods[4]]} : {};
  }

  getMethods(args) {
    let addMethod = '';
    let categoryMethod = 'N/A';
    let getNotes = '';
    let deleteMethod = '';
    let deleteFilter = '';
    if (args) {
      for (let i = 1; i < Object.keys(args).length; i++) {
        let key = Object.keys(args)[i];
        if (/^a$|add$/gmi.test(key)) addMethod = key;
        if(/^c$|category$/gmi.test(key)) categoryMethod = key;
        if (/^get$/gmi.test(key)) getNotes = key;
        if (/^delete$/gmi.test(key)) deleteMethod = key;
        if (/^clear$/gmi.test(key)) deleteFilter = key;
      }
      return [addMethod, categoryMethod, getNotes, deleteMethod, deleteFilter];
    } else {
      return undefined;
    }
  }
}

module.exports = Input;
