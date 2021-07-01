//Importing mongoose
const mongoose = require("mongoose");


// Create book schema
const BookSchema = mongoose.Schema({
    ISBN:String,
    title:String,
    authors: [Number],
    language: String,
    pubDate: String,
    category: [String],

});
// Create a book Model 

const BookModel = mongoose.model("books",BookSchema);
module.exports = BookModel;

