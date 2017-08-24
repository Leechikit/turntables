/**
 * @name: createOscillator
 * @description: 创作音调
 * @author: lizijie
 * @update: 
 */

import audioContext from './audioContext.js';

function Oscillator(obj) {
	this.config = obj;
	this.volume = 0.1;
}

/**
 * 开始播放
 *
 * @param: {Number} second 播放位置
 */
Oscillator.prototype.start = function(second = 0) {
	if (!this.oscillator) {
		this.oscillator = audioContext.createOscillator();
		this.gainNode = audioContext.createGain();
		this.oscillator.type = this.config.type;
		this.oscillator.frequency.value = this.config.frequency;
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(audioContext.destination);
		this.gainNode.gain.value = this.volume;
		this.oscillator.onended = () => {
			this.oscillator = null;
		}

		this.oscillator.start(0, second);
	}
}

/**
 * 停止播放
 *
 */
Oscillator.prototype.stop = function() {
	this.oscillator && this.oscillator.stop();
}

/**
 * 改变频率
 *
 * @param: {Number} value 频率
 */
Oscillator.prototype.controlFrequency = function(value) {
	this.oscillator && (this.oscillator.frequency.value = value);
}

/**
 * 控制音量
 *
 * @param: {Number} value 音量
 */
Oscillator.prototype.controlVolume = function(value) {
	if (value != void 0) {
		this.volume = value;
		this.oscillator && (this.gainNode.gain.value = this.volume);
	}
}

export default Oscillator;