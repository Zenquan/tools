class CanvasService {
  /**
   * 
   * @param url 远程图片的链接
   * @param func 成功回调函数
   * .avatar 添加的图片样式
   */
  getAvator(url, func) {
    window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.send()

    xhr.onload = function (e: ProgressEvent<EventTarget> & {
      target: {
        status: number,
        response: Blob,
        readyState: number
      }
    }) {
      const { target } = e
      const { status, response, readyState } = target
      if (readyState == 4 && status == 200) {
        let blob = response;
        let img: {
          classList: any,
          src: string | ArrayBuffer | null
        } = document.createElement('img');
        img.classList.add("avatar")
        let reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          img.src = base64data;
        };
        func && func(img)
      }
    };
  }
}