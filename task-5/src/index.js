const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
// const { promisify } = require('util');

// const gunzip = promisify(zlib.gunzip);
// const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
// const outputFile // absolute path to output file

async function getInputFileList() {
  const files = await fsp.readdir(inputDirName);
  return files.map((file) => process.join(inputDir, file));
}

async function getObjectFromFile(filePath) {
  const buffer = await fsp.readFile(filePath);
  // read file to buffer
  // decompress buffer with gunzip
  // convert buffer to JSON string
  // parse JSON string to object
}

function rebuildUrl(originalUrl) {
  // Change protocol, path, search string of URL
  // use URL class
  // Example:
  // from URL: http://example.com/files/devices/keyboards.xls
  // to URL: https://example.com/devices?file=keyboards&type=.xls
}

async function buildOutputObject(files) {
  for (const file in files) {
    const result = await getObjectFromFile(file);
  }
  // for each file:
  // get content with getObjectFromFile() function
  // update "url" field with rebuildUrl() function
  // get category name from file name
  // assign category to result object (list of devices)
}

async function saveOutput(object) {
  // stringify object to JSON string
  // create buffer from string
  // compress buffer with gzip
  // write compressed buffer to file 'output/result.json.gz' (use constants)
}

async function start() {
  const inputFiles = await getInputFileList();
  const outputObject = await buildOutputObject(inputFiles);
  await saveOutput(outputObject);
}

start().catch((err) => console.error('🐞  🤪  🐛\n', err));
