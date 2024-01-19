//Mongo DB Operators-> Powerful

//Logical Operators

//$inc -> increment operators they are...There is nothing called decrement operator in MongoDB,in order to make decrement operations we do -1,-2,-3 to the $inc operator

//$min -> Finding the minimum
//$max -> Finding the maximum

//$set -> Used to set the data-> book.title = "xyz" //Just like setting the values and properties of a variable
//$unset -> To unset a property of something  of an object just like in the above one we unset the title property of the title

//Similarly we have $unset->used for removing a property form an object

//Array operators
// name = {"Souvik", "xyzzz"}

//$push -> used to insert an element to the end of an array

//$pop -> used to extract some element from the end of an array 

//$pull -> used to fetch some element from certain position from an array
//Just like pull : { name : "xyzzz"}

//difference between pull and pop is that  pull can fetch the element from any postion of an array and store it anywhere but pop can only extract the last element from an array

//$addToSet -> it is same as push but it does not allow duplicacy of elements inside an array




