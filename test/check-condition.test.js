const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

const expect = chai.expect;

describe('Check Condition', () => {
    const constants = require('../src/constants');
    const conditionCheckers = require('../src/condition-checkers');

    let conditionCheckersStub;
    let getValueOnPopertyPathStub;

    let SUT;

    beforeEach(() => {
        conditionCheckersStub = sandbox.stub(conditionCheckers);
        getValueOnPopertyPathStub = sandbox.stub();

        SUT = proxyquire('../src/check-condition', {
            './constants': constants,
            './condition-checkers': conditionCheckersStub,
            './get-value-on-property-path': getValueOnPopertyPathStub
        });

        console.log(SUT);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('GIVEN the defined condition is still a string to be processed', () => {
        describe('WHEN non of the operators are found', () => {
            it('should return false', () => {
                const result = SUT({}, 'some string without operator');

                expect(result).to.be.false;
            });
        });

        describe('WHEN space is not left around operators', () => {
            it('should return false', () => {
                const result = SUT({
                    name: 'John'
                }, 'name ISJohn');

                expect(result).to.be.false;
            });
        });

        describe('WHEN value at defined property does not exists', () => {
            it('should return false', () => {
                // GIVEN
                const input = {};
                const path = 'firstname';
                const lookUpValue = 'John';
                const valueOnProperty = null;
                const operator = constants.IS;

                getValueOnPopertyPathStub.returns(valueOnProperty);

                // WHEN
                const result = SUT(input, `${path} ${operator} ${lookUpValue}`);

                // THEN
                expect(getValueOnPopertyPathStub).to.have.been.calledWith(input, path);
                expect(result).to.be.false;
            });
        });

        describe('WHEN lookupValue is empty', () => {
            it('should return false', () => {
                // GIVEN
                const input = {};
                const path = 'firstname';
                const lookUpValue = '';
                const valueOnProperty = 'Steve';
                const operator = constants.IS;

                getValueOnPopertyPathStub.returns(valueOnProperty);

                // WHEN
                const result = SUT(input, `${path} ${operator} ${lookUpValue}`);

                // THEN
                expect(getValueOnPopertyPathStub).to.have.been.calledWith(input, path);
                expect(result).to.be.false;
            });
        });

        describe('WHEN expression can be parsed correctly, it should run the proper checker function', () => {
            const input = {};
            const path = 'firstname';
            const lookUpValue = 'Look Up Value';
            const valueOnProperty = 'Steve';
            const checkerFunctionResult = 'checker function result';

            const { INCLUDES, NOT_INCLUDES, IS, IS_NOT, GT, LT } = constants;
            const checkerMap = {
                [INCLUDES]:         'checkInclusion',
                [NOT_INCLUDES]:     'checkExclusion',
                [IS]:               'checkEquality',
                [IS_NOT]:           'checkInequality',
                [GT]:               'checkIfGreaterThan',
                [LT]:               'checkIfLessThan'
            }

            Object.entries(checkerMap).forEach(([ operator, checkerFunctionName ]) => {
                it('should return the value that is returned by checker function', () => {
                    // GIVEN
                    getValueOnPopertyPathStub.returns(valueOnProperty);
                    conditionCheckersStub[checkerFunctionName].returns(checkerFunctionResult);

                    // WHEN
                    const result = SUT(input, `${path} ${operator} ${lookUpValue}`);

                    // THEN
                    expect(getValueOnPopertyPathStub).to.have.been.calledWith(input, path);
                    expect(conditionCheckersStub[checkerFunctionName]).to.have.been.calledWith(valueOnProperty, lookUpValue)
                    expect(result).to.equal(checkerFunctionResult);
                });
            })
        });
    });

    describe('GIVEN the defined condition already an evaluated boolean result', () => {
        it('should return with the value of the processed condition itself', () => {
            // WHEN
            const result = SUT({}, true);

            // THEN
            expect(result).to.equal(true);

            // WHEN
            const result2 = SUT({}, false);

            // THEN
            expect(result2).to.equal(false);
        });
    });

    describe('GIVEN the defined condition is some not meaningful value', () => {
        it('should return false', () => {
            // WHEN
            const result = SUT({}, 1234);

            // THEN
            expect(result).to.be.false;
        });
    });

})

