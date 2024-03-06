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
    'vip': "VIP customers",
    'security' : 'Security',
    'logout': "Log out",

    'ord_text': "",
    'ordID' : 'Order ID: ',
    'tableNr' : ', Table number: ',
    'pay': 'Pay selected order',
    'pay_text': '',
    'split_bill': 'Split bill',
    'group_bill': 'Group bill',

    'inv_text': "",
    'inv_low': "These items are low in stock, consider refill:",
    'inv_norm': "These items are high in stock:",
    'refill': 'Refill',
    'unavailable': 'Mark as unavailable',
    'available': 'Mark as available',
    'remove': 'Remove permanently',
    'refill_text': 'List of selected items to refill will be shown here',
    'add_inv' : 'Add new item',
    'productName': "Product name: ",
    'price': ", Product price: ",
    'stock': ", Stock: ",
    'send_refill': "Place order",

    'vip_text': "",
    'add_vip': "Add new VIP",
    'credit': 'User profile',
    'credit_text': '',
    'credit_button': 'Add credits',
    'user_id': "User ID: ",
    'user_name': "User name: ",
    'current_credits': "Current credits: ",

    'remove_text_1': 'Are you sure you want to remove the following item: ',
    'remove_text_2': '(This choice can not be undone)',

    'add_item_text': 'Fill in the form below to add new item',

    'security_text_1': 'Are you sure you want to call sequrity?',
    'security_text_2': 'Security has been called, stay put.'


}

// ===========================================================================
// END OF FILE
// ===========================================================================