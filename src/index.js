import './html/index.html';
import './sass/index.scss';
import Source from './js/createSource.js';

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

setTimeout(() => {
	//drunk.start(15);
}, 1000);

// setTimeout(() => {
// 	drunk.controlVolume(10);
// }, 3000);

// setTimeout(() => {
// 	drunk.controlFrequency(1000)
// }, 5000)

// setTimeout(() => {
// 	hihat.start();
// 	hihat.controlVolume(5);
// }, 6000);

// setTimeout(()=>{
// 	hihat.stop();
// 	kick.start();
// 	kick.controlVolume(5);
// 	drunk.controlFrequency(5000);
// },7000)