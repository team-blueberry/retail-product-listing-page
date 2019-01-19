// Dependencies
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const axios = require('axios');

//  Configuration
const REVIEW_API_ENDPOINT =
  'http://ec2-18-223-135-118.us-east-2.compute.amazonaws.com/api/reviews/';
const CHECKOUT_API_ENDPOINT =
  'http://ec2-18-223-214-235.us-east-2.compute.amazonaws.com/api/checkout/';
const CAROUSEL_API_ENDPOINT = 'http://34.233.106.94/api/images/';
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(compression());
app.use(morgan('dev'));
app.use('/:id/', express.static(__dirname + '/../public/'));

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
