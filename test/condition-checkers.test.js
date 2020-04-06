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

    describe('checkEquality method', () => {
        describe('GIVEN the property value is falsy', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkEquality(null, 'apple');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value equals to lookUp value', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkEquality('apple', 'apple');

                // THEN
                expect(result).to.be.true;
            });
        });

        describe('GIVEN the property value does not equals to lookUp value', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkEquality('pear', 'apple');

                // THEN
                expect(result).to.be.false;
            });
        });
    });

    describe('checkInequality method', () => {
        describe('GIVEN the property value is falsy', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkInequality(null, 'apple');

                // THEN
                expect(result).to.be.true;
            });
        });

        describe('GIVEN the property value not equals to lookUp value', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkInequality('pear', 'apple');

                // THEN
                expect(result).to.be.true;
            });
        });

        describe('GIVEN the property value  equals to lookUp value', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkInequality('apple', 'apple');

                // THEN
                expect(result).to.be.false;
            });
        });
    });

    describe('checkIfGreaterThan method', () => {
        describe('GIVEN the property value is falsy', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfGreaterThan(null, '1999');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the lookUp value is not a number-like', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfGreaterThan(2030, 'abcde');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value is not a number', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkIfGreaterThan('abcde', '1999');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value less than lookUp value', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfGreaterThan(1995, '1999');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value is greater than lookUp value', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkIfGreaterThan(2000, '1999');

                // THEN
                expect(result).to.be.true;
            });
        });
    });

    describe('checkIfLessThan method', () => {
        describe('GIVEN the property value is falsy', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfLessThan(null, '1999');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the lookUp value is not a number-like', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfLessThan(2030, 'abcde');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value is not a number', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkIfLessThan('abcde', '1999');

                // THEN
                expect(result).to.be.false;
            });
        });

        describe('GIVEN the property value less than lookUp value', () => {
            it('should return true', () => {
                // WHEN
                const result = SUT.checkIfLessThan(1995, '1999');

                // THEN
                expect(result).to.be.true;
            });
        });

        describe('GIVEN the property value is greater than lookUp value', () => {
            it('should return false', () => {
                // WHEN
                const result = SUT.checkIfLessThan(2000, '1999');

                // THEN
                expect(result).to.be.false;
            });
        });
    });
})