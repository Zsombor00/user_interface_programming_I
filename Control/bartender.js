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

// ORDER FUNCTIONS //
// Function which creates a HTML element for an order
function createOrderElement(order){
    elem = document.createElement("div");
    elem.classList.add('key', 'ord');
    elem.id = order["orderID"];
    elem.onclick = function() {showOrder(order["tableNr"])};
    elem.innerHTML = dict['ordID'] + order["order_id"] + dict['tableNr'] + order["tableNr"];
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

// Create a bill element with name and ammount of product in order
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
                let n = tmp[j];
                elem.onclick = function() {pay_order(n)};
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
                elem1 = document.createElement("div");
                elem1.classList.add('key');
                var w = j+1;
                elem1.id = i;
                elem1.onclick = function() {pay_order(n)};
                elem1.innerHTML = "Total price: "+ tmp + "\r";
                $('#billList').append(elem1);
                break;
            }
        }

    });


}
function discount_rest() {
    
}
// Function which opens the pay dialogue
function pay_order(n){
    toggleWindow("discount_popup");
    $('#discount_form').html("Total price: "+ n.toFixed(1) + "\r");
    var btn = document.getElementById('submit');
    var k =0;
    btn.addEventListener('click',function() {
        k = document.getElementById("dis_num").value;
        var discount_n = 1-(k*0.01);                         
        var num = n*discount_n;
        $('#discount_form').html("Total price: "+ num.toFixed(1) + "\r");
    });

    var bte = document.getElementById('reset');
    bte.addEventListener('click',function(){
        document.getElementById("dis_num").value='';
        $('#discount_form').html("Total price: "+ n.toFixed(1) + "\r");
    })
}


// INVENTORY FUNCTIONS //

// Dictionary for refill order
var refillOrder ={};
var total_price_refill = 0;
// Function which creates a HTML button to mark chosen item in inventory as unavailable (disappears from customer menu)
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
function createRefillKey(ID, price){
    key = document.createElement("div");
    key.classList.add('key', 'refill');
    key.id = ID+"refill";
    key.onclick = function() {add_refill(ID, price)}; //Button sends the ID of the corresponding item
    key.innerHTML = dict['refill'];
    return key
}

// Function which creates a HTML element for an inventory item
function createInventoryElement(product){
    elem = document.createElement("div");
    elem.classList.add('key', 'inv');
    elem.id = product[ "artikelid"];
    elem.innerHTML = dict['productName'] + product["namn"] + dict['price'] + product["prisinklmoms"] + dict['stock'] + product["stock"];
    // Create buttons and append them to the row
    refillKey = createRefillKey(elem.id, product["prisinklmoms"]);
    availableKey = createAvailableKey(elem.id);
    removeKey = createRemoveKey(elem.id);
    
    elem.appendChild(refillKey);
    elem.appendChild(removeKey);
    elem.appendChild(availableKey);
    // Make the item dragable
    elem.setAttribute('draggable', true);
    elem.setAttribute('ondragstart', `drag(event, '${product["artikelid"]}', '${product["prisinklmoms"]}')`);
    return elem
}

// Function for ordering refill of inventory in right column
function add_refill(ID, price){
    saveState_refill()
    if(typeof refillOrder[ID]!="undefined"){
        refillOrder[ID][1] +=1;}//if this element exists in the order, we increase the count 

    else{
        refillOrder[ID] =[Number(price), 1];} // Else, create element in order
    total_price_refill+=Number(price)
    updateRefillOrder();
}

// Function for removing refill of inventory in right column
function remove_refill(ID, price){
    saveState_refill()
    if(refillOrder[ID][1]>1){
        refillOrder[ID][1] -=1;}//if this element exists in the order, we decrease the count 

    else{
        delete refillOrder[ID];} // Else, delete element in order
    total_price_refill -= Number(price)
    updateRefillOrder();
}

// Drag and drop versions
function drop_to_inventory(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    remove_refill(data.name, data.price);
}

function drop_to_refill(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    console.log(data.name, data.price);
    add_refill(data.name, data.price);
}

// Undo and redo for refill (only active in this menu)
var undo_redo_refill = [];
var historyIndex_refill = -1;

function saveState_refill() {
    // console.log(undo_redo)
    if (historyIndex_refill < undo_redo_refill.length - 1) {
        undo_redo_refill.splice(historyIndex_refill);//If we did REDO and add new element, the actions that were previously canceled are removed
    }
    // console.log(undo_redo)
    const Dict = JSON.parse(JSON.stringify(refillOrder));
    undo_redo_refill.push([Dict, total_price_refill]);
    historyIndex_refill = undo_redo_refill.length-1;
    // console.log(historyIndex)
}//save current state of order to make UNDO&REDO

function undo_refill() {
    if (historyIndex_refill === undo_redo_refill.length-1) {saveState_refill();} //if we added element and did UNDO, we should save the current state to the array of all states 
    if (historyIndex_refill > 0) {
        historyIndex_refill--;        // Go back to the previous state in the history
        const prevState = undo_redo_refill[historyIndex_refill];
        refillOrder = prevState[0];//pick dictionary of order
        total_price_refill = prevState[1];//pick total price
        updateRefillOrder()
    }
}

