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

  it('getMethod() has "Invalid" default value with no valid input', () =>{
    let input = new Input();
    expect(input.getMethod()).toEqual(undefined);
    expect(input.getMethod({ _: [], ad: 'data'})).toEqual("Invalid");
  });

  it('getMethod() has a key with a proper input', () =>{
    let input = new Input();
    expect(input.getMethod({ _: [], a: 'data'})).toEqual('a');
    expect(input.getMethod({ _: [], add: 'data'})).toEqual('add');
  });
})
