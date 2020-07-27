'use strict';
const calculateScore = require('./calculateScore');
const usersController = require('../Controllers/users');

const _findNotMatching = async type =>
    await usersController.findByQuery({ type, matched: false });

module.exports = async() => {
    const riders = await _findNotMatching('rider');
    const matches = [];

    riders.forEach(rider => {
        let bestScore = 0;
        let matchedCruiser;
        // Find available cruisers for each rider
        // TODO: hectic DB operation, needs optimization
        // One way is to fetch those  available and in a certain range around me, fetching a smaller array
        // Or those around me, available and withing a certain score from me
        // The downside of that is that sometime matching will fail although cruisers are available,
        // but that's because there is a huge score gap that would affect the customer satisfaction,
        // so it is a business decision what to compromise here
        // Another suggestion is to set a threshold, once we get a cruiser that fits this threshold we don't need to continue to loop through all of them,
        // we will match this one and compromise the best match for the sake of a faster yet still good match
        let cruisers = await _findNotMatching('cruiser');

        cruisers.forEach(cruiser => {
            let currentScore = calculateScore(rider, cruiser);
            if(currentScore >= bestScore) {
                bestScore = currentScore;
                matchedCruiser = cruiser;
            }
        });
        // if a match happened
        if(matchedCruiser) {
            matches.push({ rider, cruiser: matchedCruiser, score: bestScore });
            rider.matched = true;
            matchedCruiser.matched = true;
            usersController.update(rider);
            usersController.update(matchedCruiser);
        }
    });

    return {
        matched: matches,
        failedFulfillment: (await _findNotMatching('rider')),
        idleCruisers: (await _findNotMatching('cruiser')),
    }
}