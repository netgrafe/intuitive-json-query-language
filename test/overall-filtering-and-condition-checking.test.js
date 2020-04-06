const { expect } = require('chai');

const heroes = [
    {
        knownAs: 'Spider-Man',
        name: {
            firstName: 'Peter',
            lastName: 'Parker'
        },
        firstRelease: 1962,
        enemies: [
            'Dr. Octopus',
            'Venom',
            'Kingpin'
        ]
    },
    {
        knownAs: 'Daredevil',
        name: {
            firstName: 'Matthew',
            lastName: 'Murdock'
        },
        firstRelease: 1964,
        enemies: [
            'Kingpin',
            'Owl',
            'Bullseye'
        ]
    }
];

const { filter, testElementAgainstQuery } = require('../src/filter');

describe('Test one element agaisnt queries', () => {
    it('should return with true for matching queries', () => {
        const results = [
            testElementAgainstQuery(heroes[0], 'knownAs IS Spider-Man'),
            testElementAgainstQuery(heroes[0], 'knownAs IS NOT Green Goblin'),
            testElementAgainstQuery(heroes[0], 'name.firstName INCLUDES Peter'),
            testElementAgainstQuery(heroes[0], 'name.firstName NOT INCLUDES Harry'),
            testElementAgainstQuery(heroes[0], 'enemies INCLUDES Venom'),
            testElementAgainstQuery(heroes[0], 'enemies NOT INCLUDES Owl'),
            testElementAgainstQuery(heroes[0], 'firstRelease > 1960'),
            testElementAgainstQuery(heroes[0], 'firstRelease < 1963'),
            testElementAgainstQuery(heroes[0], 'knownAs IS Superman OR (name.firstName INCLUDES Peter AND name.lastName IS Parker)'),
        ]

        results.forEach(res => {
            expect(res).to.be.true;
        })
    })

    it('should return with false for matching queries', () => {
        const results = [
            testElementAgainstQuery(heroes[0], 'knownAs IS Daredevil'),
            testElementAgainstQuery(heroes[0], 'knownAs IS NOT Spider-Man'),
            testElementAgainstQuery(heroes[0], 'name.firstName NOT INCLUDES Peter'),
            testElementAgainstQuery(heroes[0], 'name.firstName INCLUDES Harry'),
            testElementAgainstQuery(heroes[0], 'enemies NOT INCLUDES Venom'),
            testElementAgainstQuery(heroes[0], 'enemies INCLUDES Owl'),
            testElementAgainstQuery(heroes[0], 'firstRelease > 1970'),
            testElementAgainstQuery(heroes[0], 'firstRelease < 1943'),
            testElementAgainstQuery(heroes[0], 'knownAs IS Superman OR (name.firstName INCLUDES Clark AND name.lastName IS Parker)'),
        ]

        results.forEach(res => {
            expect(res).to.be.false;
        })
    })
});