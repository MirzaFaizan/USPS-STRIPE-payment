var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
let db = mongoose.connection;
var multer = require("multer");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var Item = require('../models/item');
var Customer = require("../models/customer");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "RadioShieldBetaV1" });
});

/* GET error page. */
router.get("/error", function(req, res, next) {
  res.render("error", { title: "TheFoodMattersS" });
});

/* GET Product page. */
router.get("/design", function(req, res, next) {
  res.render("design", { title: "design" });
});

/* GET contact page. */
router.get("/contact", function(req, res, next) {
  res.render("contact", { title: "contact" });
});

/* GET about page. */
router.get("/about", function(req, res, next) {
  res.render("about", { title: "about" });
});

/* GET main partials for testing. */
router.get("/main", function(req, res, next) {
  res.render("main", { title: "main" });
});

/* GET main partials for testing. */
router.get("/customerInfo", function(req, res, next) {
  res.render("customerInfo", { title: "customerInfo" });
});

/* GET main partials for testing. */
router.get("/confirmation", function(req, res, next) {
  res.render("confirmation", { title: "confirmation" });
});

/* GET main partials for testing. */
router.get("/customerList", function(req, res, next) {
  res.render("customerList", { title: "customerList" });
});
/* GET Form Page */
router.get("/form", function(req, res, next) {
  res.render("form", { title: "form" });
});

//POST to datatbase GOOD CODE
router.post("/addCustomer", function(req, res) {
  var customer = new Customer();
  customer.name = req.body.name;
  console.log(customer);
  console.log(req.body.name);

  db.collection("customers").insertOne(customer, (err, result) => {
    if (err) return console.log(err);
    console.log("saved Customer to database");
  });
  res.redirect("/customerList");
});

/* GET Userlist page.*/
router.get("/customerList", function(req, res) {
  db.customers.find({}).toArray(function(err, docs) {
    if (e) {
      console.log(e);
      console.log("Cannot find in DB");
    }
    console.log(docs);
    res.render("customerList", { title: "CustomerList", customerList: docs });
  });
});

/* GET inventory page.
router.get('/customerList', function(req, res, next) {
  Customer.find(function (err, docs) {
        var customers = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += customers) {
            customers.push(docs);
        }
        res.render('customerList', {title: 'customerList', customerList: customers});
    });
});
*/

module.exports = router;
