'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var parse = Promise.promisify(require('csv-parse'));

module.exports.csvFilePathToJSON = function (filePath) {
	return fs.readFileAsync(filePath)
		.then(function (result) {
			return parse(result);
		});

};
