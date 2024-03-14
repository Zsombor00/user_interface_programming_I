/*Structures
OrderDict{
    key: value
    Name of dish:[Price of dish, quantity of the dish]
}
all_orders=[[OrderDict, total_price],[OrderDict, total_price]] where [OrderDict, total, price]- order of one person
*/
let OrderDict = {};// dictionary of all element in order of one person
let all_orders =[];// array of all customer orders
let current_customer=0;// save the index of current customer
let total_price=0;

var customer_type="vip"
let undo_redo = [];
let historyIndex = -1;
let user_credits = getCredits(28)

$(document).ready(function() {
    const data_drinks = getAllBeverages();
    const slicedArray = data_drinks.slice(0, 20);

    // Handle menu drinks
    const menuBev = $("#menu_drinks");
    slicedArray.forEach(item => {
        const menuItem = $("<div class='menu-item'>");
        const accordionButton = $("<button class='accordion'>").html(`<strong>${item.namn}</strong> - SEK ${item.prisinklmoms}`);
        const addButton = $(`<button onclick="add_element('${item.namn}','${item.prisinklmoms}')" class='add-button'>Add</button>`);
        const buttonContainer = $("<div class='button-container'>");
        buttonContainer.append(accordionButton);
        buttonContainer.append(addButton);
        const panel = $("<div class='panel'>").html(`
      <p>
        <strong>Category:</strong> ${item.category}<br>
        <strong>Packaging:</strong> ${item.forpackning}<br>
        <strong>Captype:</strong> ${item.forslutning}<br>
        <strong>Country of Origin:</strong> ${item.ursprunglandnamn}<br>
        <strong>Alcohol Strength:</strong> ${item.alkoholhalt}
      </p>
    `);

        buttonContainer.on("click", function() {
            $(this).toggleClass("active");
            panel.slideToggle();
        });

        menuItem.append(buttonContainer);
        menuItem.append(panel);

        menuItem.attr('draggable', true);
        menuItem.attr('ondragstart', `drag(event, '${item.namn}', '${item.prisinklmoms}')`);

        menuItem.attr('data-category', item.category.toLowerCase());
        menuItem.attr('data-alcohol', getAlcoholRange(item.alkoholhalt));

        menuBev.append(menuItem);
    });

    $(".menu_tab").click(function() {
        const category = $(this).data("category");
        const selectedValue = $("#filter_select").val();

        $(".menu_tab").removeClass("active");
        $(this).addClass("active");

        applyFilter(category, selectedValue);
    });

    $("#filter_select").change(function() {
        const selectedValue = $(this).val();
        const activeTab = $(".menu_tab.active");
        const category = activeTab.length ? activeTab.data("category") : "all";

        applyFilter(category, selectedValue);
    });

    function applyFilter(category, alcoholFilter = "all") {
        $(".menu-item").hide();

        if (category === "all" && alcoholFilter === "all") {
            $(".menu-item").show();
        } else if (category === "all") {
            $(`.menu-item[data-alcohol='${alcoholFilter}']`).show();
        } else if (alcoholFilter === "all") {
            $(`.menu-item[data-category='${category}']`).show();
        } else {
            $(`.menu-item[data-category='${category}'][data-alcohol='${alcoholFilter}']`).show();
        }
    }

    function getAlcoholRange(alcoholContent) {
        const percentage = parseFloat(alcoholContent.replace("%", ""));
        if (percentage < 5) {
            return "< 5%";
        } else if (percentage >= 5 && percentage < 10) {
            return "5 - 10%";
        } else if (percentage >= 10 && percentage < 20) {
            return "10 - <20%";
        } else if (percentage >= 20 && percentage < 30) {
            return "20 - <30%";
        } else if (percentage >= 30 && percentage <= 40) {
            return "30% - 40%";
        } else {
            return "> 40%";
        }
    }

    // Handle menu food
    const data_dishes = getAllDishes();
    const menuContainer = $("#menu_food");
    data_dishes.forEach(item => {
        const menuItem = $("<div>");
        menuItem.attr('draggable', true);
        menuItem.attr('ondragstart', `drag(event, '${item.name}', '${item.priceinclvat}')`);
        menuItem.html(`
            <h2>${item.name}</h2>
            <p>${item.priceinclvat}</p>
            <button onclick="add_element('${item.name}','${item.priceinclvat}')">Add</button>
        `);
        menuContainer.append(menuItem);
    });
    // Hide elements
    $('#login_view').hide();
    $('#employee_view').hide();
    $(".inventory").hide();
    $(".VIP").hide();

    // Translate and set text for various elements
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
    $("#inv_low").text(dict['inv_low']);
    $("#inv_norm").text(dict['inv_norm']);
    $("#add_inv").text(dict['add_inv']);
    $("#refill_title").text(dict['refill']);
    $("#refill_text").text(dict['refill_text']);
    $("#add_item_text").text(dict['add_item_text']);
    $("#send_refill").text(dict['send_refill']);
    $('#send_refill').hide();

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

    // Create and update various views
    createForm(modelData['productAttributes'], "input_form");
    updateOrderView();
    updateInventoryView();
    updateVIPView();
});

