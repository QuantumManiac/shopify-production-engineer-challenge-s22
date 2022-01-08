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
const authHelper = rewire('routes/export');

describe('export', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('findAllItems', () => {
        
        it('should return a list of all records in the db', () => {
            
        });
    });
    
    describe('generateCsv', () => {
        
        it('should create a csv from the given data', () => {

        });

        it('should return an empty string if no data is given', () => {
            
        });
    });

    describe('API Routes', () => {

        describe('GET /export', () => {

            it('should fulfill request to generate a csv', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
        });
    });
    
});