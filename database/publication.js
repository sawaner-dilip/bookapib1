const mongoose = require("mongoose");

// Create Author schema 

const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});
//Crate Model
const PublicationModel= mongoose.model("publications",PublicationSchema);
module.exports = PublicationModel;