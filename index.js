'use strict';

var floor = Math.floor, correction = 0;

module.exports = exports = (function () {
	var name, round, base, dateNow, nodeMicrotime, envCorrection;

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
			// We need to periodically calculate correction, as
			// `performance.now()` doesn't react to eventual clock corrections
			// (as made by system).
			// When not corrected, in corner-case scenario function may produce future timestaps
			// which may in result be rejected by other processes (as malicious).
			// Reevaluating that correction doesn't remove that risk completely,
			// still minimizes it's probablity
			envCorrection = -((base + performance[name]()) - Date.now());
			setInterval(function () {
				envCorrection = -((base + performance[name]()) - Date.now());
			}, 1000);
			return function () {
				return round((base + performance[name]() + envCorrection) * 1000) + correction;
			};
		}
	}

	if ((typeof process === 'object') && process) {
		try { nodeMicrotime = (require)('microtime'); } catch (ignore) {} //jslint: ignore
		if (nodeMicrotime) {
			return function () { return nodeMicrotime.now() + correction; };
		}
	}

	dateNow = Date.now;
	return function () { return dateNow() * 1000 + correction; };
}());

exports.correct = function (num) {
	if (!isFinite(num)) throw new TypeError(num + " is not valid correction value");
	correction = floor(Number(num));
};
