// ===========================================================================
// In this file we define two structures that will contain the constants,
// as well as the Strings that will be used in the program. It is considered
// good programming hygiene to remove constant values and Strings from the
// actual code. This renders the code easier to read and also easier to modify
// when needed.
//
// ===========================================================================
// The cnst structure will store all kinds of values that will not be modified
// during the running of the program.
//
const cnst = {

}

// THe dict structure will contain all strings that will be used in the program
// and the strings can easily be inserted at runtime through calls to the dict
// with the correct key.
//
const dict = {
    'ord': "Orders",
    'inv': "Inventory",
    'ord_text': "Orders added here (click to handle payment)",
    'inv_text': "Inventory items added here (The same as menu, but with inventory and order option for bartender)",
    'logout': "Log out",
    'ordID' : 'Order ID: ',
    'tableNr' : ', Table number: ',
    'security' : 'Security',
    'pay': 'Pay selected order',
    'pay_text': 'Show the details of selected order and payment options here',
    'refill': 'Refill',
    'refill_text': 'List of selected items to refill will be shown here',
    'productName': "Product name: ",
    'price': ", Product price: ",
    'stock': ", Stock: "


}

// ===========================================================================
// END OF FILE
// ===========================================================================