function saveState() {
    // console.log(undo_redo)
    if (historyIndex < undo_redo.length - 1) {
        undo_redo.splice(historyIndex);//If we did REDO and add new element, the actions that were previously canceled are removed
    }
    // console.log(undo_redo)
    const Dict = JSON.parse(JSON.stringify(OrderDict));
    undo_redo.push([Dict, total_price]);
    historyIndex = undo_redo.length-1;
    // console.log(historyIndex)
}//save current state of order to make UNDO&REDO

function undo() {
    if (historyIndex === undo_redo.length-1) saveState() //if we added element and did UNDO, we should save the current state to the array of all states 
    if (historyIndex > 0) {
        historyIndex--;        // Go back to the previous state in the history
        const prevState = undo_redo[historyIndex];
        OrderDict = prevState[0];//pick dictionary of order
        total_price = prevState[1];//pick total price
        displayOrder();
    }
    // console.log(historyIndex)
}

function redo() {
    if (historyIndex < undo_redo.length - 1) {
        historyIndex++;// Go forward to the next state in the history
        const prevState = undo_redo[historyIndex];
        // console.log( prevState )
        OrderDict = prevState[0];//pick dictionary of order

        total_price = prevState[1];//pick total price
        displayOrder();
    }
}


function SwapDivsWithClick(div1, div2) {
    $('#' + div1).show();
    $('#' + div2).hide();
} // swap food and drink pages by clicking on buttons food, drinks


function add_element(name, price){
    $('#saveOrder').text('Save');
    saveState() //save current state and then add new element to the order
    if(typeof OrderDict[name]!="undefined"){
        OrderDict[name][1] +=1;}//if this element exists in the order, we increase the count 

    else{
        OrderDict[name] =[Number(price), 1];}//
    total_price+=Number(price)

    displayOrder()//if this element doesn't exist in the order, we add it to the dictionary
}//add new element to customer order or change element in the dictionary 

function remove_element(name, price){
    $('#saveOrder').text('Save');
    saveState()  //save current state and then remove element from the order
    if(OrderDict[name][1]>1){
        OrderDict[name][1]-=1;}//decrease the count of element if quantity>1
    else{
        delete OrderDict[name]}// delete element from order if quantity==1
    total_price-=Number(price)
    displayOrder()
}// delete element for the order


function add_customer(){    
    undo_redo = [];
    historyIndex = -1;

    total_price=0;
    if(current_customer===all_orders.length){
        OrderDict = {};
        current_customer+=1;
        displayOrder()
    }
    else {
        OrderDict = {};
        current_customer=all_orders.length;
        displayOrder()

    }
}// add new customer to the order

function save_order(){
    if(current_customer===all_orders.length && OrderDict != {}){
        all_orders.push([OrderDict, total_price])
        displayOrder()
        // console.log(all_orders)
    }
    else if(current_customer<all_orders.length && OrderDict != {}){
        all_orders[current_customer]=[OrderDict, total_price];
            // console.log(all_orders)
    }
    $('#saveOrder').text('Order saved');
}// save order of the current customer (if order is not empty)

function previous_customer(){
    if(current_customer!=0){
        current_customer-=1;
        [OrderDict, total_price]=all_orders[current_customer]
        // console.log(all_orders)
        displayOrder()
    }
}// switch page to the previous customer 


