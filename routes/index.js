//Bring in the includes and set the connection string
//mongo and mongooose stuff
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackdb');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

//add the Get and Post and mongoose model

router.get('/add', function(req,res) {
    res.render('addProduct.ejs');
});

router.get('/viewall', function(req, res) {
  Product.find({}, function(err, prds) {
    console.log("\nProducts !");
    console.log(prds);
    renderResult(res, prds, "Product List from MongoDB:");
  });
});

function renderResult(res, prds, msg) {
  res.render('display.ejs', {message:msg, products:prds},
    function(err, result) {
      if (!err) {res.end(result);}
      else {res.end('Oops ! An error occurred.');
        console.log(err);}
});}

//the mongoose model

var productSchema = new mongoose.Schema({
  prdId: String,
  Name: { type: String }, 
  Price: Number
})

var Product = mongoose.model('Product', productSchema);

router.post('/new', function(req, res){
  new Product({
    prdId : req.body.ProductId,
    Name  : req.body.ProductName,
    Price   : req.body.ProductPrice
  }).save(function(err, prd){
    if(err) res.json(err);
    else    res.send("Product Successfully Added !");
  });
});

module.exports = router;
