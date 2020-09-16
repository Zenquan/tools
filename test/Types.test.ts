import Types from '../src/Types'

const type = Types.type

test('#Number', () => {
  expect(type(2)).toEqual('Number');
});

test('#String', () => {
  expect(type('zen')).toEqual('String');
});

test('#Boolean', () => {
  expect(type(true)).toEqual('Boolean');
});

test('#Null', () => {
  expect(type(null)).toEqual('Null');
});

test('#Undefined', () => {
  expect(type(undefined)).toEqual('Undefined');
});

test('#Array', () => {
  expect(type([])).toEqual('Array');
});

test('#Object', () => {
  expect(type({})).toEqual('Object');
});

test('#Function', () => {
  expect(type(() => {})).toEqual('Function');
});