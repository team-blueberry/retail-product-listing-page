// Dependencies
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const axios = require('axios');

//  Configuration
const CHECKOUT_API_ENDPOINT = process.env.CHECKOUT_API_ENDPOINT ||
'http://ec2-18-223-214-235.us-east-2.compute.amazonaws.com/api/checkout/';

const CAROUSEL_API_ENDPOINT = process.env.CAROUSEL_API_ENDPOINT ||
'http://34.233.106.94/api/images/';

const REVIEW_API_ENDPOINT = process.env.REVIEW_API_ENDPOINT ||
  'http://ec2-18-223-135-118.us-east-2.compute.amazonaws.com/api/reviews/';

const port = process.env.PORT || 3000;

console.log('API Endpoints:');
console.log(' - REVIEW_API_ENDPOINT:',REVIEW_API_ENDPOINT);
console.log(' - CHECKOUT_API_ENDPOINT:',CHECKOUT_API_ENDPOINT);
console.log(' - CAROUSEL_API_ENDPOINT:',CAROUSEL_API_ENDPOINT);

const app = express();

// Middleware
app.use(compression());
app.use(morgan('dev'));
app.use('/:id(\\d+)/', express.static(__dirname + '/../public/'));
app.use('/', express.static(__dirname + '/../public/'));

// Carousel API
app.get('/api/images/:id', (req, res) => {
  let id = req.params.id;
  axios
    .get(CAROUSEL_API_ENDPOINT + id)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Checkout API
app.get('/api/checkout/:id', (req, res) => {
  let id = req.params.id;
  axios
    .get(CHECKOUT_API_ENDPOINT + id)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Reviews API
app.get('/api/reviews/:id', (req, res) => {
  let id = req.params.id;
  axios
    .get(REVIEW_API_ENDPOINT + id)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Start server
app.listen(port, () => {
  console.log('proxy listening on port 3000');
});