function next_customer(){
    if(current_customer<all_orders.length-1){
        current_customer+=1;
        [OrderDict, total_price]=all_orders[current_customer]
        displayOrder()
    }
}// switch page to the next customer 


function paymentPopup() {
    $('#paymentPopup').fadeIn();
    if (total_price>0){
        $('#ClosePayment').show();
        $('#NewOrder').show();
        if (customer_type==="vip") {
            $('#payByCreditsButton').show();
        } else {
            $('#payByCreditsButton').hide();
        }
        $('#payAtBarButton').show();
        $('#paymentMessage').html("The total price is: "+total_price+"<br>"+"Choose payment method");
    }
    else{
        $('#paymentMessage').html("You didn't choose any item from menu");
        $('#ClosePayment').show();
        $('#NewOrder').hide();
        $('#payByCreditsButton').hide();
        $('#payAtBarButton').hide();
    }
}//display popup window for payment

function hidePaymentPopup() {
    $('#paymentPopup').fadeOut();
}//hide popup window for payment


// Functions to display payment confirmation message(bar payment)
function messagePaymentBar() {
    $('#paymentMessage').text('You chose to pay at the bar.');
    $('#ClosePayment').hide();
    $('#NewOrder').show();
    $('#payByCreditsButton').hide();
    $('#payAtBarButton').hide();
}

// Functions to display payment confirmation message(credits payment)
function messagePaymentCredits() {
    if (user_credits >= total_price){
        user_credits -=total_price;
        $('#DisplayCredits').text("You have "+ user_credits +" credits");
        $('#paymentMessage').text('Your order was paid by credits.');
        $('#ClosePayment').hide();
        $('#New order').show();
        $('#payByCreditsButton').hide();
        $('#payAtBarButton').hide();
    }
    else {
        $('#paymentMessage').text('You do not have enough credits. Please pay at the bar.');
        $('#ClosePayment').show();
        $('#New order').show();
        $('#payByCreditsButton').hide();
        $('#payAtBarButton').show();
    }   
}

function newOrder(){
    OrderDict = {};
    all_orders =[];
    current_customer=0;
    total_price=0;    
    undo_redo = [];
    historyIndex = -1;
    hidePaymentPopup()
    displayOrder();
}//set zeros to all variables 

function displayOrder() {
    let div = $("#order");
    div.empty();
    for (let k in OrderDict) {
        (function (currentKey) {
            let button_add = $("<button>").text("Add").click(function () {
                add_element(currentKey, Number(OrderDict[currentKey][0]));
            });

            let button_remove = $("<button>").text("Remove").click(function () {
                remove_element(currentKey, Number(OrderDict[currentKey][0]));
            });

            let p = $("<p>").html("Total price: ");
            p.html(currentKey + "<br>Price: " + OrderDict[currentKey][0] + "<br>Quantity: " + OrderDict[currentKey][1] + '<br>');
            p.append(button_add);
            p.append(button_remove);
            p.attr('draggable', true);
            p.attr('ondragstart', `drag(event, '${currentKey}', '${OrderDict[currentKey][0]}')`);
            div.append(p);
        })(k);
    }
    let p = $("<p>").text("Total price: " + total_price);
    div.append(p);
}//display all element in the order


function showOrders() {
    $('#openPopupButton').click(function () {
        let main = $('#main');
        let window = $('#window_order');
        let text = "";
        for (customer in all_orders) {
            text += `Customer ${Number(customer) + 1}: `;
            for (element in all_orders[customer][0]) {
                text += all_orders[customer][0][element][1] + " " + element + ", ";
            }
            text += "Price: " + all_orders[customer][1];
            text += "<br>";
        }
        window.html(text);
        main.show();
        main.click(function () {
            main.hide();
        });
    });
}// pop up window with all element of order

function drag(event, name, price) {
    event.dataTransfer.setData("text", JSON.stringify({
        name: name,
        price: price
    }));
}


function drop_to_menu(ev) {
    ev.preventDefault();
    let data = JSON.parse(ev.dataTransfer.getData("text"));
    remove_element(data.name, data.price);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop_to_order(ev) {
    ev.preventDefault();
    let data = JSON.parse(ev.dataTransfer.getData("text"));
    add_element(data.name, data.price);
}
