'use strict';

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usersController = require('../Controllers/users');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// TODO: add authorization middleware
// TODO add validations to avoid crashing
// TODO: add swagger docs

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/shrug', async(req, res) => {
	res.send({
		connected: true,
		shrug: '¯\\_(ツ)_/¯',
	});
});

app.post('/user', async(req, res) => {
	const user = _.get(req.body, 'user');
	try {
		const response = await usersController.create(user);
		res.send({
			success: true,
			response: response,
		});
	} catch(error) {
		const err = {
			name: 'API crashed',
			details: error.stack,
			message: error.message,
		};

		res.send({
			success: false,
			error: err,
		});
	}
});

app.patch('/user', async(req, res) => {
	const user = _.get(req.body, 'user');
	try{
		const response = await usersController.update(user);

		res.send({
			success: true,
			response: response,
		});
	} catch(error) {
		const err = {
			name: 'API crashed',
			details: error.stack,
			message: error.message,
		};

		res.send({
			success: false,
			error: err,
		});
	}
});

app.delete('/user', async(req, res) => {
	const userIds = _.get(req.body, 'userIds');
	try{
		const response = await usersController.delete(userIds);

		res.send({
			success: true,
			deleted: response.deletedCount,
		});
	} catch(error) {
		const err = {
			name: 'API crashed',
			details: error.stack,
			message: error.message,
		};

		res.send({
			success: false,
			error: err,
		});
	}
});

module.exports = app;
