import stringService from '../src/StringService'

test('#toParseJson', () => {
  expect(stringService.toParseJson('{"a": 1, "b": "c"}')).toEqual({a: 1, b: "c"})
})

test('#trim-all', () => {
  expect(stringService.trim(' zen- tools ', 1)).toEqual('zen-tools')
})

test('#trim-first-last', () => {
  expect(stringService.trim(' zen-tools ', 2)).toEqual('zen-tools')
})

test('#trim-first', () => {
  expect(stringService.trim(' zen-tools ', 3)).toEqual('zen-tools ')
})

test('#trim-last', () => {
  expect(stringService.trim(' zen-tools ', 4)).toEqual(' zen-tools')
})

test('#changeCase-1', () => {
  expect(stringService.changeCase('zen-tools', 1)).toEqual('Zen-Tools')
})

test('#changeCase-2', () => {
  expect(stringService.changeCase('Zen-tools', 2)).toEqual('zEN-tOOLS')
})

test('#changeCase-3', () => {
  expect(stringService.changeCase('Zen-tools', 3)).toEqual('zEN-TOOLS')
})

test('#changeCase-4', () => {
  expect(stringService.changeCase('Zen-tools', 4)).toEqual('ZEN-TOOLS')
})

test('#changeCase-5', () => {
  expect(stringService.changeCase('Zen-tools', 5)).toEqual('zen-tools')
})