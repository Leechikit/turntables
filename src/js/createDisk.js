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
	this.interv = null;
	this.time = 0;
	this.duration = 0;
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
			// progress.value = 0;
			// clearInterval(interv);
		} else {
			this.sound.start();
			event.target.value = '停止';
			this.duration = this.sound.bufferSource.buffer.duration;
			// let progress = document.querySelector('#progress');
			// interv = setInterval(function() {
			// 	time++;
			// 	let round = +Math.floor(time / duration).toFixed(0);
			// 	progress.value = (time - round * duration) / duration * 100;
			// }, 1000);
		}
		this.isStart = !this.isStart;
	});
}

Disk.prototype.progress = function() {

}

export default Disk;