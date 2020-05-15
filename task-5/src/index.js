/* eslint-disable no-restricted-syntax */
const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const outputDir = path.join(process.cwd(), outputDirName);
const inputDir = path.join(process.cwd(), inputDirName);
// const outputFile // absolute path to output file

async function getInputFileList() {
  const files = await fsp.readdir(inputDir);
  return files.map((file) => path.join(inputDir, file));
}

async function getObjectFromFile(filePath) {
  const compressedBuffer = await fsp.readFile(filePath);
  const jsonBuffer = await gunzip(compressedBuffer);
  const json = jsonBuffer.toString();
  const object = JSON.parse(json);
  return object;
  // read file to buffer
  // decompress buffer with gunzip
  // convert buffer to JSON string
  // parse JSON string to object
}

function rebuildUrl(originalUrl) {
  const url = new URL(originalUrl);
  const parsedUrl = path.parse(originalUrl);
  url.protocol = 'https';
  url.pathname = '/devices';
  url.searchParams.set('file', parsedUrl.name);
  url.searchParams.set('type', parsedUrl.ext);
  return url.toString();
  // Change protocol, path, search string of URL
  // use URL class
  // Example:
  // from URL: http://example.com/files/devices/keyboards.xls
  // to URL: https://example.com/devices?file=keyboards&type=.xls
}

async function buildOutputObject(files) {
  const result = {};
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const object = await getObjectFromFile(file);
    object.url = rebuildUrl(object.url);
    const name = path.basename(file.toLowerCase(), '.json.gz');
    result[name] = object;
  }
  return result;
  // for each file:
  // get content with getObjectFromFile() function
  // update "url" field with rebuildUrl() function
  // get category name from file name
  // assign category to result object (list of devices)
}

async function saveOutput(object) {
  const jsonStringifyed = JSON.stringify(object);
  const gzipBuffer = await gzip(jsonStringifyed);
  const resultOutput = path.join(outputDir, outputFileName);
  await fsp.writeFile(resultOutput, gzipBuffer);
  // stringify object to JSON string
  // create buffer from string
  // compress buffer with gzip
  // write compressed buffer to file 'output/result.json.gz' (use constants)
}

async function start() {
  let inputFiles;
  let outputObject;
  try {
    inputFiles = await getInputFileList();
  } catch (e) {
    console.error(e.message);
    throw new Error('Failed to get input files list');
  }
  try {
    outputObject = await buildOutputObject(inputFiles);
  } catch (e) {
    console.error(e.message);
    throw new Error('Failed to build output object');
  }
  try {
    await saveOutput(outputObject);
  } catch (e) {
    console.error(e.message);
    throw new Error('Failed when saving files in output folder');
  }
}

start().catch((err) => console.error('🐞  🤪  🐛\n', err));
