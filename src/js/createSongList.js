/**
 * @name: createSongList
 * @description: 创建音频列表
 * @author: lizijie
 * @update: 
 */

import soundList from './soundList.js';
// 音频列表元素
let songListEl = document.querySelector('#JsongList');
let img = null;

/**
 * 创建音频列表
 *
 */
function createSongList(obj) {
	let selector = obj.selector;
	let container = document.querySelector(selector);
	let ulEl = document.createElement('ul');
	for (let key in soundList) {
		let liEl = document.createElement('li');
		liEl.innerHTML = key;
		liEl.setAttribute('data-song', key);
		liEl.setAttribute('draggable', true);
		ulEl.appendChild(liEl);
	}
	container.appendChild(ulEl);
	preload();
	eventBind();
}

/**
 * 绑定事件
 *
 */
function eventBind() {
	dragstartHandle();
	dragendHandle();
}

/**
 * dragstart
 *
 */
function dragstartHandle() {
	songListEl.addEventListener('dragstart', (event) => {
		/*setDragImage start*/
		event.dataTransfer.setDragImage(img, 100, 100);
		/*setDragImage end*/

		let dataList = event.dataTransfer.items;
		dataList.add(event.target.getAttribute('data-song'), "text/plain");
		console.log("dragstart");
	})
}

/**
 * dragend
 *
 */
function dragendHandle() {
	songListEl.addEventListener("dragend", (event) => {
		let dataList = event.dataTransfer.items;
		dataList.clear();
		console.log("dragend");
	});
}

/**
 * preload
 *
 */
function preload() {
	img = document.createElement('img');
	img.src = "https://leechikit.github.io/resources/article/turntables/image/dragdefault.png";
}

export default createSongList;