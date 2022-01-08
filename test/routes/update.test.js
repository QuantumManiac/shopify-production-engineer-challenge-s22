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
const authHelper = rewire('routes/update');

describe('update', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('updateItem', () => {
        
        it('should update an item successfully', () => {
            
        });

        it('should throw an error if the item to update does not exist', () => {
            
        });
    });

    describe('API Routes', () => {
        
        describe('PUT /items/:id', () => {
            it('should successfully update the data for an item', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
        });
    });
    
});