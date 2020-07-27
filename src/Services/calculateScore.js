'use strict';

const geolib = require('geolib');

module.exports = (rider, cruiser) => {
	let score = 0;
	let distance = geolib.getDistance(
		rider.current_location,
		cruiser.current_location
	);

	distance /= 1000;

	if(distance <= 3) {
		score += 7;
	} else if(distance <= 5 ) {
		score += 3;
	}

	if(rider.rating >= cruiser.rating) score += 2;

	if(rider.number_of_rides <= 2 && cruiser.number_of_rides >= 3 ) {
		score += 5;
	} else if(rider.number_of_rides > 2 && cruiser.number_of_rides < 3) {
		score += 2;
	}

	return score;
};
