const mongoose = require("mongoose");
//Create a book schema

const BookSchema = mongoose.Schema(

// Put the key and type of value pairs

{
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications:[Number],
    category: [String]



}
);

const BookModel  = mongoose.model("books",BookSchema);
module.exports = BookModel;
