/**
 * @name: createDisk
 * @description: 创建磁碟
 * @author: lizijie
 * @update: 
 */
import audioContext from './audioContext.js';
import Source from './createSource.js';
import Oscillator from './createOscillator.js';
import soundList from './soundList.js';

// 音量最小
const VOLUMNMIN = 0;
// 音量最大
const VOLUMNMAX = 2;
// 频率最小
const FREQUENCYMIN = 0;
// 频率最大
const FREQUENCYMAX = 10000;

let diskCount = 0;

function Disk(obj) {
	this.selector = obj.selector;
	this.isStart = false;
	this.isMousedown = false;
	this.isRotating = false;
	this.mouseDownDegree = 0;
	this.mouseDownRotate = 0;
	this.volumn = 1;
	this.frequency = 5000;
	this.rate = 1;
	this.loop = obj.loop;
	this.soundName = obj.soundName;
	this.sound = new Source({
		soundName: obj.soundName,
		loop: obj.loop || true
	});
	this.oscillator = new Oscillator({
		type: 'square',
		frequency: 700
	})
	this.index = ++diskCount;
	this.init();
	this.bindEvent();
}

/**
 * 初始化
 *
 */
Disk.prototype.init = function () {
	// let containerEl = document.querySelector(this.selector);
	// containerEl.style.position = 'relative';
	// // 创建磁碟
	// let diskEl = document.createElement('div');
	// diskEl.className = 'song-disk disk-' + this.index;
	// containerEl.append(diskEl);
	this.diskEl = document.querySelector('.song-disk.disk-' + this.index);
	let offset = this.diskEl.getBoundingClientRect();
	this.originX = offset.left + offset.width / 2;
	this.originY = offset.top + offset.height / 2;

	// // 创建针
	// let needleEl = document.createElement('div');
	// needleEl.className = 'song-needle needle-' + this.index;
	// containerEl.append(needleEl);
	// // 创建封面
	// let coverEl = document.createElement('div');
	// coverEl.className = 'song-cover cover-' + this.index;
	// let coverImg = document.createElement('img');
	// coverImg.src = soundList[this.soundName].cover;
	// coverEl.append(coverImg);
	// diskEl.append(coverEl);
	// // 创建控制条列表
	// let controlListEl = document.createElement('div');
	// controlListEl.className = 'control-list';
	// containerEl.append(controlListEl);
	// // 创建音量控制条
	// let volumnEl = document.createElement('p');
	// volumnEl.className = 'control';
	// volumnEl.innerHTML = `<input type="range" min="${VOLUMNMIN}" max="${VOLUMNMAX}" id="volumn-${this.index}"><span class="mark">音<br/>量</span>`;
	// controlListEl.append(volumnEl);
	// // 创建音频控制条
	// let frequencyEl = document.createElement('p');
	// frequencyEl.className = 'control';
	// frequencyEl.innerHTML = `<input type="range" min="${FREQUENCYMIN}" max="${FREQUENCYMAX}" id="frequency-${this.index}"><span class="mark">频<br/>率</span>`;
	// controlListEl.append(frequencyEl);
}

/**
 * 绑定事件
 *
 */
Disk.prototype.bindEvent = function () {
	this.controlVolumnHandle();
	this.controlFrequencyHandle();
	this.controlRateHandle();
	this.mousemoveDiskHandle();
	this.mousedownDiskHandle();
	this.mouseupDiskHandle();
	this.mouseleaveDiskHandle();
	this.clickNeedleHandle();
	this.dragoverDiskHandle();
	this.dropDiskHandle();
}

/**
 * 播放音乐
 *
 */
Disk.prototype.startSound = function () {
	let needleEl = document.querySelector('.song-needle.needle-' + this.index);
	needleEl.setAttribute('data-status', 'on');
	setTimeout(() => {
		this.sound.start();
		this.duration = this.sound.bufferSource.buffer.duration;
		this.duration > 1 && window.requestAnimationFrame(() => {
			this.startProgress();
		});
		this.isStart = true;
		this.isRotating = true;
	}, 500);
}

/**
 * 停止音乐
 *
 */
Disk.prototype.stopSound = function () {
	let needleEl = document.querySelector('.song-needle.needle-' + this.index);
	needleEl.setAttribute('data-status', '');
	this.sound.stop();
	this.resetProgress();
	this.resetVolumn();
	this.resetFrequency();
	this.resetRate();
	this.isStart = false;
	this.isRotating = false;
}

/**
 * 音频播放进度
 *
 */
