import Request from '../src/Request'

export const BaseApi = new Request({
  baseURL: `http://zhihu.joyenjoy.tech`
}).getInstance()

test('#get', async () => {
  const users = (config) => {
    return BaseApi.get('/users', {...config})
  }
  
  let result;
  const res = await users({
    params: {}
  })

  expect(res.data).toEqual([{ gender: 'male', _id: '5f6218c9a598b7502a4089a2', name: '蔡镇泉222' }])
})