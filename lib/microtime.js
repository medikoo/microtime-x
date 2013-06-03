'use strict';

var name, now, round, dateNow;

if ((typeof performance !== 'undefined') && performance) {
	if (typeof performance.now === 'function') {
		name = 'now';
	} else if (typeof performance.mozNow === 'function') {
		name = 'mozNow';
	} else if (typeof performance.msNow === 'function') {
		name = 'msNow';
	} else if (typeof performance.oNow === 'function') {
		name = 'oNow';
	} else if (typeof performance.webkitNow === 'function') {
		name = 'webkitNow';
	}

	if (name) {
		round = Math.round;
		dateNow = Date.now;
		now = function () {
			return round((dateNow() + performance[name]() % 1) * 1000);
		};
	}
}

if (!now && (typeof process !== 'undefined') && process) {
	try { now = (require)('microtime').now; } catch (e) {}
}

if (!now) {
	dateNow = Date.now;
	now = function () { return dateNow() * 1000; };
}

module.exports = now;
