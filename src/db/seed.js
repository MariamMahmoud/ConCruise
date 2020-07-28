/* eslint-disable no-undef */
'use strict';

let cruisers = require('./cruisers');
let customers = require('./customers');
const usersController = require('../Controllers/users');
const { connectDB } = require('../../test/Helpers/helper');

const seed = async() => {
	await connectDB();

	cruisers = cruisers.map(cruiser => {
		cruiser.matched = false;
		cruiser.type = 'cruiser';

		return cruiser;
	});

	customers = customers.map(customer => {
		customer.matched = false;
		customer.type = 'rider';

		return customer;
	});

	const savedCustomers = await usersController.create(cruisers);
	const savedCruisers = await usersController.create(customers);

	console.log(
		`Data Seeded Successfully!! Inserted ${savedCustomers.length} customers and  ${savedCruisers.length} Cruiser.`
	);
};

seed();
