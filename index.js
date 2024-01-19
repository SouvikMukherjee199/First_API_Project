require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

var bodyParser = require("body-parser");//storing an instance of body-parser inside a variable called body-parser,allows express to read the body and parse it into a json format file

const database=require('./database/database');
//Models

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel=require("./database/publication");

const booky= express();

booky.use(bodyParser.urlencoded({extended: true}));//Precises that the url that we would be requesting  may contain anything i.e, strings or something else
booky.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL,
{
//mentioning all the fields to be used for the project oriented to mongoose




}

).then(() => console.log("Connection Established"));



/*
Route                 /
Description          Get all the books
Access               PUBLIC
Parameter            NONE
Methods              GET 

*/
booky.get("/",async function (req, res) {
        const getAllBooks = await BookModel.find();
        // return res.json({books: database.books});
        return res.json(getAllBooks);
    }
);

/*
Route                 /
Description          Get a specific book based on ISBN
Access               PUBLIC
Parameter            isbn
Methods              GET 

*/

// booky.get("/is/:isbn", (req,res) =>{
// const getSpecificBook = database.books.filter(
//     (book) => book.ISBN === req.params.isbn //The params object can be used to access the values of the parameters, as well as the number of parameters that were passed to the function,i.e, here the function is the arrow function
// );
// if(getSpecificBook.length === 0)
// {
//     return res.json({ error: `No book found for  the ISBN of ${req.params.isbn}`});
// }

// return res.json({book: getSpecificBook});
// })

booky.get("/is/:isbn", async (req,res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    //null !0=1 ,  !1=0

     if(!getSpecificBook){

      return res.json({error : `No book found for the ISBN of ${req.params.isbn}`});
     
     }

     return res.json({book: getSpecificBook});



     }   
    )




/*
Route             /c
Method           get
parameter        category
Access           Public
*/
// booky.get("/c/:category",(req,res) =>{
//     const getSpecificBook = database.books.filter(
//         (book) => book.category.includes(req.params.category))

//         if(getSpecificBook.length===0)
//         {
//             return res.json({error: `No book found for the category of ${req.params.category} `})
//         }
        
//         return res.json({book: getSpecificBook});
// });

booky.get("/c/:category", async (req,res) =>//Never forget to put the colon before category to make it keep varying through the code 
{ const getSpecificBook = await  BookModel.findOne({category: req.params.category});
  
//   !null=1, !0=1, !1=0
if(!getSpecificBook)
{
    return res.json({error:`No book found for the category of ${req.params.category}`});
}

return res.json(getSpecificBook);






})

// Route       /lang
// Method       get
// parameter    language
// Access       Public

