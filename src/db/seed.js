/* eslint-disable no-undef */
'use strict';

let cruisers = require('./cruisers');
let customers = require('./customers');
const Users = require('../Models/user');

const seed = async() => {
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

	const savedCruisers = await Users.insertMany(cruisers);
	const savedCustomers = await Users.insertMany(customers);

	console.log(
		`Data Seeded Successfully!! Inserted ${savedCustomers.length} customers and  ${savedCruisers.length} Cruiser.`
	);
};

seed();
