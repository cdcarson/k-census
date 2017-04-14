'use strict';
var _ = require('lodash');
var path = require('path');
var helpers = require('./helpers');
var statistics = require('./statistics');
var filePath = path.join(process.cwd(), 'data', 'PEP_2016_PEPANNRES', 'PEP_2016_PEPANNRES_with_ann.csv');

var population = {};

helpers.csvFilePathToJSON(filePath)
	.then(function (result) {
		//filter out the first two rows...
		return result.slice(2);
	})
	.then(function (result) {
		// transform each row array into an object {name, population}, parseInt'ing the population
		return _.map(result, function (row) {
			return {name: row[2], population: parseInt(row[3])};
		});
	})

	.then(function (result) {
		var plain = _.map(result, 'population');
		var minimallyUnfairCase;
		var maximallyUnfairCase;
		var precisions = [1, 1000, 1000 * 1000, 1000 * 1000 * 10, 1000 * 1000 * 10 * 2];
		//population.states = result;

		// sum & average the populations...
		population.total = _.sumBy(result, 'population');
		population.average = population.total/result.length;

		// this is inarguably the the minimally "unfair" case...
		minimallyUnfairCase = _.fill(_.clone(plain), population.average);

		// approximate a maximally "unfair" case...
		maximallyUnfairCase = _.fill(_.clone(plain), 0);
		maximallyUnfairCase[0] = population.total;


		// calculate the variance with the atoll package...
		population.atollVariance = statistics.atollPopulationVariance(plain);
		population.atollVarianceMin = statistics.atollPopulationVariance(minimallyUnfairCase);
		population.atollVarianceMax = statistics.atollPopulationVariance(maximallyUnfairCase);

		// calculate the variance by my twoPass method...
		population.twoPassVariance = statistics.twoPassVariance(plain);
		population.twoPassVarianceMin = statistics.twoPassVariance(minimallyUnfairCase);
		population.twoPassVarianceMax = statistics.twoPassVariance(maximallyUnfairCase);

		population.chrisNaiveBucketVariances = {};
		_.each(precisions, function (precision) {
			var o = {};
			o.bucketWidth = precision;
			o.variance = statistics.chrisNaiveBucketVariance(plain, precision);
			o.varianceMin = statistics.chrisNaiveBucketVariance(minimallyUnfairCase, precision);
			o.varianceMax = statistics.chrisNaiveBucketVariance(maximallyUnfairCase, precision);
			population.chrisNaiveBucketVariances[precision] = o;
		});
		console.log(require('util').inspect(population, { depth: null, colors: true }));
	});
