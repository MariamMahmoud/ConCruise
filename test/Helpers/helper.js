'use strict';

const Users = require('../../src/Models/user');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;
const mongoose = require('mongoose');

module.exports = {
	expect,
	connectDB: async() =>
		await mongoose.connect(process.env.MONGO_URL),
	disconnectDB: async() => await mongoose.disconnect(),
	flushDB: async() => await Users.deleteMany({}),
	wait: async(ms = 10000) => await setTimeout(() => {}, ms),
};
