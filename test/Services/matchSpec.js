/* eslint-disable no-undef */
'use strict';

const match = require('../../src/Services/match');
const usersController = require('../../src/Controllers/users');
const { expect, connectDB } = require('../Helpers/helper');

describe('Services/match', () => {
	const rider ={
		full_name: 'Mariam Mahmoud Saad',
		type: 'rider',
		rating: 4,
		number_of_rides: 1,
		current_location: {
			latitude: 30.0476519,
			longitude: 31.4570441,
		},
		matched: false,
	};

	const cruiser = {
		full_name: 'Ahmed Mohamed Mahmoud',
		type: 'cruiser',
		rating: 5,
		number_of_rides: 1,
		current_location: {
			latitude: 30.0476519,
			longitude: 31.4570441,
		},
		matched: false,
	};

	before(async() => {
		// TODO: flush db
		await connectDB();
		// Create a pool of riders and cruisers
		new Array(4).fill(1).forEach(async() => {
			await usersController.create(rider);
			await usersController.create(cruiser);
		});
	});

	after(async() => {
		// TODO: Disconnect DB
	});

	it('should return matching results', async() => {
		const matches = await match();
		return expect(matches.length).to.be.equal(4);
	});
});
