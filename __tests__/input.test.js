'use strict';

jest.mock('minimist');
const minimist = require('minimist');
minimist.mockImplementation(() => {
  return {
    a: 'This mock should work'
  }
})

const Input =  require('../lib/input.js');
describe('Input Module', ()=> {

  it('getMethod() has "undefined" default value with no valid input', () =>{
    let input = new Input();
    expect(input.getMethods()).toEqual(undefined);
    expect(input.getMethods({ _: [], ad: 'data'})).toEqual(["", "N/A", "", "", ""]);
  });

  it('getMethod() has a key with a proper input', () =>{
    let input = new Input();
    expect(input.getMethods({ _: [], a: 'data'})).toEqual(["a", "N/A", "", "", ""]);
    expect(input.getMethods({ _: [], add: 'data'})).toEqual(["add", "N/A", "", "", ""]);
  });
})
