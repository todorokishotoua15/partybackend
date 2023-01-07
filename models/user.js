const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const People = new Schema ({
    name : {
        type: String
    },
    prod : {
        type: String
    },
    mobile : {
        type: String
    },
    email : {
        type : String
    }
})

var Peoples = mongoose.model('People', People);
module.exports = Peoples;