const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const compression = require('compression');
const axios = require('axios');

const REVIEW_API_ENDPOINT = 'http://ec2-18-223-135-118.us-east-2.compute.amazonaws.com/listing/';
const CHECKOUT_API_ENDPOINT = '';
const CAROUSEL_API_ENDPOINT = '';

app.use(compression());
app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.json());

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
 );
 next();
});

// TODO: Carousel API


// TODO: Checkout API


// Reviews API
app.get('/listing/:id', (req, res) => {
  let id = req.params.id;
  axios.get(REVIEW_API_ENDPOINT + id).then((result) => {
    res.send(result.data);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('proxy listening on port 3000');
});
