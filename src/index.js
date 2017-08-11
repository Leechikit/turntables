import './html/index.html';
import './sass/index.scss';
import audioContext from './js/audioContext.js';
import Source from './js/createSource.js';
import Oscillator from './js/createOscillator.js';
import Disk from './js/createDisk.js';
import songList from './js/createSongList.js';


let disk1 = new Disk({
	selector: '#song-wrap-1',
	soundName: 'Heavy',
	loop: false
});

let disk2 = new Disk({
	selector: '#song-wrap-2',
	soundName: 'Good Goodbye',
	loop: false
});

songList({
	selector: '#JsongList'
});