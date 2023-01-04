// Import the required modules
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

// Import the MongoClient class from the mongodb library
const MongoClient = require('mongodb').MongoClient;

// Initialize the Express app and set the port
const app = express()
const port = 4000;
const time = new Date().toUTCString();

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connection URI for the MongoDB Atlas cluster
const uri = "mongodb+srv://batman:root@cluster0.tjfhrts.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient instance
const client = new MongoClient(uri, { useNewUrlParser: true });

// Connect to the MongoDB Atlas cluster
client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Successfully connected to MongoDB Atlas!");
});

// Get a reference to the 'ProductList' collection in the 'ProductDB' database
const collection = client.db('ProductDB').collection('ProductList');

// Create a route that listens for GET requests to '/api/products'
app.get('/api/products', (req, res) => {

  console.log(`[${time}]: Get Request Successful`);
  
  try {
    // Fetch all product details from the ProductList collection in the ProductDB database
    collection.find({}).toArray((error, results) => {
      if (error) throw error;
      // Send the results back to the client
      res.send(results);
    });
  } catch (error) {
    console.error(error);
    // Send an error message with a status of 500 if there is a problem fetching the products
    res.status(500).send({ message: "There was an error fetching the products from the database." });
  }
});

// This route handles the POST request for adding a new product to the database
app.post('/api/addProduct', (req, res) => {
  // Get the product data from the request body
  const product = req.body;
  // Insert the new product into the database
  collection.insertOne(product, (error) => {
    if (error) {
      // If there was an error inserting the product send an error
      res.status(500).send(error);
    } else {
      console.log(`[${time}]: Product Uploaded Successfully`);
      // If the product was inserted successfully respond with 201 code
      res.status(201).send(product);
    }
  });
});

// Get data from the database of the item you are editing
app.get('/api/editProduct/:id', (req, res) => {
  collection.findOne(
    { _id: req.params._id },
    (error, product) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(product);
    }
  });
});

// Request to send and update the data sent from the user
app.put('/api/editProduct/:id', (req, res) => {
  const ObjectId = require('mongodb').ObjectId;
  const id = ObjectId(req.params.id);
  collection.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete('/api/editProduct/:id', (req, res) => {
  //Took me 3 hours to realise you cant compare a string with an ObjectID, nice :)
  const ObjectId = require('mongodb').ObjectId;
  const id = ObjectId(req.params.id);
  console.log('Deleting: '+req.params.id);
  collection.deleteOne({ _id: id }, (err, result) => {
    // Check for an error
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }

  });
});

// Start the server and listen for incoming requests on port 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
