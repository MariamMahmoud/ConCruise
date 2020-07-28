#!/usr/bin/env node
/* eslint-disable no-undef */
'use strict';

const { Command } = require('commander');
const usersController = require('../Controllers/users');
const match = require('../Services/match');
const { connectDB } = require('../../test/Helpers/helper');
const program = new Command();
program.version('1.0.0');

program
	.command('manual')
	.description('Display all available options')
	.action(() => {
		console.log(program.commands.map(cmd => `name: ${cmd.name()}, description: ${cmd.description()}`));
	});

program
	.command('customer')
	.description('Show existing list of customers')
	.action(async() => {
		await connectDB();
		const customers = await usersController.findByQuery({ type: 'rider'});
		console.log(JSON.stringify(customers, null, 2));
		process.exit(0);
	});

program
	.command('cruiser')
	.description('Show existing list of cruisers')
	.action(async() => {
		await connectDB();
		const customers = await usersController.findByQuery({ type: 'cruiser'});
		console.log(JSON.stringify(customers, null, 2));
		process.exit(0);
	});

program
	.command('match')
	.description('Display matching results')
	.action(async() => {
		await connectDB();
		const matches = await match();
		const nonMatchingCustomers = await usersController.findByQuery({ type: 'rider', matching: false });
		const nonMatchingCruisers = await usersController.findByQuery({ type: 'cruisers', matching: false });

		const responseObject = {
			matches: JSON.stringify(matches, null, 2),
			nonMatchingCustomers: nonMatchingCustomers.length > 0 ? nonMatchingCustomers : 'all customers matched!!',
			nonMatchingCruisers: nonMatchingCruisers.length > 0 ? nonMatchingCruisers : 'all cruisers matched!!'
		};

		console.log(JSON.stringify(responseObject, null, 2));
		process.exit(0);
	});

program
	.command('exit')
	.description('Kill the process')
	.action(() => {
		process.exit(0);
	});

program.parse(process.argv);
