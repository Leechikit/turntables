/**
 * @name: createDisk
 * @description: 创建磁碟
 * @author: lizijie
 * @update: 
 */
import audioContext from './audioContext.js';
import Source from './createSource.js';
import Oscillator from './createOscillator.js';

let diskCount = 0;

function Disk(obj) {
	this.selector = obj.selector;
	this.isStart = false;
	this.isMousedown = false;
	this.isRotating = false;
	this.sound = new Source({
		soundName: obj.soundName,
		loop: obj.loop || true
	});
	this.oscillator = new Oscillator({
		type: 'square',
		frequency: 1000
	})
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
	disk.style['transition'] = `transform 16.7ms linear`;
	container.append(disk);
	let offset = disk.getBoundingClientRect();
	this.originX = offset.left + disk.offsetWidth / 2;
	this.originY = offset.top + disk.offsetHeight / 2;
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
	this.mousemoveDisk();
	this.mousedownDisk();
	this.mouseupDisk();
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

			this.duration = this.sound.bufferSource.buffer.duration;
			window.requestAnimationFrame(() => {
				this.startProgress();
			});
		}
		this.isStart = !this.isStart;
		this.isRotating = !this.isRotating;
	});
}

/**
 * 音频播放进度
 *
 */
Disk.prototype.startProgress = function(duration) {
	if (this.isStart && this.isRotating) {
		let degree = 16.7 / 1000 / this.duration * 360;
		this.rotate(degree);
		window.requestAnimationFrame(() => {
			this.startProgress();
		});
	}
}

/**
 * 重置播放进度
 *
 */
Disk.prototype.resetProgress = function() {
	this.diskEl.style['transform'] = '';
}

/**
 * 磁碟旋转增加指定度数
 *
 */
Disk.prototype.rotate = function(degree) {
	let nowDegree = utils.getRotateDegree(this.diskEl);
	degree += +nowDegree;
	this.rotateTo(degree);
}

/**
 * 磁碟旋转到指定度数
 *
 */
Disk.prototype.rotateTo = function(degree) {
	degree = degree.toFixed(2);
	this.diskEl.style['transform'] = `rotate(${degree}deg)`;
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
Disk.prototype.resetVolumn = function() {
	document.querySelector('#volumn-' + diskCount).value = 50;
}

/**
 * 控制频率事件
 *
 */
Disk.prototype.controlFrequency = function() {
	document.querySelector('#frequency-' + diskCount).addEventListener('change', (event) => {
		let value = event.target.value;
		this.sound.controlFrequency(value);
	});
}

/**
 * 重置频率
 *
 */
Disk.prototype.resetFrequency = function() {
	document.querySelector('#frequency-' + diskCount).value = 5000;
}

/**
 * 滑动磁碟
 *
 */
Disk.prototype.mousemoveDisk = function() {
	this.diskEl.addEventListener('mousemove', (event) => {
		if (this.isStart && this.isMousedown) {
			let pageX = event.pageX;
			let pageY = event.pageY;
			let x = Math.abs(this.originX - pageX);
			let y = Math.abs(this.originY - pageY);
			let z = Math.sqrt(x * x + y * y);
			let rotate = Math.round(Math.asin(y / z) / Math.PI * 180);
			// 第一象限
			if (pageX >= this.originX && pageY <= this.originY) {
				rotate = 90 - rotate;
				// 第四象限
			} else if (pageX >= this.originX && pageY >= this.originY) {
				rotate = 90 + rotate;
				// 第三象限
			} else if (pageX <= this.originX && pageY >= this.originY) {
				rotate = 270 - rotate;
				// 第二象限
			} else if (pageX <= this.originX && pageY <= this.originY) {
				rotate = 270 + rotate;
			}
			this.rotateTo(rotate);
		}
	});
}

/**
 * 鼠标点击
 *
 */
Disk.prototype.mousedownDisk = function() {
	this.diskEl.addEventListener('mousedown', (event) => {
		if (this.isStart) {
			this.isMousedown = true;
			this.sound.stop();
			this.oscillator.start();
			this.isRotating = !this.isRotating;
		}
	});
}

/**
 * 鼠标松开
 *
 */
Disk.prototype.mouseupDisk = function() {
	this.diskEl.addEventListener('mouseup', (event) => {
		if (this.isStart) {
			this.isMousedown = false;
			let degree = utils.getRotateDegree(this.diskEl);
			this.isRotating = !this.isRotating;
			this.sound.start(degree / 360 * this.duration);
			this.oscillator.stop();
			window.requestAnimationFrame(() => {
				this.startProgress();
			});
		}
	});
}

/**
 * 工具
 *
 */
let utils = {
	// 获取旋转度数
	getRotateDegree(elem) {
		const reg = /transform:\s*rotate\((\d+\.?\d*)deg\)/;
		let style = elem.style.cssText;
		return style.match(reg) && style.match(reg)[1] || 0;
	}
}

export default Disk;