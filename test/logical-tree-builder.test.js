const { expect } = require('chai');

const SUT = require('../src/logical-tree-builder');

describe('Logical Tree Builder', () => {
    describe('WHEN query has not correctly closed the parens inside', () => {
        it('should throw an error', () => {
            expect(() => {
                SUT.build('(()()))');
            }).to.throw(Error, 'Parens are not correctly matching in query. Seems like you have too many right');

            expect(() => {
                SUT.build('((()())');
            }).to.throw(Error, 'Parens are not correctly matching in query. Seems like you have too many left');
        });
    });

    describe('WHEN query is a plain string without logical operators', () => {
        it('should simply return it back as is', () => {
            const result = SUT.build('New York');

            expect(result).to.equal('New York');
        });
    });

    describe('WHEN query is a simple OR statement', () => {
        it('should return an object with an OR property, containing its belonging operands', () => {
            const result = SUT.build('a OR b');

            expect(result).to.deep.include({
                OR: [ 'a', 'b']
            });
        });
    });
    
    describe('WHEN query contains multiple OR statement on the same level', () => {
        it('should return an object with an OR property, containing all its belonging operands', () => {
            const result = SUT.build('a OR b OR c OR d OR e');

            expect(result).to.deep.include({
                OR: [ 'a', 'b', 'c', 'd', 'e']
            });
        });
    });

    describe('WHEN query is a simple AND statement', () => {
        it('should return an object with an AND property, containing its belonging operands', () => {
            const result = SUT.build('a AND b');

            expect(result).to.deep.include({
                AND: [ 'a', 'b']
            });
        });
    });

    describe('WHEN query contains multiple AND statement on the same level', () => {
        it('should return an object with an AND property, containing all its belonging operands', () => {
            const result = SUT.build('a AND b AND c AND d AND e');

            expect(result).to.deep.include({
                AND: [ 'a', 'b', 'c', 'd', 'e']
            });
        });
    });

    describe('WHEN query contains both AND and OR operator on the same level', () => {
        it('should leave the OR for later so should be on the top of the tree', () => {
            const result = SUT.build('a AND b OR c');

            expect(result).to.deep.include({
                OR: [
                    {
                        AND: [ 'a', 'b']
                    },
                    'c'
                ]                    
            });
        });

        it('should leave the OR for later so should be on the top of the tree', () => {
            const result = SUT.build('a AND b OR c AND d');

            expect(result).to.deep.include({
                OR: [
                    {
                        AND: [ 'a', 'b']
                    },
                    {
                        AND: [ 'c', 'd']
                    }                    
                ]                    
            });
        });
    });

    describe('WHEN query contains parens to group condition snippets', () => {
        describe('WHEN a truly lower level OR is wrapped', () => {
            it('should should group the OR first to lower levels', () => {
                // WHEN
                const result = SUT.build('a AND ( b OR c ) AND d ');

                // THEN
                expect(result).to.deep.include({
                    AND: [
                        'a',
                        {
                            OR: [ 'b', 'c' ]
                        },
                        'd'
                    ]
                });
            });
        });

        describe('WHEN multiple parens defined at the same level', () => {
            it('should handle them all', () => {
                // WHEN
                const result = SUT.build('a AND ( b OR c ) OR (d AND e) ');

                // THEN
                expect(result).to.deep.include({
                    OR: [
                        {
                            AND: [
                                'a',
                                {
                                    OR: [ 'b', 'c' ]
                                }
                            ]
                        },
                        {
                            AND: [ 'd', 'e' ]
                        }                        
                    ]
                });
            });
        });

        describe('WHEN parens are embedded into each other', () => {
            it('should handle put the deepest into the lowest level of the tree', () => {
                // WHEN
                const result = SUT.build('a AND ((b OR c) AND (d AND e))');

                // THEN
                expect(result).to.deep.include({
                    AND: [
                        'a',
                        {
                            AND: [
                                {
                                    OR: [ 'b', 'c' ]
                                },
                                {
                                    AND: [ 'd', 'e' ]
                                }                                                        
                            ]
                        },
                    ]
                });
            });
        });

        describe('WHEN operands are more realistic', () => {
            it('should also handle put the deepest into the lowest level of the tree', () => {
                // WHEN
                const result = SUT.build('artist IS Charlie AND ((comment INCLUDES favourite OR comment INCLUDES trip) AND comment NOT INCLUDES nihil)');

                // THEN
                expect(result).to.deep.include({
                    AND: [
                        'artist IS Charlie',
                        {
                            AND: [
                                {
                                    OR: [ 'comment INCLUDES favourite', 'comment INCLUDES trip' ]
                                },
                                'comment NOT INCLUDES nihil'
                            ]
                        },
                    ]
                });
            });
        });
    });
})