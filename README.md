# shopify-production-engineer-challenge-w22
My Submission for the [Shopify Production Engineer Intern  Challenge - Summer 2022](https://docs.google.com/document/d/1wir0XQuviR6p-uNEUPzsGvMFwqgMsY8sEjGUx74lNrg/edit)

A quick and simple inventory management application comprised of an web front-end and a backend run on Node.js + Express using a Sqlite database to store data. The application has basic CRUD (Create, Read, Edit, Delete) functionality and can export inventory contents into a CSV file.

## Requirements
[Node.js 16](https://nodejs.org/en/download/) along with `npm` (usually pre-installed with Node) is required to run this application.

## Usage
In terminal:
```sh 
# Clone the repo 
git clone https://github.com/QuantumManiac/shopify-production-engineer-challenge-s22
cd shopify-production-engineer-challenge-s22
# Install npm dependencies
npm install 
# Start the server
npm start
# The server should now be running. Navigate to https://localhost:3000 to view the front-end
```

The UI is fairly intuitive:
- "Create New Item" can be used to add a new item to the inventory
    - Note that the IDs of new items are auto-generated
- "Refresh" will refresh the inventory table
- "Export CSV File" will download a CSV file of the inventory contents
- There are two action buttons at the end of each item row:
    - The blue "Edit" button will allow you to edit the item properties
    - The red "Delete" button will allow you to delete the item from the inventory

## Testing
The skeleton for the test cases exist, although the test implementations themselves are WIP. Nevertheless, they can be run with:
```
npm run test
```