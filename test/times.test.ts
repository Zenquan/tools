import times from '../src/times'

test('#formatTime', () => {
  expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
});

test('#getMonths', () => {
  expect(times.getMonths('2018-1-29', 6, 1)).toEqual(["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]);
});

test('#getDays', () => {
  expect(times.getDays('2018-1-29', 6)).toEqual([
    "2018-1-23",
    "2018-1-24",
    "2018-1-25",
    "2018-1-26",
    "2018-1-27",
    "2018-1-28",
    "2018-1-29",
    "2018-1-30",
    "2018-1-31",
    "2018-2-1",
    "2018-2-2",
    "2018-2-3",
    "2018-2-4",
  ]);
});

test('#formatHMS', () => {
  expect(times.formatHMS(3610)).toEqual('1h0m10s');
});

test('#getAge', () => {
  expect(times.getAge('1990/01/01')).toEqual(30);
});

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });

// test('#formatTime', () => {
//   expect(times.formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}')).toEqual('2018/01/29 00:00:00');
// });