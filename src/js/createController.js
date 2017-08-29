/**
* @name: createController
* @description: 
* @author: lizijie
* @update: 
*/

let createController = (() => {

    // 左边音频音量空间
    let volumeLeftEl = document.querySelector('#volume-1');
    // 右边音频音量空间
    let volumeRightEl = document.querySelector('#volume-2');
    // 控制器
    let controllerEl = document.querySelector('#selectVoice');
    // 左边音源
    let soundLeft = null;
    // 右边音源
    let soundRight = null;
    // 左边搓碟声
    let diskLeft = null;
    // 右边搓碟声
    let diskRight = null;
    const ORIGINVOLUME = 0.1;

    /**
    * 事件绑定
    *
    */
    function eventBind() {
        controlRangeByMouseEvent();
        controlRangeByKeyBoardEvent();
    }

    /**
    * 控制条鼠标事件
    *
    */
    function controlRangeByMouseEvent() {
        controllerEl.addEventListener('change', (event) => {
            let value = event.target.value;
            switch (+value) {
                case 0:
                    leftHandle();
                    break;
                case 2:
                    rightHandle();
                    break;
                default:
                    middleHandle();
                    break;
            }
        });
    }

    /**
    * 键盘控制条事件
    *
    */
    function controlRangeByKeyBoardEvent() {
        document.addEventListener('keydown', (event) => {
            let value = event.which;
            switch (+value) {
                case 65: // A键
                    controllerEl.value = 0;
                    leftHandle();
                    break;
                case 87: // W键
                case 83: // S键
                    controllerEl.value = 1;
                    middleHandle();
                    break;
                case 68: // D键
                    controllerEl.value = 2;
                    rightHandle();
                    break;
            }
        });
    }

    /**
    * 左操作
    *
    */
    function leftHandle() {
        soundLeft.controlVolume(volumeLeftEl.value);
        diskLeft.controlVolume(ORIGINVOLUME);
        soundRight.controlVolume(0);
        diskRight.controlVolume(0);
    }

    /**
    * 中间操作
    *
    */
    function middleHandle() {
        soundLeft.controlVolume(volumeLeftEl.value);
        diskLeft.controlVolume(ORIGINVOLUME);
        soundRight.controlVolume(volumeRightEl.value);
        diskRight.controlVolume(ORIGINVOLUME);
    }

    /**
    * 右操作
    *
    */
    function rightHandle() {
        soundLeft.controlVolume(0);
        diskLeft.controlVolume(0);
        soundRight.controlVolume(volumeRightEl.value);
        diskRight.controlVolume(ORIGINVOLUME);
    }

    /**
    * 初始化
    *
    * @param: {Object} sourceLeft 左边音源
    * @param: {Object} sourceRight 右边音源
    * @param: {Object} oscillatorLeft 左搓碟音源
    * @param: {Object} oscillatorRight 右搓碟音源
    */
    function init({ sourceLeft, sourceRight, oscillatorLeft, oscillatorRight }) {
        soundLeft = sourceLeft;
        soundRight = sourceRight;
        diskLeft = oscillatorLeft;
        diskRight = oscillatorRight;
        eventBind();
    }

    /**
    * 充值音源
    *
    * @param: {Object} source 音源
    * @param: {String} direction 方向
    */
    function reset({ source, direction }) {
        if(direction == 'left'){
            soundLeft = source;
        }else if(direction == 'right'){
            soundRight = source;
        }
    }

    return {
        init,
        reset
    }

})();

export default createController;