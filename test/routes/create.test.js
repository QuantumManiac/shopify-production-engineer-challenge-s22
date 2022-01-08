/* eslint-disable */
// Allow absolute paths rather than relative paths from test file
require('rootpath')();

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const rewire = require('rewire');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// Create sandbox for stubbing
const sandbox = sinon.createSandbox();

// Get file under test
const authHelper = rewire('routes/create');

describe('create', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createItem', () => {

        it('should Create an item with all valid fields', () => {
            
        });

        it('should create an item with no name provided', () => {
            
        });

        it('should create an item with no description provided', () => {
            
        });

        it('should create an item with no quantity provided', () => {
            
        });

        it('should create an item with no optional values provided', () => {
            
        });
    });

    describe('API Routes', () => {

        describe('POST /items', () => {

            it('should fulfill request to create an item', () => {
                
            });

            it('should reject when name is not provided', () => {
                
            });

            it('should reject when quantity is not a number', () => {
                
            });

            it('should reject when quantity is negative ', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
            
        });
        
    });
    
});