// Frame work
const express = require("express");

const database = require("./database/index")
// initialize
const shapeAI = express();


// configuring 
shapeAI.use(express.json());
/*
Route         /
Description   get all books
Access        public
Parameters    none
Method        get
*/
shapeAI.get("/",(req,res) => {
   return res.json({books:database.books});
});
/*
Route         /is
Description   get specific  books based on ISBN
Access        public
Parameters    isbn
Method        get
*/
shapeAI.get("/is/:isbn",(req,res) => {
 const getSpecificBook = database.books.filter(
     (book) => book.ISBN === req.params.isbn
 );
 if(getSpecificBook.length ==0){
     return res.json({
         error:`No Book found for the ISBN of ${req.params.isbn}`,
     });
 }
 return res.json({book: getSpecificBook});
});

/*
Route         /
Description   get specific  books based on ISBN
Access        public
Parameters    isbn
Method        get
*/
shapeAI.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category) 
    );
    if(getSpecificBook.length ==0){
        return res.json({
            error:`No Book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBook});
   });
/*
Route         /a
Description   get authors
Access        public
Parameters    none
Method        get
*/
shapeAI.get("/a",(req,res) => {
    return res.json({authors:database.authors});
 });
/*
Route         /author
Description   get authors based on isbn
Access        public
Parameters    isbn
Method        get
*/
shapeAI.get("/author/:isbn",(req,res) => {
    const getSpecificBook = database.authors.filter(
        (autho) => author.books.includes(req.params.isbn) 
    );
    if(getSpecificBook.length ==0){
        return res.json({
            error:`No Author found for the books of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
 });


/*
Route         /publications
Description   get publications 
Access        public
Parameters    none
Method        get
*/
shapeAI.get("/publications",(req,res) => {
    return res.json({publications:database.publications});
 });
shapeAI.listen(3000, () => console.log("Server get started..."));