'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['rider', 'cruiser'],
        },
        rating: {
            type: Number,
            default: 0,
        },
        number_of_rides: {
            type: Number,
            default: 0,
        },
        current_location: {
            lat: {
                type: Number,
                required: true,
            },
            long: {
                type: Number,
                required: true,
            },
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }},
);

const User = mongoose.model('User', userSchema);

module.exports = User;
