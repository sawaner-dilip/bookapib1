// define different api
const books =[{
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors: [1,2,3],
    language: "en",
    pubDate: "2021-07-07",
    category: ["Fiction","programming","Database"],
},
{
    ISBN:"12345TWO",
    title:"Getting started with Python",
    authors: [1,2,3],
    language: "en",
    pubDate: "2021-07-07",
    category: ["programming","Database"],
},
{
    ISBN:"12345THREE",
    title:"Getting started with Bootstrap",
    authors: [1,2,3],
    language: "en",
    pubDate: "2021-07-07",
    category: ["Web Designing","programming","Database"],
},
];

const authors =[
{
 id:1,
 name:"pavan",
 books:["12345ONE","12345THREE"],
},
{
    id:2,
    name:"Deepak",
    books:["12345TWO","12345ONE"],
},
{
    id:3,
    name:"R.K.Nagar",
    books:["12345TWO","12345THREE"],
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
           books:["12345TWO"],
       },
       {
        id:3,
        name:"R.K.Nagar",
        books:["12345THREE"],
    },

];

module.exports = {books,authors,publications};