Disk.prototype.startProgress = function (duration) {
	if (this.isStart && this.isRotating && this.duration > 1) {
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
Disk.prototype.resetProgress = function () {
	this.diskEl.style['transform'] = 'rotate(0)';
	this.diskEl.style['transition'] = 'transform .5s ease-in-out';
}

/**
 * 磁碟旋转增加指定度数
 *
 */
Disk.prototype.rotate = function (degree) {
	let nowDegree = utils.getRotateDegree(this.diskEl);
	degree += +nowDegree;
	this.rotateTo(degree);
}

/**
 * 磁碟旋转到指定度数
 *
 */
Disk.prototype.rotateTo = function (degree) {
	degree = degree.toFixed(2);
	this.diskEl.style['transform'] = `rotate(${degree}deg)`;
	this.diskEl.style['transition'] = 'none';
}

/**
 * 控制音量事件
 *
 */
Disk.prototype.controlVolumnHandle = function () {
	document.querySelector('#volumn-' + this.index).addEventListener('change', (event) => {
		this.volumn = event.target.value;
		this.sound.controlVolume(this.volumn);
	});
}

/**
 * 重置音量
 *
 */
Disk.prototype.resetVolumn = function () {
	document.querySelector('#volumn-' + this.index).value = (VOLUMNMAX - VOLUMNMIN) / 2;
}

/**
 * 控制频率事件
 *
 */
Disk.prototype.controlFrequencyHandle = function () {
	document.querySelector('#frequency-' + this.index).addEventListener('change', (event) => {
		this.frequency = event.target.value;
		this.sound.controlFrequency(this.frequency);
	});
}

/**
 * 重置频率
 *
 */
Disk.prototype.resetFrequency = function () {
	document.querySelector('#frequency-' + this.index).value = 5000;
}

/**
 * 控制加速事件
 *
 */
Disk.prototype.controlRateHandle = function () {
	document.querySelector('#rate-' + this.index).addEventListener('change', (event) => {
		this.rate = event.target.value;
		this.sound.controlRate(this.rate);
	});
}

/**
 * 重置加速
 *
 */
Disk.prototype.resetRate = function () {
	document.querySelector('#rate-' + this.index).value = 1;
}

/**
 * 设置封面
 *
 */
Disk.prototype.setCover = function (soundName) {
	let cover = soundList[soundName].cover;
	if (soundName !== this.soundName && cover) {
		this.soundName = soundName;
		document.querySelector('.song-cover.cover-' + this.index + '>img').src = cover;
	}
}

/**
 * 滑动磁碟
 *
 */
Disk.prototype.mousemoveDiskHandle = function () {
	this.diskEl.addEventListener('mousemove', (event) => {
		if (this.isStart && this.isMousedown) {
			let pageX = event.pageX;
			let pageY = event.pageY;
			let degree = utils.countDegree(pageX, pageY, this.originX, this.originY);
			let diffDegree = degree - this.mouseDownDegree < 0 ? (degree - this.mouseDownDegree + 360) : (degree - this.mouseDownDegree);
			this.rotateTo(degree - this.mouseDownDegree + this.mouseDownRotate);
			this.oscillator.controlFrequency(Math.abs(degree - this.mouseDownDegree) * 50);
		}
	});
}

/**
 * 鼠标点击磁碟
 *
 */
Disk.prototype.mousedownDiskHandle = function () {
	this.diskEl.addEventListener('mousedown', (event) => {
		if (this.isStart && this.duration > 1) {
			let pageX = event.pageX;
			let pageY = event.pageY;
			this.mouseDownDegree = utils.countDegree(pageX, pageY, this.originX, this.originY);
			this.mouseDownRotate = utils.getRotateDegree(this.diskEl);
			this.sound.stop();
			this.oscillator.start();
			this.isMousedown = true;
			this.isRotating = !this.isRotating;
		}
	});
}

/**
 * 鼠标松开磁碟
 *
 */
Disk.prototype.mouseupDiskHandle = function () {
	this.diskEl.addEventListener('mouseup', (event) => {
		if (this.isStart && this.isMousedown) {
			this.isMousedown = false;
			let degree = utils.getRotateDegree(this.diskEl);
			this.isRotating = !this.isRotating;
			this.sound.start(degree / 360 * this.duration);
			this.sound.controlVolume(this.volumn);
			this.sound.controlFrequency(this.frequency);
			this.oscillator.stop();
			window.requestAnimationFrame(() => {
				this.startProgress();
			});
		}
	});
}

/**
 * 鼠标离开磁碟
 *
 */
Disk.prototype.mouseleaveDiskHandle = function () {
	this.diskEl.addEventListener('mouseleave', (event) => {
		if (this.isStart && this.isMousedown) {
			this.isMousedown = false;
			let degree = utils.getRotateDegree(this.diskEl);
			this.isRotating = !this.isRotating;
			this.sound.start(degree / 360 * this.duration);
			this.sound.controlVolume(this.volumn);
			this.sound.controlFrequency(this.frequency);
			this.oscillator.stop();
			window.requestAnimationFrame(() => {
				this.startProgress();
			});
		}
	});
}

/**
 * 鼠标点击针
 *
 */
Disk.prototype.clickNeedleHandle = function () {
	let needleEl = document.querySelector('.song-needle.needle-' + this.index);
	needleEl.addEventListener('click', (event) => {
		this.isStart ? this.stopSound() : this.startSound();
	});
}

/**
 * dragover
 *
 */
Disk.prototype.dragoverDiskHandle = function () {
	this.diskEl.addEventListener("dragover", (event) => {
		event.preventDefault();
	});
}

/**
 * drop
 *
 */
Disk.prototype.dropDiskHandle = function () {
	this.diskEl.addEventListener("drop", (event) => {
		let dataList = event.dataTransfer.items;
		for (let i = 0, len = dataList.length; i < len; i++) {
			if (dataList[i].kind == "string" && dataList[i].type.match("^text/plain")) {
				dataList[i].getAsString((name) => {
					this.stopSound();
					this.sound = new Source({
						soundName: name,
						loop: this.loop || true
					});
					this.setCover(name);
				});
			}
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
		return style.match(reg) && +style.match(reg)[1] || 0;
	},
	// 已知两点计算度数 x2,y2是原点
	countDegree(x1, y1, x2, y2) {
		let x = Math.abs(x1 - x2);
		let y = Math.abs(y1 - y2);
		let z = Math.sqrt(x * x + y * y);
		let degree = Math.round(Math.asin(y / z) / Math.PI * 180);
		// 第一象限
		if (x1 >= x2 && y1 < y2) {
			degree = 90 - degree;
			// 第四象限
		} else if (x1 >= x2 && y1 >= y2) {
			degree = 90 + degree;
		} else if (x1 < x2 && y1 >= y2) {
			degree = 270 - degree;
		} else if (x1 < x2 && y1 < y2) {
			degree = 270 + degree;
		}
		return degree;
	}
}

export default Disk;