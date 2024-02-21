// Function to toggle between order, inventory and VIP view
function toggleView(buttonID) {
    var orders = document.getElementById("ordMenu");
    var inventory = document.getElementById("invMenu");
    var VIP = document.getElementById("VIPMenu");

    if (buttonID === "ordButton") {
        orders.style.display = "flex";
        inventory.style.display = "none";
        VIP.style.display = "none";
    }
    else if (buttonID === "invButton") {
        orders.style.display = "none";
        inventory.style.display = "flex";
        VIP.style.display = "none";
    }
    else if (buttonID === "VIPButton") {
        orders.style.display = "none";
        inventory.style.display = "none";
        VIP.style.display = "flex";
    }
}


// Function which creates a HTML element for an order
function createOrderElement(order){
    elem = document.createElement("div");
    elem.classList.add('key', 'ord');
    elem.id = order["orderID"];
    elem.onclick = function() {showOrder(order["tableNr"])};
    elem.innerHTML = dict['ordID'] + order["orderID"] + dict['tableNr'] + order["tableNr"];
    return elem
}

// Function which redraws the order view using the order model
function updateOrderView(){
    var orderList = modelData['orders'];
    // Reset content of order view
    $('#orderList').html(""); 
    // Draw an order element for each order in the list
    for(i = 0; i < orderList.length; i++ ){ 
        var order = createOrderElement(orderList[i]);
        $('#orderList').append(order);

    }
}

// Functions which creates a HTML button to refill chosen item in inventory
function createRefillKey(ID){
    key = document.createElement("div");
    key.classList.add('key', 'refill');
    key.id = ID+"refill";
    key.onclick = function() {refillProduct(ID)}; //Button sends the ID of the corresponding item
    key.innerHTML = dict['refill'];
    return key
}

// Function which creates a HTML element for an inventory item
function createInventoryElement(product){
    elem = document.createElement("div");
    elem.classList.add('key', 'inv');
    elem.id = product['productID'];
    elem.innerHTML = dict['productName'] + product['productName'] + dict['price'] + product["price"] + dict['stock'] + product["stock"];
    // Create button to refill and append it to the row
    refillKey = createRefillKey(product['productID']);
    elem.appendChild(refillKey);
    return elem
}

// Function which redraws the inventory view using the inventory model
function updateInventoryView(){
    var inventoryList = modelData['products'];
    // Reset content of order view
    $('#inventoryList').html(""); 
    // Draw an order element for each order in the list
    for(i = 0; i < inventoryList.length; i++ ){ 
        var product = createInventoryElement(inventoryList[i]);
        $('#inventoryList').append(product);

    }
}

// Function which creates a HTML element for a VIP user
function createUserElement(user){
    elem = document.createElement("div");
    elem.classList.add('key', 'cust');
    elem.id = user["user_id"];
    elem.innerHTML = dict['user_id'] + user["user_id"] +", " + dict['user_name'] + user["first_name"] + " " + user["last_name"];
    elem.onclick = function() {showUser(user["user_id"])};
    return elem;
}

// Function which redraws the VIP view from the user database
function updateVIPView(){
    var userList = getAllUsers();
    // Reset content of order view
    $('#userList').html(""); 
    // Draw a user element for each order in the list
    for(i = 0; i < userList.length; i++ ){ 
        var user = createUserElement(userList[i]);
        $('#userList').append(user);

    }
}

// Get the name and ammount of product in order
function createElement(productID, quantity){
    elem = document.createElement("div");
    elem.classList.add('key');
    var name;
    elem.onclick = function() {};
    for( i=0;i<modelData['products'].length;i++){
       if( modelData['products'][i]['productID']==productID){
           name = modelData['products'][i]['productName'];
       }
    }
    elem.id = name;
    elem.innerHTML = name+ " : " + quantity;
    //elem = name+ " : " + num+"\n";
    return elem
}

