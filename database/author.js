const mongoose = require("mongoose");

//Create author schema
const AuthorSchema = mongoose.Schema(
{
id: Number,
Name:String,
books:[String]

}
);
const AuthorModel = mongoose.model("authors",AuthorSchema);
module.exports = AuthorModel;
