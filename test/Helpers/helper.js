'use strict';

const Users = require('../Models/user');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;
const mongoose = require('mongoose');

module.exports = {
	expect,
	connectDB: async() =>
		await mongoose.connect('mongodb://mongo:27017/conCruse-test-db'),
	disconnectDB: async() => await mongoose.disconnect(),
	flushDB: async() => await Users.deleteMany({}),
	wait: async(ms = 10000) => await setTimeout(() => {}, ms),
};
