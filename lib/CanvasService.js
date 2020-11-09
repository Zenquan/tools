class CanvasService {
    /**
     *
     * @param url 远程图片的链接
     * @param avatarClass 添加的图片样式
     * @type 'img' | 'src'
     */
    getRemotePic(url, avatarClass, type) {
        return new Promise((resolve, reject) => {
            window.URL = window.URL || window.webkitURL; // Take care of vendor prefixes.
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.send();
            xhr.onload = function (e) {
                const { target } = e;
                const { status, response, readyState } = target;
                if (readyState === 4 && status === 200) {
                    let blob = response;
                    let img = document.createElement('img');
                    img.classList.add(avatarClass);
                    let reader = new window.FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        let base64data = reader.result;
                        if (type === 'src') {
                            resolve(base64data);
                        }
                        else {
                            img.src = base64data;
                            resolve(img);
                        }
                    };
                }
            };
        })
            .catch(error => {
            console.log('error>>>', error);
        });
    }
}
export default CanvasService;
