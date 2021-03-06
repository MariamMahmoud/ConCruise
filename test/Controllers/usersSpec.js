/* eslint-disable no-undef */
const usersController = require('../../src/Controllers/users');
const { expect, connectDB, disconnectDB, flushDB, wait } = require('../Helpers/helper');
const _ = require('lodash');

describe('Controllers/Users', () => {
	const testUser = {
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

	before(async() => {
		await connectDB();
		await wait();
		await flushDB();
		await wait();
	});

	after(async() => {
		await disconnectDB();
	});

	it('should insert user', async() =>{
		const response = await usersController.create(testUser);
		expect(response._doc).to.contain.keys(['_id', 'created_at']);

		expect(
			_.pick(
				response._doc,
				['full_name', 'type', 'rating', 'number_of_rides', 'current_location', 'matched'],
			),
		).to.deep.equal(testUser);

		return response;
	});


	it('should update user', async() =>{
		let createdUser = await usersController.create(testUser);
		createdUser.rating = 5;
		const response = await usersController.update(createdUser);

		return expect(response.nModified).to.equal(1);
	});

	it('should delete given users', async() => {
		const idsToBeDeleted = [];
		let createdtestUser = await usersController.create(testUser);
		idsToBeDeleted.push(createdtestUser._id.toString());

		let createdUser2 = await usersController.create(testUser);
		idsToBeDeleted.push(createdUser2._id.toString());

		const response = await usersController.delete(idsToBeDeleted);

		return expect(response.deletedCount).to.equal(idsToBeDeleted.length);
	});

	it('should find user based on query');
	// TODO: schema validation cases
});