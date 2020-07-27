'use strict';

const _ = require('lodash');
const Users = require('../Models/user');
// TODO: add validations to avoid crashing

module.exports = {
	create: async user=> {
        try {
            return await Users.create(user)
        } catch(error) {
            const err = {
                name: 'Create user crashed',
                details: error.stack,
                message: error.message,
            };
            //  TODO: log err

            throw err;
        }
    },

    update: async user => {
        try {
            return await Users.updateOne(
                { _id: user._id },
                _.omit(user, '_id'),
                { new: true }
            );
        } catch(error) {
            const err = {
                name: 'Update user crashed',
                details: error.stack,
                message: error.message,
            };
            //  TODO: log err

            throw err;
        }
    },

    delete: async userIds => {
        try {
            return await Users.deleteMany({
                _id: { $in: userIds }
            });

        } catch(error) {
            const err = {
                name: 'Delete user(s) crashed',
                details: error.stack,
                message: error.message,
            };
            // TODO: log err

            throw err;
        }
    },
};
