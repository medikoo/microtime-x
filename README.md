# microtime-x - Get current time in microseconds (cross-environment solution)

Returns the number of microseconds elapsed since 1 January 1970 00:00:00 UTC

In browser relies ob`performance.now` or it's engine specific variants if available, in Node.js [microtime](https://npmjs.org/package/microtime) by Wade Simmons is used if supported. If none of the above is found then `Date.now` result multiplied by 1000 is returned

## Installation
### NPM

In your project path:

	$ npm install microtime-x

### Browser

You can easily bundle npm packages for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://secure.travis-ci.org/medikoo/microtime-x.png?branch=master)](https://secure.travis-ci.org/medikoo/microtime-x)

	$ npm test
