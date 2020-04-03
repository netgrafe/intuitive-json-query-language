const { expect }          = require('chai');

describe('Condition Checkers', () => {
    let SUT;

    beforeEach(() => {
        SUT = require('../src/condition-checkers');
    })

    describe('checkInclusion method', () => {
        describe('GIVEN the property value is falsy', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkInclusion(null, 'apple');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the path refers to an array in the object', () => {
            describe('AND the property contains the look-up value', () => {
                it('should return true', () => {
                    // WHEN
                    const result = SUT.checkInclusion([ 'pear', 'apple' ], 'apple');

                    // THEN
                    expect(result).to.be.true;
                });
            })

            describe('AND the property DOES NOT contains the look-up value', () => {
                it('should return false', () => {
                    // WHEN
                    const result = SUT.checkInclusion([ 'pear', 'grape' ], 'apple');

                    // THEN
                    expect(result).to.be.false;
                });
            })
        });

        describe('GIVEN the path refers to a string in the object', () => {
            describe('AND the property contains the look-up value', () => {
                it('should return true', () => {
                    // WHEN
                    const result = SUT.checkInclusion('the big apple lives forever', 'apple');

                    // THEN
                    expect(result).to.be.true;
                });
            })

            describe('AND the property DOES NOT contains the look-up value', () => {
                it('should return false', () => {
                    // WHEN
                    const result = SUT.checkInclusion('There is no spoon.', 'apple');

                    // THEN
                    expect(result).to.be.false;
                });
            })
        });

        describe('GIVEN the path refers to a type of value which is relevant', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkInclusion(12345, 'apple');

                // THEN
                expect(result).to.be.false;
            });
        });
    });

    describe('checkExclusion method', () => {
        describe('GIVEN the property value is faly', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkExclusion(null, 'apple');

                // THEN
                expect(result).to.be.true;
            });
        });

        describe('GIVEN the path refers to an array in the object', () => {
            describe('AND the property contains the look-up value', () => {
                it('should return false', () => {
                    // WHEN
                    const result = SUT.checkExclusion([ 'pear', 'apple' ], 'apple');

                    // THEN
                    expect(result).to.be.false;
                });
            })

            describe('AND the property DOES NOT contains the look-up value', () => {
                it('should return true', () => {
                    // WHEN
                    const result = SUT.checkExclusion([ 'pear', 'grape' ], 'apple');

                    // THEN
                    expect(result).to.be.true;
                });
            })
        });

        describe('GIVEN the path refers to a string in the object', () => {
            describe('AND the property contains the look-up value', () => {
                it('should return false', () => {
                    // WHEN
                    const result = SUT.checkExclusion('the big apple lives forever', 'apple');

                    // THEN
                    expect(result).to.be.false;
                });
            })

            describe('AND the property DOES NOT contains the look-up value', () => {
                it('should return true', () => {
                    // WHEN
                    const result = SUT.checkExclusion('There is no spoon.', 'apple');

                    // THEN
                    expect(result).to.be.true;
                });
            })
        });

        describe('GIVEN the path refers to a type of value which is relevant', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkExclusion(12345, 'apple');

                // THEN
                expect(result).to.be.true;
            });
        });
    });
})