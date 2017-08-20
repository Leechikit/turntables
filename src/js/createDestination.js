/**
 * @name: createDestination
 * @description: 创建目标对象
 * @author: lizijie
 * @update: 
 */

import audioContext from './audioContext.js';

let compressor = audioContext.createDynamicsCompressor();

compressor.connect(audioContext.destination);

export default compressor;