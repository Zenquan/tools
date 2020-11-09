import CanvasService from '../src/CanvasService'

const canvas = new CanvasService()

test('#getRemotePic', async () => {
  const avatar: any = await canvas.getRemotePic('https://joyrun-activity-upyun.thejoyrun.com/huodong/2020/09/run-challenge/assets/img/share.jpg', 'avatar')
  console.log('avatar>>>', avatar.src);
  expect(avatar)
})