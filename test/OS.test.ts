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