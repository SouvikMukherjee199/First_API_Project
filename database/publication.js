const mongoose = require("mongoose");

//Create a publication schema

const PublicationSchema = mongoose.Schema(
{
  id: Number,
  Name:String,
  books:[String]
  

}

) ;

const PublicationModel = mongoose.model("publications", PublicationSchema);
module.exports = PublicationModel;
