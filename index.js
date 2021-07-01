require("dotenv").config();

// Frame work--require() means importing useful library
const express = require("express");
const mongoose = require("mongoose");

//Database
const database = require("./database/index")

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// initialize the app- ShapeAI Application & Express
const shapeAI = express();



mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }) 
.then(()=> console.log("Connection established"));

// configuring 
shapeAI.use(express.json());

/*
Route         /         root 
Description   get all books
Access        public
Parameters    none
Method        get
*/
shapeAI.get("/",async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});
//========================================================
/*
Route         /is
Description   get specific  books based on ISBN
Access        public
Parameters    isbn
Method        get
*/

shapeAI.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn});
    if(!getSpecificBook){
        return res.json({
            error: 'No book found for the ISBN of "${req.params.isbn}',
        });
    }
   //const getAllbooks = await BookModel.find();
   return res.json({books:getSpecificBook});
});
//=================================================================
/*
Route         /c/category
Description   get specific  books based on ISBN
Access        public
Parameters    isbn
Method        get
*/
shapeAI.get("/c/:category",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({
        category: req.params.category,
    });
    
    if(getSpecificBook.length ==0){
        return res.json({
            error:`No Book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBook});
   });
//=================================================================
/*
Route         /a/
Description   get specific  books based on author  --TASK
Access        public
Parameters    isbn-(Books isbn in author's data)
Method        get
*/
shapeAI.get("/a/:authorid",(req,res) => {
    const getSpecificBook = database.authors.filter(
        (author) => author.books.includes(req.params.authorid)
    );
    if(getSpecificBook.length ==0){
        return res.json({
            error:`No Author found for the Book of ${req.params.authorid}`,
        });
    }
    return res.json({book: getSpecificBook});
   });
//===================================================================
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

 //===============================================================
/*
Route         /author/
Description   get authors based on isbn
Access        public
Parameters    isbn
Method        get
*/
shapeAI.get("/author/:isbn",(req,res) => {
    const getSpecificBook = database.authors.filter(
        (author) => author.books.includes(req.params.isbn) 
    );
    if(getSpecificBook.length ==0){
        return res.json({
            error:`No Author found for the books of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
 });
//========================================================

/*
Route         /publications
Description   get all publications 
Access        public
Parameters    none
Method        get
*/
shapeAI.get("/publications",(req,res) => {
    return res.json({publications:database.publications});
 });
//===============================================================
/*
Route         /book/new
Description   add new book
Access        public
Parameters    NONE
Method        POST
request----Body
*/

shapeAI.post("/book/new",async (req,res) =>{
    const {newBook} =  req.body;
    BookModel.create(newBook);
    return res.json({message:"Book is added"});
});

//===========================================================
/*
Route         /author/new
Description   add new author
Access        public
Parameters    NONE
Method        POST
request----Body
*/
shapeAI.post("/author/new",async (req,res) =>{
    const {newAuthor} =  req.body;
    AuthorModel.create(newAuthor);
    return res.json({message:"Author is added"});
});

//========================================================================

/*
Route         /publication/new
Description   add new publication
Access        public
Parameters    NONE
Method        POST
request----Body
*/
shapeAI.post("/publication/new",(req,res) =>{
    const {newPublication} =  req.body;
    PublicationsModel.create(newPublication);
    return res.json({publications:database.publications,message:"Publisher is added"});
});
//================================================
/*
Route         /book/update
Description   update title of a book
Access        public
Parameters    isbn
Method        PUT

*/
shapeAI.put("/book/update/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
        if (book.ISBN == req.params.isbn){
            book.title = req.body.bookTitle;
            return;
        }
        
    });
    return res.json({books:database.books});
});
//=============================================================

/*
Route         /book/author/update/:isbn
Description   update author of books api
Access        public
Parameters    isbn
Method        PUT

*/


shapeAI.put("/book/author/update/:isbn", (req,res)=>{
   //update the books database
    database.books.forEach((book)=>{
        if(book.ISBN == req.params.isbn){
            return book.authors.push(req.body.newAuthor);
        }
    });
   // update the author database
   database.authors.forEach((author) =>{
     if(author.id == req.newAuthor)
         return author.books.push(req.params.isbn);
   });
   return res.json({
       books:database.books,
       authors:database.authors,
       message:"New Author added in Books",
    });
});
//==================================================================
/*
Route         /author/update/:id
Description   update author based on id
Access        public
Parameters    id
Method        PUT
*/
shapeAI.put("/author/update/:aid",(req,res)=>{
    database.authors.forEach((author)=>{
        if (author.id == req.params.aid){
            author.name = req.body.authorName;
            return;
        }
        
    });
    return res.json({authors:database.authors});
});
//===================================================================
/*

Route         /publication/update/book
Description   update/add new book to a publication
Access        public
Parameters    isbn
Method        PUT
*/

shapeAI.put("/publication/update/book/:isbn",(req,res)=>{
   // update the publication database
   database.publications.forEach((publication)=>{
        if(publication.id == req.body.pubid){
            return publication.books.push(req.params.isbn);
        }
   });
   database.books.forEach((book)=>{
       if(book.ISBN== req.params.isbn){
           book.publication=req.body.pubid;
       }
   });
   return res.json({
    books:database.books,
    publications:database.publications,
    message:"Successfully updated Publication",
   });
});
//=================================================
/*
Route         /book/delete
Description   delete book
Access        public
Parameters    isbn
Method        PUT

*/
shapeAI.delete("/book/delete/:isbn",(req,res)=>{
   //make new copy of database , use filter to filter the 
   // replace the whole database
   const updatedBookDatabae = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
   );
   database.books = updatedBookDatabae;
   return res.json({books:database.books});
   //edit at single point directly to master database

});
//===================================================================

/*
Route         /book/delete
Description   delete book
Access        public
Parameters    isbn
Method        delete
*/
shapeAI.delete("/book/delete/author/:isbn/:authorID",(req,res)=>{
 database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        const newAuthorList = book.authors.filter(
            (author)=> author !==parseInt(req.params.authorID)
        );
        book.authors = newAuthorList;
        return;
    }
 });
//update the author database
   database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorID)){
        const newBookList = author.books.filter(
            (book) => book !== req.params.isbn
        );
        author.books = newBookList;
        return;
    }


   });

});
//======================================================================
// Delete book from publication 
/*
Route         /publication/delete/book
Description   delete book
Access        public
Parameters    isbn, publicationID
Method        Delete
*/
shapeAI.delete("/publication/delete/book",(req,res)=>{
    //update publication database
    database.publications.forEach((publication)=>{
        if(publication.id === parseInt(req.params.pubID)){
            const newBookList = publication.books.filter(
              (book) => book !==req.params.isbn  
            );
            publication.books = newBookList;
            return;
        }
    });
    //update  books database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });
    return res.json({
        books:database.books,
        publications:database.publications,
        message:"Publication books record is Deleted"

    });
});


shapeAI.listen(3000, () => console.log("Server get started..."));

// talk to mongodb in which understands =>
// talk to us in the way we understand => javascript

//mongoose