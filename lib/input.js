'use strict';

// Bring in some 3rd party libraries to help us out


// const isUrl = require('is-url'); // validate if it's a url

const minimist = require('minimist');

function Input() {

  // console.log("process.argv : ", process.argv);
  
  // Get the -x style of arguments from the user
  const args = minimist(process.argv.slice(2));
  // console.log(" args minimist >>>>> ", args)
  // Use the args to create our properties with helper methods
  this.method = this.add(args);
}

Input.prototype.add = function (method = '') {
  let validAddMethods = /^a$|add$/gmi;
  for (let i = 1; i < Object.keys(method).length; i++) {
    let key = Object.keys(method)[i];
    if (validAddMethods.test(key)) {
      this.note = method[key];
      // return 'put';
    } else {
      this.error = 'error';
    }
  };
};

module.exports = Input;
