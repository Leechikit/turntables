/**
 * @name: createBufferList
 * @description: 创建音频buffer对象列表
 * @author: lizijie
 * @update: 
 */
// import Promise from 'core-js/es6/promise';
import decodeAudioData from './decodeAudioData.js';
import audioContext from './audioContext.js';
import soundList from './soundList.js';

// 创建promise
let promise = () => {
	return Promise.resolve();
}
let count = Object.keys(soundList).length;
let bufferList = {};

/**
 * 创建buffer列表
 *
 */
function createBufferList() {
	let promiseArrs = [];
	// 遍历存储音频文件地址
	for (let key in soundList) {
		let bufferPromise = promise().then(() => {
			return decodeAudioData(audioContext, soundList[key].link)
		}).then((buffer) => {
			bufferList[key] = buffer;
			return promise();
		});
		promiseArrs.push(bufferPromise);
	}
	Promise.all(promiseArrs).then((values) => {
		downloadCallback();
	});
}

/**
 * 音频下载完成回调
 *
 */
function downloadCallback() {
	document.body.className = '';
}

createBufferList();

export default bufferList;