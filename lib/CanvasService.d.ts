declare class CanvasService {
    /**
     *
     * @param url 远程图片的链接
     * @param avatarClass 添加的图片样式
     * @type 'img' | 'src'
     */
    getRemotePic(url: string, avatarClass: string, type?: 'img' | 'src'): Promise<unknown>;
}
export default CanvasService;
