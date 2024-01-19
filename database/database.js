const books = [
{
ISBN: "12345Book",
title: "Tesla!!!",
pubDate: "2021-08-05",
language: "en",
numPage: 250,
author: [1,2],
publications:[1],
category: ["tech","space","education"]

}


]

const author = [

    {
        id:1,
        name: "Aradhana",
        books:["12345Book", "secretBook"]
    },

    {
        id:2,
        name:"Elon Musk",
        books:["12345Book"]
    }
]

const publications=[
    {
id: 1,
name:"PenguinBooks",
books: ["12345Book"]
    },

    {  id:2,
       name:"PenguinBooks2",
       books:[]

    }
]

module.exports = {books, author, publications}
//In Node.js, module.exports exposes values or objects from a module so that they can be used by other modules.module.exports is part of the CommonJS specification. It defines the object that is created when a file is imported using require(). This gives developers control over which parts of a file can be accessed externally.