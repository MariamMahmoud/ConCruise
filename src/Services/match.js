'use strict';

const calculateScore = require('./calculateScore');
const usersController = require('../Controllers/users');

const _findAvailable = async type =>
	await usersController.findByQuery({ type, matched: false });

module.exports = async() => {
	const riders = await _findAvailable('rider');
	const matches = [];

	try {
		for await (let rider of riders) {
			let bestScore = 0;
			let matchedCruiser = {};
			let cruisers = await _findAvailable('cruiser');

			for await (let cruiser of cruisers) {
				let currentScore = calculateScore(rider, cruiser);
				if(currentScore >= bestScore) {
					bestScore = currentScore;
					matchedCruiser = cruiser;
				}
			}

			if(matchedCruiser) {
				matches.push({ rider, cruiser: matchedCruiser, score: bestScore });
				rider.matched = true;
				matchedCruiser.matched = true;
				await usersController.update(rider);
				await usersController.update(matchedCruiser);
			}

		}

		return matches;

	} catch(error) {
		// TODO: log error
		const err = {
			name: 'Matching Service crashed',
			details: error.stack,
			message: error.message,
		};

		throw err;
	}
};
