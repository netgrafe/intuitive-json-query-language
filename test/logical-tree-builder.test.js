const { expect } = require('chai');

const SUT = require('../src/logical-tree-builder');

describe('Logical Tree Builder', () => {
    describe('WHEN query is a plain string without logical operators', () => {
        it('should simply return it back as is', () => {
            const result = SUT.build('New York');

            expect(result).to.equal('New York');
        });
    });

    describe('WHEN query is a simple OR statement', () => {

        const result = SUT.build('a OR b');

        expect(result).to.deep.include({
            OR: [ 'a', 'b']
        });
    });
})