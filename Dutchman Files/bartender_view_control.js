// Function to toggle between customer/employed
function toggleLogin(buttonID) {
    var employee = document.getElementById("employee_view");
    var customer = document.getElementById("customer_view");

    if (buttonID === "employee_login") {
        employee.style.display = "block";
        customer.style.display = "none";
    }
    else if (buttonID === "customer_login") {
        employee.style.display = "none";
        customer.style.display = "block";
    }

}

// Function to toggle between order, inventory and VIP view
function toggleView(buttonID) {

    if (buttonID === "ordButton") {
        $(".order").show();
        $(".inventory").hide();
        $(".VIP").hide();
    }
    else if (buttonID === "invButton") {
        $(".order").hide();
        $(".inventory").show();
        $(".VIP").hide();
    }
    else if (buttonID === "VIPButton") {
        $(".order").hide();
        $(".inventory").hide();
        $(".VIP").show();
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

// Functions which creates a HTML button to mark chosen item in inventory as unavailable (disappears from customer menu)
function createAvailableKey(ID){
    key = document.createElement("div");
    key.classList.add('key', 'refill');
    key.id = ID+"available";
    key.onclick = function() {toggleAvailable(ID)}; //Button toggles availability
    key.innerHTML = dict['unavailable'];
    return key
}

// Functions which creates a HTML button to permanently remove item in inventory (only bartender)
function createRemoveKey(ID){
    key = document.createElement("div");
    key.classList.add('key', 'refill');
    key.id = ID+"remove";
    key.onclick = function() {removeProduct(ID)}; //Button opens remove dialogue
    key.innerHTML = dict['remove'];
    return key
}

// Functions which creates a HTML button to refill item in inventory (only bartender)
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
    // Create buttons and append them to the row
    refillKey = createRefillKey(product['productID']);
    availableKey = createAvailableKey(product['productID']);
    removeKey = createRemoveKey(product['productID']);
    
    elem.appendChild(refillKey);
    elem.appendChild(removeKey);
    elem.appendChild(availableKey);
    return elem
}

// Function which redraws the inventory view using the inventory model
function updateInventoryView(){
    var inventoryList = modelData['products'];
    // Reset content of order view
    $('#inventoryList').html(""); 
    // Draw an element for each item in the product list
    for(i = 0; i < inventoryList.length; i++ ){ 
        var product = createInventoryElement(inventoryList[i]);
        $('#inventoryList').append(product);
        // Toggle view according to availability of product
        let productID = inventoryList[i]['productID'];
        if(inventoryList[i]['available'])
        {
            $('#' + productID ).css('opacity', 0.5);
            $('#' + productID + "available").text(dict['available']);
        }
        else
        {
            $('#' + productID ).css('opacity', 1);
            $('#' + productID + "available").text(dict['unavailable']);
        }

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
    $('#billList').html("");
    var num =0;
    for(i = 0;i<DB_order_example.length;i++){     
        if (DB_order_example[i].tableNr == tableNr && DB_order_example[i].paid === false){
            //console.log(DB_order_example[i]);
            num += DB_order_example[i].amount;
            var tmp =  DB_order_example[i]["suborder"];
            for(j in tmp){
                //console.log(tmp[j]);
                var list_tmp = tmp[j];
                for(k in list_tmp){ 
                 var iid = list_tmp[k][0];
                 var q = list_tmp[k][1];
                 //console.log(iid,q);
                 let product = createElement(iid,q);
                  $('#payList').append(product);  
                } 
            }
           break;
        }
    } 
    //$('#orderPayment').text(num);
    $('#payList').append("Total price: " + num);
    $('#split_bill').show();
    $('#split_bill').click(function(){
      $('#billList').html("");
      for(i = 0;i<DB_order_example.length;i++){
        //console.log(DB_order_example[1].tableNr);
        if (DB_order_example[i].tableNr == tableNr && DB_order_example[i].paid === false){
            console.log("in");
            var tmp =  DB_order_example[i]["subpay"];
            for(j = 0; j < tmp.length; j++ ){
                elem = document.createElement("div");
                elem.classList.add('key');
                var t ='';
                var w = j+1;
                elem.id = j;
                elem.onclick = function() {};
                elem.innerHTML = "number "+w+"  price: "+ tmp[j] + "\r";
                $('#billList').append(elem);
            }
            //console.log(txt);
            break;
        }
        
      }});

    $('#group_bill').show();
    $('#group_bill').click(function(){
        var n=0;
        $('#billList').html("");
        for(i = 0;i<DB_order_example.length;i++){     
            if (DB_order_example[i].tableNr == tableNr && DB_order_example[i].paid === false){
                var tmp =  DB_order_example[i].amount;
                n = tmp;
                elem = document.createElement("div");
                elem.classList.add('key');
                var w = j+1;
                elem.id = i;
                elem.onclick = function() {};
                elem.innerHTML = "Total price: "+ tmp + "\r";
                $('#billList').append(elem);
                break;
            }
           
        }
        elem = document.createElement("div");
        elem.classList.add('key', 'inv');
        elem.id = tableNr;
        elem.innerHTML = "Discount";
        elem.onclick = function() {
            n = n*0.8;
            elem.innerHTML = "Total price: "+ n + "\r";
        };
        $('#billList').append(elem);

    })

}



// Dummy function for ordering refill of inventory in right column
function refillProduct(ID){
    console.log(ID);
}
// Function which toggles the availability of item
function toggleAvailable(ID){
    // Toggle tha availability in the database
    var item = modelData['products'].find(function(item) {
        return item['productID'] === ID;
    });
    if(item['available'])
    {
        item['available'] = false;
    }
    else
    {
        item['available'] = true;
    }
    updateInventoryView(); // Update the view from new database state  
}

// Functions which opens the remove item dialogue
function removeProduct(ID){
    toggleWindow('remove_popup');
    let window = $("#remove_popup");
    window.data("itemID", ID);
    var item = modelData['products'].find(function(item) {
        return item['productID'] === ID;
    });
    text = dict['remove_text_1'] + item['productName'] +"? <br>" + dict['remove_text_2'];
    $("#remove_item_text").html(text)
}

// Function which affirms permanent removal of item
function removePermanently(){
    // Fetch ID and remove corresponding item from database
    let ID =  $("#remove_popup").data("itemID");
    var item = modelData['products'].find(function(item) {
        return item['productID'] === ID;
    });
    i = modelData['products'].indexOf(item);
    modelData['products'].splice(i, 1);
    //Update the view from new database state
    toggleWindow('remove_popup');
    updateInventoryView()
}

// Function to create input field for text
function createTextInput(attribute, containerID){
    // Create label with attribute
    label = document.createElement("label");
    label.setAttribute('for', attribute);
    label.innerHTML = attribute;
    // Create text input for attribute
    inputBox = document.createElement("input");
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('name', attribute);
    inputBox.id = attribute;

    $("#" + containerID).append(label);
    $("#" + containerID).append("<br>");
    $("#" + containerID).append(inputBox);
    $("#" + containerID).append("<br>");
}

// Function to create a form of attributes
function createForm(attributeList, containerID){
    for(i=0; i<attributeList.length; i++){
        createTextInput(attributeList[i], containerID)
    }
}

// Function to add a new item to the database and then update the view
function addItem(){
    // Change model
    let newProduct = {};
    for(i=0; i < modelData['productAttributes'].length; i++){
        // Fetch property from corresponding input field
        let attribute = modelData['productAttributes'][i];
        let input = $('#' + attribute).val();
        if(input != ""){
            newProduct[attribute] = input; 
        }
        //If some field is empty, nothing happens
        else
        {
            return
        }
        
        //TODO Check for unique ID
    }
    newProduct["available"] = true;
    modelData['products'].push(newProduct);

    updateInventoryView(); // Change view from model
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
//Function to open security dialogue
function openSecurity(){
    toggleWindow("security_popup");
    $('#security_text').text(dict['security_text_1']);
    $('#security_yes').show();
    $('#security_no').show();

}
// Function to call security
function callSecurity(){
    $('#security_text').text(dict['security_text_2']);
    $('#security_yes').hide();
    $('#security_no').hide();
}
// Function to open pop-up window ()
function toggleWindow(ID){
    let window = $("#"+ ID);
    if(window.css('opacity') < 1)
    {
        window.css('opacity', 1);
        window.css('z-index', 1);
    }
    else{
        window.css('opacity', 0);
        window.css('z-index', -1);
    }  
}

// Function to exit pop-up window
function exitWindow(ID){
    let window = $('#' + ID).parent();
    window.css('opacity', 0);
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
    $('#employee_view').hide();
    $('#invMenu').hide();
    $('#VIPMenu').hide();
    $("#ordButton").text(dict['ord']);
    $("#invButton").text(dict['inv']);
    $("#VIPButton").text(dict['vip']);
    $("#security").text(dict['security']);
    $('#security_text').text(dict['security_text_1']);

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
    $("#add_item_text").text(dict['add_item_text']);

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

    createForm(modelData['productAttributes'], "input_form");
    updateOrderView();
    updateInventoryView();
    updateVIPView();
    
});