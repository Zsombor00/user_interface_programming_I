// Function to toggle between order and inventory view
function toggleOrdersInventory() {
    var order_middle = document.getElementById("orders");
    var order_right = document.getElementById("orderPayment");
    var inventory_middle = document.getElementById("inventory");
    var inventory_right = document.getElementById("inventoryRefill");
    if (order_middle.style.display === "none") {
        order_middle.style.display = "block";
        order_right.style.display = "block";
        inventory_middle.style.display = "none";
        inventory_right.style.display = "none";
    } 
    else{
        order_middle.style.display = "none";
        order_right.style.display = "none";
        inventory_middle.style.display = "block";
        inventory_right.style.display = "block";
    }
}


// Function which creates a HTML element for an order
function createOrderElement(order){
    elem = document.createElement("div");
    elem.classList.add('key', 'ord');
    elem.id = order["orderID"];
    elem.onclick = function() {doInit('fun3')};
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
    key.onclick = function() {refillProduct(ID)};
    key.innerHTML = dict['refill'];
    return key
}

// Function which creates a HTML element for an inventory item
function createInventoryElement(product){
    elem = document.createElement("div");
    elem.classList.add('key', 'inv');
    elem.id = product['productID'];
    elem.innerHTML = dict['productName'] + product['productName'] + dict['price'] + product["price"] + dict['stock'] + product["stock"];
    // Create button to refill and append to row
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

// Dummy function for showing order in right column
function showOrder(){
    console.log("Show order");
}
// Dummy function for ordering refill of inventory in right column
function refillProduct(ID){
    console.log(ID);
}


// Function handler (why?)
function doInit(fun) {
    if (fun == 'fun1') {
        toggleOrdersInventory();
    };
    if (fun == 'fun2') {
        toggleOrdersInventory();
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
    $('#inventory').hide();
    $('#inventoryRefill').hide();
    $("#fun1").text(dict['ord']);
    $("#fun2").text(dict['inv']);
    $("#fun4").text(dict['security']);
    $("#ord_title").text(dict['ord']);
    $("#ord_text").text(dict['ord_text']);
    $("#inv_title").text(dict['inv']);
    $("#inv_text").text(dict['inv_text']);
    $("#pay_title").text(dict['pay']);
    $("#pay_text").text(dict['pay_text']);
    $("#refill_title").text(dict['refill']);
    $("#refill_text").text(dict['refill_text']);
    $("#logout").text(dict['logout']);
    updateOrderView();
    updateInventoryView();
    
});