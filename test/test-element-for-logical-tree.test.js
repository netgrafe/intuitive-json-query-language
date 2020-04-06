const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');

chai.use(sinonChai);

const expect = chai.expect;

const sandbox = sinon.createSandbox();

describe('Filtering and testing objects for a query', () => {
    let SUT;
    let checkConditionStub;

    beforeEach(() => {
        checkConditionStub = sandbox.stub()

        SUT = proxyquire('../src/test-element-for-logical-tree', {
            './check-condition': checkConditionStub
        });
    });

    afterEach(() => sandbox.restore());

    describe('test element against quiery', () => {
        const element = { test: 'testobject' };

        describe('WHEN logical tree is simply a string', () => {
            it('should simply check that single condition and return with the return value of it', () => {
                // GIVEN
                const logicalTree = 'simplecondition'
                const conditionResult = true;
                checkConditionStub.returns(conditionResult)

                // WHEN
                const result = SUT(element, logicalTree);

                // THEN
                expect(checkConditionStub).to.have.been.calledWith(element, logicalTree);
                expect(result).to.equal(conditionResult);
            });
        });

        describe('WHEN logical tree is an object representing OR relation ship', () => {
            describe('AND all of the operands evaluated to false', () => {
                it('should eventually return with false', () => {
                    // GIVEN
                    const logicalTree = {
                        OR: [ 'a', 'b', 'c' ]
                    }
                    checkConditionStub.returns(false)

                    // WHEN
                    const result = SUT(element, logicalTree);

                    // THEN
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[0]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[1]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[2]);
                    expect(result).to.equal(false);
                });
            });

            describe('AND at least one of the operands evaluated to true', () => {
                it('should eventually return with true', () => {
                    // GIVEN
                    const logicalTree = {
                        OR: [ 'a', 'b', 'c' ]
                    }
                    checkConditionStub.callsFake((element, condition) => {
                        return (condition === 'b');
                    });

                    // WHEN
                    const result = SUT(element, logicalTree);

                    // THEN
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[0]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[1]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.OR[2]);
                    expect(result).to.equal(true);
                });
            });
        });

        describe('WHEN logical tree is an object representing OR relation ship', () => {
            describe('AND all of the operands evaluated to true', () => {
                it('should eventually return with true', () => {
                    // GIVEN
                    const logicalTree = {
                        AND: [ 'a', 'b', 'c' ]
                    }
                    checkConditionStub.returns(true)

                    // WHEN
                    const result = SUT(element, logicalTree);

                    // THEN
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[0]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[1]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[2]);
                    expect(result).to.equal(true);
                });
            });

            describe('AND at least one of the operands evaluated to false', () => {
                it('should eventually return with false', () => {
                    // GIVEN
                    const logicalTree = {
                        AND: [ 'a', 'b', 'c' ]
                    }
                    checkConditionStub.callsFake((element, condition) => {
                        return (condition !== 'b');
                    });

                    // WHEN
                    const result = SUT(element, logicalTree);

                    // THEN
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[0]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[1]);
                    expect(checkConditionStub).to.have.been.calledWith(element, logicalTree.AND[2]);
                    expect(result).to.equal(false);
                });
            });
        });

        describe('WHEN logical tree is some non-relevant data type', () => {
            it('should return with false without any evaluation', () => {
                // WHEN
                const result = SUT(element, 123450);

                // THEN
                expect(checkConditionStub).not.to.have.been.called;
                expect(result).to.equal(false);
            });
        });
    });
});
