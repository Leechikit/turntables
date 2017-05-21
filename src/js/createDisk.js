/**
 * @name: createDisk
 * @description: 创建磁碟
 * @author: lizijie
 * @update: 
 */
import audioContext from './audioContext.js';
import Source from './createSource.js';

let diskCount = 0;

function Disk(obj) {
	this.selector = obj.selector;
	this.isStrat = false;
	this.sound = new Source({
		soundName: obj.soundName,
		loop: obj.loop || true
	});
	diskCount++;
	this.init();
	this.bindEvent();
}

/**
 * 初始化
 *
 */
Disk.prototype.init = function() {
	let container = document.querySelector(this.selector);
	// 创建磁碟
	let disk = document.createElement('div');
	disk.className = 'disk-' + diskCount;
	container.append(disk);
	this.diskEl = document.querySelector('.' + disk.className);
	// 创建播放停止按钮
	let play = document.createElement('p');
	play.innerHTML = `<input type="button" value="播放" id="play-${diskCount}">`;
	container.append(play);
	// 创建音量控制条
	let volumn = document.createElement('p');
	volumn.innerHTML = `音量：<input type="range" min="0" id="volumn-${diskCount}">`;
	container.append(volumn);
	// 创建音频控制条
	let frequency = document.createElement('p');
	frequency.innerHTML = `音频：<input type="range" min="0" max="10000" id="frequency-${diskCount}">`;
	container.append(frequency);
}

/**
 * 绑定事件
 *
 */
Disk.prototype.bindEvent = function() {
	this.clickPlayHandle();
	this.controlVolumn();
	this.controlFrequency();
}

/**
 * 点击播放停止按钮
 *
 */
Disk.prototype.clickPlayHandle = function() {
	document.querySelector('#play-' + diskCount).addEventListener('click', (event) => {
		if (this.isStart) {
			this.sound.stop();
			event.target.value = '播放';
			this.resetProgress();
			this.resetVolumn();
			this.resetFrequency();

		} else {
			this.sound.start();
			event.target.value = '停止';

			let duration = this.sound.bufferSource.buffer.duration;
			this.startProgress(duration);
		}
		this.isStart = !this.isStart;
	});
}

/**
 * 音频播放进度
 *
 */
Disk.prototype.startProgress = function(duration) {
	this.diskEl.style.cssText = "animation:rotate " + duration + "s linear infinite;";
}

/**
 * 重置播放进度
 *
 */
Disk.prototype.resetProgress = function() {
	this.diskEl.style.cssText = "animation:none;";
}

/**
 * 控制音量事件
 *
 */
Disk.prototype.controlVolumn = function() {
	document.querySelector('#volumn-' + diskCount).addEventListener('change', (event) => {
		let value = event.target.value / 50;
		this.sound.controlVolume(value);
	});
}

/**
 * 重置音量
 *
 */
Disk.prototype.resetVolumn = function(){
	document.querySelector('#volumn-' + diskCount).value = 50;
}

/**
 * 控制频率事件
 *
 */
Disk.prototype.controlFrequency = function() {
	document.querySelector('#frequency-' + diskCount).addEventListener('change', (event)=> {
		let value = event.target.value;
		this.sound.controlFrequency(value);
	});
}

/**
 * 重置频率
 *
 */
Disk.prototype.resetFrequency = function(){
	document.querySelector('#frequency-' + diskCount).value = 5000;
}

export default Disk;