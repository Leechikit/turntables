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
    // 控制器
    let controllerEl = document.querySelector('#selectVoice');
    // 左边音源
    let soundLeft = null;
    // 右边音源
    let soundRight = null;


    /**
    * 事件绑定
    *
    */
    function eventBind() {
        controlRangeByMouseHandle();
        controlRangeByKeyBoardHandle();
    }

    /**
    * 控制条鼠标事件
    *
    */
    function controlRangeByMouseHandle() {
        controllerEl.addEventListener('change', (event) => {
            let value = event.target.value;
            switch (+value) {
                case 0:
                    soundLeft.controlVolume(volumeLeftEl.value);
                    soundRight.controlVolume(0);
                    break;
                case 2:
                    soundRight.controlVolume(volumeRightEl.value);
                    soundLeft.controlVolume(0);
                    break;
                default:
                    soundLeft.controlVolume(volumeLeftEl.value);
                    soundRight.controlVolume(volumeRightEl.value);
                    break;
            }
        });
    }

    /**
    * 键盘控制条事件
    *
    */
    function controlRangeByKeyBoardHandle() {
        document.addEventListener('keydown', (event) => {
            let value = event.which;
            console.log(value);//65 (87,83) 68
            switch (+value) {
                case 65: // A键
                    controllerEl.value = 0;
                    soundLeft.controlVolume(volumeLeftEl.value);
                    soundRight.controlVolume(0);
                    break;
                case 87: // W键
                case 83: // S键
                    controllerEl.value = 1;
                    soundLeft.controlVolume(volumeLeftEl.value);
                    soundRight.controlVolume(volumeRightEl.value);
                    break;
                case 68: // D键
                    controllerEl.value = 2;
                    soundRight.controlVolume(volumeRightEl.value);
                    soundLeft.controlVolume(0);
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