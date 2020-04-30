const mongoose = require('mongoose');
const crypto = require('crypto');

let Customer = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    cust_type: {
        type: String,
        required: true,
    },
    avg_rating: {
        type: Number,
        required: true, 
    },
    hash: String,
    salt: String,
});

Customer.methods.setPassword = function(password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 

};

Customer.methods.validPassword = function(password) {

    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 

};

module.exports = mongoose.model('user', Customer);