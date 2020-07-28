#!/usr/bin/env node
/* eslint-disable no-undef */
'use strict';

const { Command } = require('commander');
const usersController = require('../Controllers/users');
const match = require('../Services/match');

const program = new Command();
program.version('1.0.0');
program
	.option('--manual', 'Display all available options')
	.option('--customer', 'Show existing list of customers')
	.option('--cruiser', 'Show existing list of cruisers')
	.option('--match', 'Display matching results')
	.option('--exit', 'Kill the process');

program
	.command('--manual')
	.description('Display all available options')
	.action(() => {
		console.log(program.opts());
	});

program
	.command('--customer')
	.description('Show existing list of customers')
	.action(async() => {
		const customers = await usersController.findByQuery({ type: 'rider'});
		console.log(JSON.stringify(customers, null, 2));
	});

program
	.command('--cruiser')
	.description('Show existing list of cruisers')
	.action(async() => {
		const customers = await usersController.findByQuery({ type: 'cruiser'});
		console.log(JSON.stringify(customers, null, 2));
	});

program
	.command('--match')
	.description('Display matching results')
	.action(async() => {
		const matches = await match();
		const nonMatchingCustomers = await usersController.findByQuery({ type: 'rider', matching: false });
		const nonMatchingCruisers = await usersController.findByQuery({ type: 'cruisers', matching: false });

		const responseObject = {
			matches: JSON.stringify(matches, null, 2),
			nonMatchingCustomers: nonMatchingCustomers.length > 0 ? nonMatchingCustomers : 'all customers matched!!',
			nonMatchingCruisers: nonMatchingCruisers.length > 0 ? nonMatchingCruisers : 'all cruisers matched!!'
		};

		console.log(JSON.stringify(responseObject, null, 2));

	});

program
	.command('--exit')
	.description('Kill the process')
	.action(() => {
		process.exit(0);
	});

program.parse(process.argv);
