// define different api
const books =[{
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors: [1,2,3],
    language: "en",
    pubDate: "2021-07-07",
    category: ["Fiction","programming","Database"],
},
];

const authors =[
{
 id:1,
 name:"pavan",
 books:["12345ONE"],
},
{
    id:2,
    name:"Deepak",
    books:["12345ONE"],
},
];


const publications= [
    {
        id:1,
        name:"pavan",
        books:["12345ONE"],
       },
       {
           id:2,
           name:"Deepak",
           books:["12345ONE"],
       },


];

module.exports = {books,authors,publications};