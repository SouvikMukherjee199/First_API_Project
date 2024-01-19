//We  need to cover the following topics as 

const { books } = require("./database")

//For bookks the following properties a typical book may have
//isbn, num page, pub Date , pulication, author[], category[], titile


//For Authors , we have the following properties available
//id,title,book[]

//For Publication, we have the following properties available
//id,title,book[]

//We have to design an API and code on it
//1.Books
//We need an API to 
//To get all the books//DONE
//To get Specific Book//DONE
//To get a list of books based on Category//DONE
//To get a list of books based on Language//DONE

//2.Authors
//To get all the books
//To get a Specific author
//To get a list of authors based on books(/language/category)

//3.Publications
//To get all the publications 
//To get a Specific publication
//To get a list of publications based on books(/language/category)


//POST REQUEST
//To add a New Book--->Done
//To add a New Publication
//To add a New Author

//GET REQUEST


//PUT REQUEST
/**********Update the book details if the author is changed*************/

//DELETE REQUEST
// 1.Delete a book-->Done
// 2.Delete an author from a book-->UR Task
// 3.Delete an author from a book and a book from an author-->This is where we would be using multiple parameters
