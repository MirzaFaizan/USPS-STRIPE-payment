var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true}
});

/*
var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},//in the future we would verify userName isnt takes
    email: {type: String, required: true},
});
*/

module.exports = mongoose.model('Customer', schema);



//In the future, I will change the model so that it is as follows

//Model Customer has a
//  Model Details(Name, username, userId)
//  Model Address(street, city, state, country, zip)
//  Modle Card(Type, nameOnCard, cardNumber, expr, CVV)
