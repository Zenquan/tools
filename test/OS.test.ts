import os from '../src/OS'

test('isPC', () => {
  expect(os.os.isPC).toEqual(true)
})

test('isTablet', () => {
  expect(os.os.isTablet).toEqual(false)
})

test('isPhone', () => {
  expect(os.os.isPhone).toEqual(false)
})

test('isAndroid', () => {
  expect(os.os.isAndroid).toEqual(false)
})

test('getNetworkType', async () => {
  expect(await os.getNetworkType()).toEqual('wifi')
})

test('setRootFontSizeFromClient', () => {
  // console.log('>>>', os.setRootFontSizeFromClient());
  // expect(os.os.isPC).toEqual(true)
})

test('checkAppVersionIsOK1', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.7.0')).toEqual(false)
})

test('checkAppVersionIsOK2', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.14.3')).toEqual(true)
})

test('checkAppVersionIsOK3', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.14.4')).toEqual(true)
})

test('checkAppVersionIsOK4', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.1.0')).toEqual(false)
})

test('checkAppVersionIsOK5', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '4.7.0')).toEqual(false)
})

test('checkAppVersionIsOK6', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.15.0')).toEqual(true)
})

test('checkAppVersionIsOK7', () => {
  expect(os.checkAppVersionIsOK('5.14.3', '5.16.2')).toEqual(true)
})