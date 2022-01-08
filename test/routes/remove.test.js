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
const authHelper = rewire('routes/remove');

describe('remove', () => {

    beforeEach(() => {

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('deleteItem', () => {
        
        it('should successfully delete an item', () => {
        
        });

        it('should return a boolean based on whether or not an item was deleted', () => {
            
        });
    });

    describe('API Routes', () => {

        describe('DELETE /items/:id', () => {

            it('should fulfill request to delete an item', () => {
                
            });

            it('should reject when item does not exist', () => {
                
            });

            it('should reject when db query fails', () => {
                
            });
        });
    });
    
});