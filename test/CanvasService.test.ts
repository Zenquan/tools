import CanvasService from '../src/CanvasService'

const canvas = new CanvasService()

test('#getAvator', async () => {
  const avatar: any = await canvas.getAvator('https://joyrun-activity-upyun.thejoyrun.com/huodong/2020/09/run-challenge/assets/img/share.jpg', 'avatar')
  console.log('avatar>>>', avatar.src);
  expect(avatar)
})