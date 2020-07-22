import {square, cube} from '../src/math'

test('#square()', () => {
  expect(square(2)).toEqual(4);
});

test('#cube()', () => {
  expect(cube(2)).toEqual(8);
});