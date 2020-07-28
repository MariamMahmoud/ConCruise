/* eslint-disable no-undef */
'use strict';

let cruisers = require('./cruisers');
let customers = require('./customers');
const Users = require('../Models/user');
const { coonectDB, connectDB } = require('../../test/Helpers/helper');

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

		return cruiser;
	});
	await Users.insertMany(cruisers);
	await Users.insertMany(customers);

	console.log('Data Seeded Successfully!!');
	process.exit(0);
};

seed();