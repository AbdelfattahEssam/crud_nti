Products API
A simple REST API built with Node.js and Express.js to manage products using a local JSON file (products.json) as storage.
Features
- Add a product.
- Retrieve all products.
- Delete the local products file.
- Parse incoming JSON request bodies with Express.
- Store product data in a JSON file using Node.js fs.
Tech Stack
- Node.js
- Express.js
- Node.js built-in modules: fs and path
- mongoose is imported in the current code but is not currently used to connect to MongoDB.
Project Structure
project/
├── app.js
├── products.json
├── package.json
└── README.md
products.json must exist before using the current GET /products route. You can create it with the following content:
[]

Getting Started
1. Install dependencies
Make sure Node.js and npm are installed, then run:
npm init -y
npm install express mongoose
The current code imports mongoose, so it is included above even though MongoDB is not yet used.
2. Run the server
Save the application code in app.js, then run:
node app.js
The server will start on port 3000:
app run on port 3000
Base URL:
http://localhost:3000
API Endpoints
1. Add a product
Endpoint: POST /products

Adds the JSON object sent in the request body to products.json.

Request headers:
Content-Type: application/json
Example request body:
{
  "id": 1,
  "name": "Keyboard",
  "price": 750
}
Example success response (201 Created):
{
  "message": "product added",
  "data": {
    "id": 1,
    "name": "Keyboard",
    "price": 750
  }
}
2. Get all products
Endpoint: GET /products

Returns the products currently stored in products.json.

Example response (200 OK):
{
  "message": "content of file",
  "data": [
    {
      "id": 1,
      "name": "Keyboard",
      "price": 750
    }
  ]
}
3. Delete the products file
Endpoint: DELETE /file

Deletes products.json if it exists.

Example success response (200 OK):
{
  "message": "file deleted"
}
If the file does not exist, the route returns 404 Not Found:
{
  "message": "cant delete this file"
}
Warning: This endpoint permanently deletes the local JSON file. Create products.json again with [] before using GET /products or POST /products if the file has been deleted. The current POST /products implementation reads the file synchronously and does not recreate it automatically.

Testing with Postman
1. Start the server using node app.js.
2. Send POST http://localhost:3000/products with a JSON body to add a product.
3. Send GET http://localhost:3000/products to view all products.
4. Send DELETE http://localhost:3000/file to delete the storage file.
Notes and Limitations
- Data is stored in a local JSON file, not in MongoDB.
- The file operations use synchronous methods (readFileSync, writeFileSync, and unlinkSync), which block the Node.js event loop while they run.
- The current GET /products route has no try/catch; a missing file or invalid JSON can cause an error.
- The current POST /products route returns status 404 for all caught errors. A server-side failure would usually be represented by 500 Internal Server Error.
- The API currently accepts any JSON value as a product; input validation has not been added.
- The mongoose import can be removed until MongoDB integration is implemented.
Possible Improvements
- Validate product fields before saving.
- Handle missing files and malformed JSON safely.
- Use asynchronous file operations.
- Return suitable HTTP status codes for different errors.
- Add update and single-product retrieval endpoints.
- Connect MongoDB with Mongoose if database persistence is required.
