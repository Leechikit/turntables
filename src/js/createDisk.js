/**
 * @name: createDisk
 * @description: 创建磁碟
 * @author: lizijie
 * @update: 
 */
import audioContext from './audioContext.js';
import Source from './createSource.js';
import Oscillator from './createOscillator.js';

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
	this.loop = obj.loop;
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
	disk.className = 'song-disk disk-' + diskCount;
	disk.style['transition'] = `transform 16.7ms linear`;
	container.append(disk);
	let offset = disk.getBoundingClientRect();
	this.originX = offset.left + disk.offsetWidth / 2;
	this.originY = offset.top + disk.offsetHeight / 2;
	this.diskEl = document.querySelector('.song-disk.disk-' + diskCount);
	// 创建针
	let needle = document.createElement('div');
	needle.className = 'song-needle';
	container.append(needle);
	// 创建封面
	let cover = document.createElement('div');
	cover.className = 'song-cover';
	let coverImg = document.createElement('img');
	coverImg.src = "http://p1.music.126.net/5KE-Os38if8v9_d_qSf90w==/19183179369981589.webp?imageView&thumbnail=720x0&quality=75&tostatic=0&type=webp";
	cover.append(coverImg);
	disk.append(cover);
	// 创建播放停止按钮
	let play = document.createElement('p');
	play.innerHTML = `<input type="button" value="播放" id="play-${diskCount}">`;
	container.append(play);
	// 创建音量控制条
	let volumn = document.createElement('p');
	volumn.innerHTML = `音量：<input type="range" min="${VOLUMNMIN}" max="${VOLUMNMAX}" id="volumn-${diskCount}">`;
	container.append(volumn);
	// 创建音频控制条
	let frequency = document.createElement('p');
	frequency.innerHTML = `音频：<input type="range" min="${FREQUENCYMIN}" max="${FREQUENCYMAX}" id="frequency-${diskCount}">`;
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
	this.mouseleaveDisk();
	this.dragoverEvent();
	this.dropEvent();
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
		this.volumn = event.target.value / 50;
		this.sound.controlVolume(this.volumn);
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
		this.frequency = event.target.value;
		this.sound.controlFrequency(this.frequency);
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
			let degree = utils.countDegree(pageX, pageY, this.originX, this.originY);
			this.rotateTo(degree - this.mouseDownDegree + this.mouseDownRotate);
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
 * 鼠标松开
 *
 */
Disk.prototype.mouseupDisk = function() {
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
 * 鼠标离开
 *
 */
Disk.prototype.mouseleaveDisk = function() {
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
 * dragover
 *
 */
Disk.prototype.dragoverEvent = function() {
	this.diskEl.addEventListener("dragover", (event) => {
		event.preventDefault();
	});
}

/**
 * drop
 *
 */
Disk.prototype.dropEvent = function() {
	this.diskEl.addEventListener("drop", (event) => {
		let dataList = event.dataTransfer.items;
		for (let i = 0, len = dataList.length; i < len; i++) {
			if (dataList[i].kind == "string" && dataList[i].type.match("^text/plain")) {
				dataList[i].getAsString((name) => {
					this.sound.stop();
					this.sound = new Source({
						soundName: name,
						loop: this.loop || true
					});
					this.sound.start();
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
	// 已知两点计算度数
	countDegree(x1, y1, x2, y2) {
		let x = Math.abs(x1 - x2);
		let y = Math.abs(y1 - y2);
		let z = Math.sqrt(x * x + y * y);
		let degree = Math.round(Math.asin(y / z) / Math.PI * 180);
		// 第一象限
		if (x2 >= x1 && y2 <= y1) {
			degree = 90 - degree;
			// 第四象限
		} else if (x2 >= x1 && y2 >= y1) {
			degree = 90 + degree;
			// 第三象限
		} else if (x2 <= x1 && y2 >= y1) {
			degree = 270 - degree;
			// 第二象限
		} else if (x2 <= x1 && y2 <= y1) {
			degree = 270 + degree;
		}
		return degree;
	}
}

export default Disk;