/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const config = require('../config');
const { endResponse } = require('./helpers');

class DotsGenerator extends Transform {
	// eslint-disable-next-line no-useless-constructor
	constructor() {
		super();
		this.length = 0;
	}

	_transform(chunk, encoding, next) {
		let fileSize = (this.length += chunk.length) / 1024;
		// console.log(fileSize);
		if (fileSize >= 1024) {
			process.stdout.write('.');
			fileSize = 0;
		}
		this.push(chunk);
		setTimeout(() => {
			next();
		}, 100);
	}
}

function sendJPEG(res) {
	const readStream = fs.createReadStream(config.filePath, {
		highWaterMark: config.rate
	});

	readStream.on('error', () => {
		endResponse(res, 500);
	});

	const slowerTransform = new DotsGenerator();

	pipeline(readStream, slowerTransform, res, (err) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`\nStatus: ${res.statusMessage}`);
	});
}

module.exports = {
	sendJPEG
};