booky.get("/lang/:language" , (req,res) => {
    const getSpecificBook = database.books.filter(
        (book)=> book.language.includes(req.params.language))
        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book found for the category of ${req.params.language}`})
        }
        return res.json({book: getSpecificBook}); 
        }
    );
    
// Route         /author
//Description   get all the authors
// Method       get
// parameter    None
// Access       Public
//The ISBN is used as a parameter in JavaScript to identify a book. This is useful for tasks such as searching for a book in a database or adding a book to a cart. The ISBN can be passed to a JavaScript function as a string.

booky.get("/author",async (req,res)=>{
    const getAllAuthors = await AuthorModel.find(); 
    return res.json(getAllAuthors);
}
)


//Description       get a list of all the authors based on books
//Method            get
//Access            Public
//parameter         None


booky.get("/author/book/:isbn",(req,res)=>
{
    const getSpecificAuthor = database.author.filter(
        (author)=> author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0)
    {
        return res.json(
            {
                error: `No author found for the book of ${req.params.isbn}`
            }

        );
    }
    return res.json({The_authors_are: getSpecificAuthor});
})


/*
Route         /publications
Description   Get all publications
Access        PUBLIC
Parameter     None
Methods       GET
*/
booky.get("/publications", async (req,res)=>
{   const getALLPublications = await AuthorModel.find();

    return res.json(getALLPublications);
})

//POST

/*
Route         /book/new
Description   Add new books
Access        PUBLIC
Parameter     None
Methods       POST
*/
// booky.post("/book/new",(req,res)=>
// {
//   const newBook = req.body;
//   database.books.push(newBook);
//   return res.json({updatedBooks: database.books})

// });

booky.post("/book/new",async (req,res)=>
{
  const { newBook } = req.body; 
  const addNewBook = BookModel.create(newBook);
  return res.json(
{
  books: addNewBook,
  message : "Book was added!!!"
}
);
});


/*
Route         /author/new
Description   Add new authors
Access        PUBLIC
Parameter     None
Methods       POST
*/

// booky.post("/author/new",(req,res)=>
//  { const newAuthor = req.body;
//   database.author.push(newAuthor);
//   return res.json({updatedBooks: database.author })
//  }
// )

booky.post("/author/new",(req,res)=>
 { const {newAuthor} = req.body; //destructuring
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    author: addNewAuthor,
    message: "Author was added!!!"
  });
 }
)

/*
Route         /publication/new
Description   Add new publications
Access        PUBLIC
Parameter     None
Methods       POST
*/

booky.post("/publication/new",(req,res)=>
{
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json({updatedBooks: database.publications})
}
)

/************PUT*************/
/*
Route           /book/update
Description     Update book on isbn
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/:isbn",async (req,res)=>
{
const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN: req.params.isbn
    },
    {
        title: req.body.bookTitle
    },
    {
        new: true
    }
   );
   
   return res.json({
    books: updatedBook

   });
}
);

/****UPDATING NEW AUTHOR**********/
/*
Route       /book/author/update
Description update/add new author
Access      PUBLIC
Parameter   isbn
Methods     PUT
*/

booky.put("/book/author/update/:isbn", async(req,res)=>
{
    //update the book database
    
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
     },
     {
       $addToSet: {
        authors: req.body.newAuthor //we use addToSet for adding the author name as every author has a unique name
       }
    },
       {
        new: true
       }
    
    );

      
    //update the author database

   const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: req.body.newAuthor
    },
    {
        $addToSet : {
            books: req.params.isbn //we use the $addToSet operator to update the books database for every author as we don't want any book to be repeatedly pushed to the database  
        }
    },
    {
        new:true
    }

   );
 
  return res.json({
    book : updatedBook,
    authors : updatedAuthor,
    message :  "New author was added"


  });

}

);


booky.put("/publication/update/book/:isbn",(req,res)=>
  { //Update the publication database

    database.publications.forEach((pub)=>
    {
     if(pub.id === req.body.pubId)
     {
     return pub.books.push(req.params.isbn);
     }

     //Update the book database

     database.books.forEach((book)=>
     {
        if(book.ISBN===req.params.isbn){
            book.publications = req.body.pubId;
            return;
        }
     });
   
    return res.json(
        {
        books : database.books,
        publications: database.publications,
        message : "Successfully updated publications"

        }
    ) 

    }
    )


  }
)

/*Delete*/
/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/



//Delete a book from database
booky.delete("/book/delete/:isbn",async(req,res)=>
{
//whichever book does not match the isbn, just send it to the upadtedBookDatabase array
//and rest will be filtered out
const updatedBookDatabase = await BookModel.findOneAndDelete(
{
    ISBN: req.params.isbn
}
);

return res.json(
    {
        books: updatedBookDatabase
    }
);

// const updatedBookDatabase = database.books.filter(
//     (book) => book.ISBN !== req.params.isbn
   
    

//     )

//     database.books = updatedBookDatabase;
//     return res.json({books : database.books})
}
)

//Delete an author from the database
/*Delete*/
/*
Route           /author/delete
Description     Delete an author
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
//Delete a book from database
// 
//Delete an author from a book and a book from an author-->This is where we would be using multiple parameters
booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=>
{
//update the book database
database.books.forEach((book)=>
{
    if(book.ISBN===req.params.isbn){
        const newAuthorList = book.author.filter(

            (eachAuthor)=> eachAuthor !== parseInt(req.params.authorId)//typeconverting the string authorId into an integer for comarison with eachAuthor
        );
        book.author = newAuthorList;
        return;
    }
});

//update the author database
database.author.forEach((eachAuthor)=>
{
if(eachAuthor.id === parseInt(req.params.authorId))
  {const newBookList =eachAuthor.books.filter
(
    (book) => book !== req.params.isbn
)
   eachAuthor.books = newBookList;
   return ;  

}
});
return res.json(
    {
        book: database.books,
        author: database.author,
        message: "Author was deleted!!!!"
    }
);
});


booky.listen(3000,()=>
{
    console.log("Server on port 3000 is up and running");
})