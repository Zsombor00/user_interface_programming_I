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
modelData['productAttributes'] = ['productID', 'productName', 'price', 'stock']

// Example of orders

var DB_orders = [
    {
        "order_id": 9999,
        "bartender_id": "B00000",
        "customer_id": "C00001",
        "order":[],
        "quantities":[],
        "amount": 2153,
        'tableNr' : 7,
        "timestamp": "2023-11-10 19:04:13",
        "suborder":[[{"Braastad XO":[442.00, 2], "Vanlig Vodka":[195.00, 1]}, 1079], [{"Dworek Vodka":[190.00, 1]}, 190], [{"Braastad XO":[442.00, 2]}, 884]],
        "subpay":[1079,190,884],
        "paid":true
    },
    {
        "order_id": 10000,
        "bartender_id": "B00000",
        "customer_id": "C00001",
        "order":[],
        "quantities":[],
        "amount": 2153,
        'tableNr' : 7,
        "timestamp": "2023-11-10 19:04:13",
        "suborder":[[{"Braastad XO":[442.00, 2], "Vanlig Vodka":[195.00, 1]}, 1079], [{"Dworek Vodka":[190.00, 1]}, 190], [{"Braastad XO":[442.00, 2]}, 884]],
        "subpay":[1079,190,884],
        "paid":false
    },
    {
        "order_id": 10001,
        "bartender_id": "B00000",
        "customer_id": "C00002",
        "order":[],
        "quantities":[],
        "amount": 1079,
        'tableNr' : 5,
        "timestamp": "2023-11-10 19:36:43",
        "suborder":[[{"Braastad XO":[442.00, 2], "Vanlig Vodka":[195.00, 1]}, 1079]],
        "subpay":[1079],
        "paid":false
    }
   
]

modelData['orders'] = DB_orders;




// The model in this version can then easily be transferred into the Local
// or Session storage. The only problem is that local storage does not store
// other data types than strings, so there is a need for conversion back to
// other data types upon retrieving the data from the storage.
//
// ===========================================================================
// END OF FILE
// ===========================================================================