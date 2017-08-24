import './html/index.html';
import './sass/index.scss';
import audioContext from './js/audioContext.js';
import Source from './js/createSource.js';
import Oscillator from './js/createOscillator.js';
import Disk from './js/createDisk.js';
import songList from './js/createSongList.js';
import createController from './js/createController.js';


let diskLeft = new Disk({
	selector: '#song-wrap-1',
	soundName: 'Heavy',
	loop: false
});

let diskRight = new Disk({
	selector: '#song-wrap-2',
	soundName: 'Good Goodbye',
	loop: false
});

songList({
	selector: '#JsongList'
});

createController.init({
	sourceLeft: diskLeft.sound,
	sourceRight: diskRight.sound
})