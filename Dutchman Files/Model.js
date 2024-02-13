// ===========================================================================
// The model of the application. Note that this is not the same thing as
// the dictionary. The model keeps track of the information that is involved
// in the activities in the application, and which, most of them, can change
// overtime.
//
// The data can be stored in the model in many different ways. In this file
// it is stored in simple variables, but for larger programs it is better
// to use a dictionary or other data structure. If we want to save the model,
// it will be tedious to ensure that all the individual variables are saved
// (and restored), whereas a data structure can be saved as a single entity
// in one action. It will also be easier when we use the local storage to
// save data over page refreshes and sessions using Local storage.
//
// ===========================================================================

var modelData = {};

modelData['orders'] = [];
modelData['products'] = [];

// Example of orders
var orderExample1 = {
    'orderID' : 10000,
    'tableNr' : 7,
    'status' : "new", // Order status: New, unpaid or paid(archive)
    'suborders': [] //Container for the whole table with each persons suborder

}
var subOrder1 = [["25053", 2], ["190719", 1]]; // Suborder for each customer at the table (Beverage/food Id, quantity)
var subOrder2 = [["51029", 1]];
var subOrder3 = [["25053", 2]];
orderExample1['suborders'].push(subOrder1, subOrder2, subOrder3);

var orderExample2 = {
    'orderID' : 10001,
    'tableNr' : 5,
    'status' : "new",
    'suborders': [[["25053", 2], ["190719", 1]]]

}

modelData['orders'].push(orderExample1, orderExample2);

// Example of products (This will use the same as menu)
var productExample1 = {
    'productID' : "25053",
    'productName' : "Braastad XO",
    'price' : "442.00",
    'stock': 17
}
var productExample2 = {
    'productID' : "190719",
    'productName' : "Vanlig Vodka",
    'price' : "195.00",
    'stock': 9
}
modelData['products'].push(productExample1, productExample2);


// The model in this version can then easily be transferred into the Local
// or Session storage. The only problem is that local storage does not store
// other data types than strings, so there is a need for conversion back to
// other data types upon retrieving the data from the storage.
//
// ===========================================================================
// END OF FILE
// ===========================================================================