function redo_refill() {
    if (historyIndex_refill < undo_redo_refill.length - 1) {
        historyIndex_refill++;// Go forward to the next state in the history
        const prevState = undo_redo_refill[historyIndex_refill];
        // console.log( prevState )
        refillOrder = prevState[0];//pick dictionary of order

        total_price_refill = prevState[1];//pick total price
        updateRefillOrder()
    }
}

// Function which sends the refill order 
function sendRefill(){

    for (var item in  refillOrder) {
        (function (currentKey) {
            var product =  DB2.beverages.find(function(product) {
                return product["artikelid"] === currentKey;
            });

            currentStock = parseInt(product["stock"]);
            refillStock = parseInt(refillOrder[currentKey][1]);
            product["stock"] = (currentStock + refillStock).toString();
        })(item);
    }
    refillOrder = {};
    updateRefillOrder();
    updateInventoryView();
}



// Function which redraws the contents of refill order
function updateRefillOrder(){
    var div = document.getElementById('refillList');//get div with order
    $('#refillList').html("");  // clear the current div
    price=0
    for (var item in refillOrder) {
        (function (currentKey) {
            var product =  DB2.beverages.find(function(product) {
                return product["artikelid"] === currentKey;
            });

            var button_add = document.createElement("button");
            button_add.textContent = "Add " ;// create add button 
            button_add.addEventListener("click", function () {
                add_refill(currentKey);//add element to the order by clicking on add button
            });

            var button_remove = document.createElement("button");
            button_remove.textContent = "Remove";// create remove button 
            button_remove.addEventListener("click", function () {
                remove_refill(currentKey);//remove  element from the order by clicking on remove button
            });
            var p = document.createElement("p");
            var text1 = product["namn"] + "<br>Price:" + refillOrder[currentKey][0]+ "<br>Quantity:" +refillOrder[currentKey][1]+'<br>';
            p.innerHTML = "Total price:"
            p.innerHTML = text1;
            p.appendChild(button_add);
            p.appendChild(button_remove);
            p.setAttribute('draggable', true);
            p.setAttribute('ondragstart', `drag(event, '${currentKey}', '${refillOrder[currentKey][0]}')`);
            div.appendChild(p);
        })(item);
    }
    // Toggle display of buttons/text accordingly if order is empty or not
    if( $('#refillList').html() === "")
    {
        $("#refill_text").show();
        $("#send_refill").hide();
    }
    else{
        $("#refill_text").hide();
        $("#send_refill").show();
    }
}

// Function which redraws the inventory view using the inventory model
function updateInventoryView(){
    var inventoryList = DB2.beverages;
    // Reset content of order view
    $('#lowStock').html(""); 
    $('#normalStock').html("");
    // Draw an element for each item in the product list
    for(i = 0; i < inventoryList.length; i++ ){ 
        var product = createInventoryElement(inventoryList[i]);
        // If it is low in stock, put it at the special container at top
        if(inventoryList[i]["stock"] < 5)
        {
            $('#lowStock').append(product);
        }
        else{
            $('#normalStock').append(product);
        }  
        // Toggle view  of element according to availability of product
        let productID = inventoryList[i]["artikelid"];
        if(inventoryList[i]['available'])
        {
            $('#' + productID ).css('opacity', 1);
            $('#' + productID + "available").text(dict['unavailable']);
        }
            
        
        else
        {
            $('#' + productID ).css('opacity', 0.5);
            $('#' + productID + "available").text(dict['available']);
        }
    }

    // If the low stock section is empty, hide the division, else show it
    if($('#lowStock').html() === "")
    {
        $("#inv_low").hide();
        $("#inv_norm").hide();
    }
    else
    {
        $("#inv_low").show();
        $("#inv_norm").show();
    }
}

// Function which toggles the availability of item
function toggleAvailable(ID){
    // Toggle tha availability in the database
    var item =  DB2.beverages.find(function(item) {
        return item["artikelid"] === ID;
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
    var item =  DB2.beverages.find(function(item) {
        return item["artikelid"] === ID;
    });
    text = dict['remove_text_1'] + item['productName'] +"? <br>" + dict['remove_text_2'];
    $("#remove_item_text").html(text)
}

// Function which affirms permanent removal of item
function removePermanently(){
    // Fetch ID and remove corresponding item from database
    let ID =  $("#remove_popup").data("itemID");
    var item = DB2.beverages.find(function(item) {
        return item["artikelid"] === ID;
    });
    i =  DB2.beverages.indexOf(item);
    DB2.beverages.splice(i, 1);
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
    }
    // TODO Check for unique product ID

    newProduct["available"] = true;
    modelData['products'].push(newProduct);

    updateInventoryView(); // Change view from model
}

// VIP-USER FUNCTIONS //
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

//Function to show the selected user in the model
function showUser(ID){
    user = getUser(ID)
    $('#credit_text').html("");
    text = dict['user_id'] + user["user_id"] + "<br>" + dict['user_name'] + user["first_name"] + " " + user["last_name"] + "<br>" + dict['current_credits'] + getCredits(ID);
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

// MISCELLANEOUS FUNCTIONS//
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