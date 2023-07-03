'use strict';

console.log('Proof of Life');

// Require (like import but for backend)
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Data JSON to Use
let data = require('.data/data.json');

// Creating our server
// app === my server
const app = express();

// Middleware
app.use(cors());

// Define my port for my server
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`We are running ${PORT}!`));

// Endpoints
// URL - '/'
//Callback - handles request and responsd

app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response)=>{
  console.log(request.query);
  let userFirstName = request.query.firstname;
  let userLastName = request.query.lastname;
  response.status(200).send(`Hello ${userFirstName} ${userLastName}`);
});

app.get('/pets', (request, response, next)=>{
  try {
    let queriedSpecies = request.query.species;
    let foundSpecies = data.find(animal => animal.species === queriedSpecies);
    let speciesToSend = new Pet(foundSpecies);
    response.status(200).send(speciesToSend);
  } catch (error) {
    next(error);
  }
});

// Class to groom bulky data
class Pet {
  constructor(animalObj){
    this.name = animalObj.name;
    this.breed = animalObj.breed;
  }
}

// Catch all endpoint - needs to live at bottom
app.get('*', (request, response)=>{
  response.status(404).send('Sorry, page not found');
});

// Error Handling - plug and play code
app.use((error, request, response, next)=>{
  console.log(error.message);
  response.status(500).send(error.message);
});