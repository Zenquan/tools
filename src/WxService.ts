import axios from 'axios'
import jsonAdapter from 'axios-jsonp'

const wx = (window as any).wx;

interface IWxDownLoadService {
  download: Function, 
}

class WxDownLoadService implements IWxDownLoadService{
  private url: string
  constructor (url: string) {
    this.url = url
  }
  download (options: Array<Function>) {
    wx.showLoading({
      title: '保存中 0%'
    })
    const task: any = wx.downloadFile({
      url: this.url,
      success: async (o) => { 
        await options.map(option => {
          option(o)
        })
        await wx.hideLoading()
      },
      fail: (o) => {
        wx.hideLoading()
        wx.showToast({title: '保存失败'})
      }
    })
    
    task.progress(function (o) {
      100 === o.progress ? '' : wx.showLoading({
        title: '保存中 ' + o.progress + '%'
      })
    })
  }
}

class WxVideoDownLoadService extends WxDownLoadService{
  constructor (url: string) {
    super(url)
  }
  public downloadVideo () {
    let tasks: Array<Function> = []
    tasks.push((o) => {
      wx.saveVideoToPhotosAlbum({
        filePath: o.tempFilePath,
        success: (o) => {
          wx.showToast({title: '保存成功'})
        },
        fail: (o) => {
          wx.showToast({title: '保存失败'})
        }
      })
    }) 
    this.download(tasks)
  }
  saveVideo () {
    wx.getSetting({
      success: (o) => {
        o.authSetting['scope.writePhotosAlbum'] ? this.downloadVideo() : wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            this.downloadVideo()
          },
          fail: (o) => {
            wx.showModal({
              title: '提示',
              content: '视频保存到相册需获取相册权限请允许开启权限',
              confirmText: '确认',
              cancelText: '取消',
              success: (o) => {
                o.confirm ? (wx.openSetting({
                    success: (o) => { }
                })) : ''
              }
            })
          }
        })
      }
    })
  }
}

interface IWxService {
  miniSaveVideo: Function,
  miniScanCode: Function,
  wxH5Share: Function
}

class WxService implements IWxService {
  /**
   * 微信小程序保存视频
   * @param videoUrl 视频的url
   */
  miniSaveVideo = (videoUrl: string) => {
    const service = new WxVideoDownLoadService(videoUrl)
    service.saveVideo()
  }
  /**
   * 微信小程序扫码
   */
  miniScanCode = () => {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        scanType: ['qrCode'],
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
  
  /**
   * 微信h5页面分享
   * @param shareData 分享的数据
   * @param fn 分享中需要插入的特定函数，比如调起悦跑圈原生方法
   * run.menuShare(shareData);
   */
  wxH5Share = (shareData, fn?: Function) => {
    fn && fn()
    // const curlUrl = encodeURIComponent(window.location.href);
    axios({
      url: `https://webevent.thejoyrun.com/wechatapi/jsconfig?url=${window.location.href}`,
      adapter: jsonAdapter,
    })
      .then(res => {
        const data = res.data;
  
        console.log('res', res)
  
  
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });
      })
      .catch(err => console.error(err));
  
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      });
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
    });
  
    wx.error(function(res) {
      //alert(res.errMsg);
    });
  }
}

export default new WxService() 
