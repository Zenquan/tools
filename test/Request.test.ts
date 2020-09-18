import Request from '../src/Request'

export const BaseApi = new Request({
  baseURL: `http://zhihu.joyenjoy.tech/`
}).getInstance()

test('#get', () => {
  const users = (config) => {
    return BaseApi.get('/users', {...config})
  }
  
  let result;
  users({
    params: {}
  }).then(res => {
    console.log('res>>>', res);
    result = res
  })

  expect(result).toEqual([])
})