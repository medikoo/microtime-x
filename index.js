'use strict';

var name, now, round, base, dateNow;

if ((typeof performance !== 'undefined') && performance) {
	if (typeof performance.now === 'function') name = 'now';
	else if (typeof performance.mozNow === 'function') name = 'mozNow';
	else if (typeof performance.msNow === 'function') name = 'msNow';
	else if (typeof performance.oNow === 'function') name = 'oNow';
	else if (typeof performance.webkitNow === 'function') name = 'webkitNow';

	if (name) {
		round = Math.round;
		if (performance.timing &&
				(typeof performance.timing.navigationStart === 'number')) {
			base = performance.timing.navigationStart;
		} else {
			base = Date.now();
		}
		now = function () {
			return round((base + performance[name]()) * 1000);
		};
	}
}

if (!now && (typeof process !== 'undefined') && process) {
	try { now = (require)('microtime').now; } catch (e) {} //jslint: skip
}

if (!now) {
	dateNow = Date.now;
	now = function () { return dateNow() * 1000; };
}

module.exports = now;
