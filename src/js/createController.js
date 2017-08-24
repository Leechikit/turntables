/**
* @name: createController
* @description: 
* @author: lizijie
* @update: 
*/

let createController = (() => {

    // 左边音频音量空间
    let volumeLeftEl = document.querySelector('#volumn-1');
    // 右边音频音量空间
    let volumeRightEl = document.querySelector('#volumn-2');
    // 左边音源
    let soundLeft = null;
    // 右边音源
    let soundRight = null;


    /**
    * 事件绑定
    *
    */
    function eventBind() {
        controlRangeHandle();
    }

    /**
    * 控制条事件
    *
    */
    function controlRangeHandle() {
        document.querySelector('#selectVoice').addEventListener('change', (event) => {
            let value = event.target.value / 50;
            // console.log(volumeLeftEl.value,volumeRightEl.value)
            switch (+value) {
                case 0:
                    soundLeft.controlVolume(volumeLeftEl.value / 50);
                    soundRight.controlVolume(0);
                    break;
                case 2:
                    soundRight.controlVolume(volumeRightEl.value / 50);
                    soundLeft.controlVolume(0);
                    break;
                default:
                    soundLeft.controlVolume(volumeLeftEl.value / 50);
                    soundRight.controlVolume(volumeRightEl.value / 50);
                    break;
            }
        });
    }

    /**
    * 初始化
    *
    * @param: {Object} sourceLeft 左边音源
    * @param: {Object} sourceRight 右边音源
    */
    function init({ sourceLeft, sourceRight }) {
        soundLeft = sourceLeft;
        soundRight = sourceRight;
        eventBind();
    }

    return {
        init
    }

})();

export default createController;