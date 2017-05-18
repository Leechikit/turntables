import './html/index.html';
import './sass/index.scss';
import audioContext from './js/audioContext.js';
import Source from './js/createSource.js';
import Oscillator from './js/createOscillator.js';

// 创建promise
let promise = () => {
	return Promise.resolve();
}

// 延迟
let sleep = (delay) => {
	return new Promise((resolve) => {
		setTimeout(function() {
			resolve();
		}, +delay);
	})
}

let drunk = new Source({
	soundName: 'drunk',
	loop: true
});

let kick = new Source({
	soundName: 'kick',
	loop: true
});

let hihat = new Source({
	soundName: 'hihat',
	loop: true
});

let oscillator = new Oscillator({
	type: 'square',
	frequency: 3000
});

let sounds = promise();

let isStart = false;
let interv = null;

document.querySelector('#play').addEventListener('click', function(event) {
	if (isStart) {
		drunk.stop();
		event.target.value = '播放';
		clearInterval(interv);
	} else {
		drunk.start(0);
		event.target.value = '暂停';
		let duration = drunk.bufferSource.buffer.duration;

		let progress = document.querySelector('#progress');
		interv = setInterval(function() {
			console.log(audioContext.currentTime,duration,+Math.floor(audioContext.currentTime / duration).toFixed(0) + 1);
			let round = +Math.floor(audioContext.currentTime / duration).toFixed(0) + 1;
			progress.value = audioContext.currentTime / (round * duration) * 100;
		}, 1000);
	}
	isStart = !isStart;
});

document.querySelector('#volumn').addEventListener('change', function(event) {
	let value = this.value / 50;
	drunk.controlVolume(value);
});

document.querySelector('#frequency').addEventListener('change', function(event) {
	let value = this.value;
	drunk.controlFrequency(value);
});


// sounds.then(() => {
// 	return sleep(3000);
// }).then(() => {
// 	drunk.start();
// }).then(() => {
// 	return sleep(3000);
// }).then(() => {
// 	drunk.stop();
// 	oscillator.start();
// }).then(() => {
// 	return sleep(100);
// }).then(() => {
// 	oscillator.controlFrequency(800);
// }).then(() => {
// 	return sleep(100);
// }).then(() => {
// 	oscillator.controlFrequency(3000);
// }).then(() => {
// 	return sleep(100);
// }).then(() => {
// 	oscillator.controlFrequency(700);
// }).then(() => {
// 	return sleep(100);
// }).then(() => {
// 	oscillator.stop();
// 	drunk.start(10);
// })