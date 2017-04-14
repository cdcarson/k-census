'use strict';
var _ = require('lodash');

// atoll is a statistics package I picked basically at random...
var atoll = require('atoll');


module.exports.atollPopulationVariance = function (data) {
	var c = atoll(data);
	return c.variancePop();
};



/**
 * adapted from the python def two_pass_variance(data)
 * at https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
 * This gives the same result as atollPopulationVariance(data)
 * @param  {[]} data an array of int
 * @return float
 */
var twoPassVariance = module.exports.twoPassVariance = function (data) {
	var n = data.length;
	var sum1;
	var sum2;
	var mean;
	if (n < 2){
		return 0;
	}

	sum1 = 0 + _.sum(data);
	mean = sum1 / n;
	sum2 = _.sumBy(data, function (value) {
		return Math.pow(value - mean, 2);
	});

	// return sum2 / (n - 1);
	// I think the dividing by n is right, rather than (n-1), because we're working from a full dataset...
	return sum2 / n;

};

module.exports.chrisNaiveBucketVariance = function (data, bucketWidth) {
	var min = _.min(data);
	var shifted;
	var bucketed;
	bucketWidth = bucketWidth || 1;
	shifted = _.map(data, function (value) {
		return value - min;
	});
	bucketed = _.map(shifted, function (value) {
		return Math.round(value/bucketWidth);
	});
	return twoPassVariance(bucketed);

};