// Function for showing order in right column
function showOrder(tableNr){
    //$('#orderPayment').html("");
    $('#payList').html(""); 
    var num =0;

    for(i = 0;i<DB_order_example.length;i++){     
        if (DB_order_example[i].tableNr === tableNr && DB_order_example[i].paid === false){
            //console.log(DB_order_example[i]);
            num += DB_order_example[i].amount;
            // console.log(DB_order_example[i]["quantities"][0]);
            for(j = 0; j < DB_order_example[i]["order"].length; j++ ){
               let iid = DB_order_example[i]["order"][j];
               let q = DB_order_example[i]["quantities"][j];
               let product = createElement(iid,q);
               $('#payList').append(product);
            }
           
        }
    } 
    //$('#orderPayment').text(num);
    $('#payList').append("Total price: " + num);
    $('#split_bill').show();
    $('#group_bill').show();

}


// Dummy function for ordering refill of inventory in right column
function refillProduct(ID){
    console.log(ID);
}
//Function to show the selected user in the model
function showUser(ID){
    user = getUser(ID)
    $('#credit_text').html("");
    text = dict['user_id'] + user["user_id"] + "<br>" + dict['user_name'] + user["first_name"] + " " + user["last_name"] + "<br>" + dict['current_credits'] + currentCredits(ID);
    $('#credit_text').html(text);
    $('#creditButton').show();
    $('#creditsToAdd').show();
    $('label[for="creditsToAdd"]').show();
    $('#creditButton').data("customerID", ID);
    $('#creditButton').data("credits", "1"); 
}
// Function to update the credits in the database and then update the view
function addCredits(){
    let ID = $('#creditButton').data("customerID");
    let credits = $('#creditsToAdd').val();
    console.log(credits);
    // Check for valid input
    if(credits != ""){
        increaseCredits(ID, credits); // Change model
        showUser(ID); // Change view from model
        $('#creditsToAdd').val("");
    }  
}
// Function to open pop-up window ()
function toggleWindow(ID){
    let window = $("#"+ ID + "_popup");
    if(window.css('z-index') < 0)
    {
        window.css('z-index', 1);
    }
    else{
        window.css('z-index', -1);
    }
    
}

// Function to exit pop-up window
function exitWindow(ID){
    let window = $('#' + ID).parent();
    window.css('z-index', -1);
}


// Function handler (why?)
function doInit(fun) {
    if (fun == 'fun1') {
        toggleView();
    };
    if (fun == 'fun2') {
        
    };
    if (fun == 'fun3') {
        showOrder();
    };
    if (fun == 'fun4') {

        refillProduct();
    };
    if (fun == 'fun51') {
        a = $("#argument").text(); // Get the argument
        b = modelData['result'];  // Get the current result value
        doit(addfun(a,b));
    };
}

$(document).ready(function () {
    $('#invMenu').hide();
    $('#VIPMenu').hide();
    $("#ordButton").text(dict['ord']);
    $("#invButton").text(dict['inv']);
    $("#VIPButton").text(dict['vip']);
    $("#security").text(dict['security']);

    $("#ord_title").text(dict['ord']);
    $("#ord_text").text(dict['ord_text']);
    $("#pay_title").text(dict['pay']);
    $("#pay_text").text(dict['pay_text']);
    $("#split_bill").text(dict['split_bill']);
    $("#group_bill").text(dict['group_bill']);
    $('#split_bill').hide();
    $('#group_bill').hide();

    $("#inv_title").text(dict['inv']);
    $("#inv_text").text(dict['inv_text']);
    $("#add_inv").text(dict['add_inv']);
    $("#refill_title").text(dict['refill']);
    $("#refill_text").text(dict['refill_text']);

    $("#VIP_title").text(dict['vip']);
    $("#VIP_text").text(dict['vip_text']);
    $("#add_VIP").text(dict['add_vip']);
    $("#credit_title").text(dict['credit']);
    $("#credit_text").text(dict['credit_text']);
    $("#creditButton").text(dict['credit_button']);
    $('#creditButton').hide();
    $('#creditsToAdd').hide();
    $('label[for="creditsToAdd"]').hide();

    $("#logout").text(dict['logout']);
    updateOrderView();
    updateInventoryView();
    updateVIPView();
    
});