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
const authHelper = rewire('routes/read');

describe('read', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('findItem', () => {

        it('should successfully retrieve the data for an item', () => {
            
        });

        it('should return a nullish value when an item is not found', () => {
            
        });
    });
    
    describe('findAllItems', () => {
        it('should successfully retrieve all items in the table', () => {
            
        });
    });

    describe('API Routes', () => {

        describe('GET /items', () => {
            it('should fulfill request to get all items', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
        });

        describe('GET /items/:id', () => {

            it('should fulfill request to get all items', () => {
                
            });

            it('should reject when item does not exist in db', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
        });
    });
});