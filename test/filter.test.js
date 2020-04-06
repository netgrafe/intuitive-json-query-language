const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');

chai.use(sinonChai);

const expect = chai.expect;

const logicalTreeBuilder = require('../src/logical-tree-builder');

const sandbox = sinon.createSandbox();

describe('Filtering and testing objects for a query', () => {
    let SUT;
    let logicalTreeBuilderStub;
    let testElementForLogicalTreeStub;

    beforeEach(() => {
        logicalTreeBuilderStub = sandbox.stub(logicalTreeBuilder);
        testElementForLogicalTreeStub = sandbox.stub();

        SUT = proxyquire('../src/filter', {
            './logical-tree-builder': logicalTreeBuilderStub,
            './test-element-for-logical-tree': testElementForLogicalTreeStub
        });
    });

    afterEach(() => sandbox.restore());

    describe('test element against quiery', () => {
        const element = { test: 'testobject' };
        const query = 'test-query';

        it('should return with the value that is returned by logical tree evaluator', () => {
            // GIVEN
            const checkResult = 'return value after check';
            testElementForLogicalTreeStub.returns(checkResult)
            const logicalTree = 'logical tree';
            logicalTreeBuilderStub.build.returns(logicalTree);

            // WHEN
            const result = SUT.testElementAgainstQuery(element, query);

            // THEN
            expect(logicalTreeBuilderStub.build).to.have.been.calledWith(query);
            expect(testElementForLogicalTreeStub).to.have.been.calledWith(element, logicalTree);
            expect(result).to.equal(checkResult)
        });

    });

    describe('filter for elelements fulfilling query', () => {
        const elements =  [
            { test: 'testobject' },
            { test2: 'another test object' },
            { test3: 'third test object' }
        ];
        const query = 'test-query';

        it('should return with the value that is returned by logical tree evaluator', () => {
            // GIVEN
            const checkResult = 'return value after check';
            testElementForLogicalTreeStub.callsFake((element) => {
                return (element === elements[0] || element === elements[2]);
            })
            const logicalTree = 'logical tree';
            logicalTreeBuilderStub.build.returns(logicalTree);

            // WHEN
            const result = SUT.filter(elements, query);

            // THEN
            expect(logicalTreeBuilderStub.build).to.have.been.calledWith(query);
            expect(testElementForLogicalTreeStub).to.have.been.calledWith(elements[0], logicalTree);
            expect(testElementForLogicalTreeStub).to.have.been.calledWith(elements[1], logicalTree);
            expect(result).to.have.ordered.members([
                elements[0],
                elements[2]
            ]);
        });

    });
});
