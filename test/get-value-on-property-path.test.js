const { expect } = require('chai');

describe('getValueOnPropertyPath function', () => {
    const getValueOnPropertyPath = require('../src/get-value-on-property-path');

    describe('GIVEN parameters are invalid', () => {
        describe('WHEN object reference is falsy', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath(undefined, 'hero');

                expect(result).to.be.null;
            });
        });

        describe('WHEN object reference is not strictly type of Object', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath(function () {}, 'hero');

                expect(result).to.be.null;
            });
        });

        describe('WHEN property path is falsy', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath({}, undefined);

                expect(result).to.be.null;
            });
        });

        describe('WHEN property path is not a string', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath({}, 432);

                expect(result).to.be.null;
            });
        });
    })

    describe('WHEN property path is a simple property name but does not exist on object', () => {
        it('should return null', () => {
            const result = getValueOnPropertyPath({}, 'hero');

            expect(result).to.be.null;
        });
    });

    describe('WHEN property path is a simple property name and exists', () => {
        it('should return with the value at that property', () => {
            // GIVEN
            const input = {
                hero: 'Spider-Man'
            };

            const result = getValueOnPropertyPath(input, 'hero');

            expect(result).to.equal(input.hero);
        });
    });

    describe('WHEN property path is deep', () => {
        describe('AND WHEN top-level key is missing', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath({}, 'hero.name.firstName');

                expect(result).to.be.null;
            });
        });

        describe('AND WHEN mid-level key is missing', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath({
                    hero: {}
                }, 'hero.name.firstName');

                expect(result).to.be.null;
            });
        });

        describe('AND WHEN node-level key is missing', () => {
            it('should return null', () => {
                const result = getValueOnPropertyPath({
                    hero: {
                        name: {}
                    }
                }, 'hero.name.firstName');

                expect(result).to.be.null;
            });
        });

        describe('AND WHEN one of the level is an array', () => {
            it('should return null', () => {
                const input = {
                    hero: {
                        enemies: [ 'Dr. Octopus', 'Venom' ]
                    }
                }

                const result = getValueOnPropertyPath(input, 'hero.enemies.1');

                expect(result).to.be.null;
            });
        });

        describe('AND WHEN the value is defined at property path', () => {
            it('should return the value at the defined path', () => {
                const input = {
                    hero: {
                        name: {
                            lastName: 'Parker'
                        }
                    }
                }

                const result = getValueOnPropertyPath(input, 'hero.name.lastName');

                expect(result).to.equal(input.hero.name.lastName);
            });
        });
    });
});