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
let current_order_id = 10002;

var customer_type="vip"
let undo_redo = [];
let historyIndex = -1;
var user_credits = 0;
var user_id=0;
let limit = "false";
var lang='swe'
$(document).ready(function() {
    const data_drinks = getAllBeverages();
    const slicedArray = data_drinks.slice(0, 20);

    // Handle menu drinks
    const menuBev = $("#menu_drinks");
    slicedArray.forEach(item => {
        const menuItem = $("<div class='menu-item'>");
        const accordionButton = $("<button class='accordion'>").html(`<strong>${item.namn}</strong> - SEK ${item.prisinklmoms}`);
        const addButton = $(`<button onclick="add_element('${item.namn}','${item.prisinklmoms}')" class='add-button'>${dict[lang]['Add']}</button>`);
        const buttonContainer = $("<div class='button-container'>");
        buttonContainer.append(accordionButton);
        buttonContainer.append(addButton);
        const panel = $("<div class='panel'>").html(`
      <p>
        <strong>${dict[lang]['Category']}</strong> ${item.category}<br>
        <strong>${dict[lang]['Packaging']}</strong> ${item.forpackning}<br>
        <strong>${dict[lang]['Captype']}</strong> ${item.forslutning}<br>
        <strong>${dict[lang]['Country of Origin']}</strong> ${item.ursprunglandnamn}<br>
        <strong>${dict[lang]['Alcohol Strength']}</strong> ${item.alkoholhalt}
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
        $(".menu_tab").removeClass("active");
        $(this).addClass("active");

        $(".menu-item").hide();
        if (category === "all") {
            $(".menu-item").show();
        } else {
            $(`.menu-item[data-category='${category}']`).show();
        }
    });

    $("#filter_select").change(function() {
        const selectedValue = $(this).val();
        $(".menu-item").hide();

        if (selectedValue === "all") {
            $(".menu-item").show();
        } else {
            $(`.menu-item[data-alcohol='${selectedValue}']`).show();
        }
    });

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
            <button onclick="add_element('${item.name}','${item.priceinclvat}')">${dict[lang]['Add']}</button>
        `);
        menuContainer.append(menuItem);
    });
    $("#filterAll").text(dict[lang]['all']);
    $("#filterBeers").text(dict[lang]['Beers']);
    $("#filterWines").text(dict[lang]['Wines']);
    $("#filterSpirits").text(dict[lang]['Spirits']);
    $("#filterSpecials").text(dict[lang]['Specials']);
    $("#Food_menu").text(dict[lang]['Food_menu']);
    $("#Drinks_menu").text(dict[lang]['Drinks_menu']);
    $("#alcohol").text(dict[lang]['Alcohol']);
    $("#alcoholAll").text(dict[lang]['AlcoholAll']);
    $("#alcohol5").text(dict[lang]['alcohol5']);
    $("#alcohol5_10").text(dict[lang]['alcohol5_10']);
    $("#alcohol10_20").text(dict[lang]['alcohol10_20']);
    $("#alcohol20_30").text(dict[lang]['alcohol20_30']);
    $("#alcohol30_40").text(dict[lang]['alcohol30_40']);
    $("#alcohol40").text(dict[lang]['alcohol40']);
    $("#food_type0").text(dict[lang]['food_type0']);
    $("#food_type1").text(dict[lang]['food_type1']);
    $("#food_type2").text(dict[lang]['food_type2']);

    $("#order_title").text(dict[lang]['Title_order']);
    $("#oder").text(dict[lang]['Order_list']);
    $("#customer_limit").text(dict[lang]['Customers_limit']);
    $("#items_limit").text(dict[lang]['Items_limit']);
    $("#quantity_limit").text(dict[lang]['Quantity_limit']);
    $("#saveOrder").text(dict[lang]['Save_order']);
    $("#new_customer").text(dict[lang]['Add_new_customer']);
    $("#previous_customer").text(dict[lang]['Previous_customer']);
    $("#next_customer").text(dict[lang]['Next_customer']);
    $("#openPopupButton").text(dict[lang]['Show_order']);
    $("#payButton").text(dict[lang]['Pay_button']);
    $("#payAtBarButton").text(dict[lang]['Pay_at_bar']);
    $("#payByCreditsButton").text(dict[lang]['Pay_by_credits']);
    $("#NewOrder").text(dict[lang]['New_order']);
    $("#ClosePayment").text(dict[lang]['Close_payment']);

    // Hide elements
    $('#login_view').hide();
    $('#employee_view').hide();
    $(".inventory").hide();
    $(".VIP").hide();

    // Translate and set text for various elements
    //Login screen
    $("#login_header").text(dict[lang]['login']);
    $('label[for="username"]').text(dict[lang]['username']);
    $('label[for="password"]').text(dict[lang]['password']);
    $("#login_button").text(dict[lang]['login']);
    $("#logout").text(dict[lang]['login']);

    // Bartender view
    $("#ordButton").text(dict[lang]['ord']);
    $("#invButton").text(dict[lang]['inv']);
    $("#VIPButton").text(dict[lang]['vip']);
    $("#security").text(dict[lang]['security']);

    $("#order_type0").text(dict[lang]['ord_type0']);
    $("#order_type1").text(dict[lang]['ord_type1']);
    $("#order_type2").text(dict[lang]['ord_type2']);
    $("#ord_title").text(dict[lang]['ord']);
    $("#ord_text").text(dict[lang]['ord_text']);
    $("#pay_title").text(dict[lang]['pay']);
    $("#pay_text").text(dict[lang]['pay_text']);
    $("#split_bill").text(dict[lang]['split_bill']);
    $("#group_bill").text(dict[lang]['group_bill']);
    $('#split_bill').hide();
    $('#group_bill').hide();

    $("#inv_title").text(dict[lang]['inv']);
    $("#all").text(dict[lang]['all']);
    $("#beers").text(dict[lang]['Beers']);
    $("#wines").text(dict[lang]['Wines']);
    $("#spirits").text(dict[lang]['Spirits']);
    $("#specials").text(dict[lang]['Specials']);
    $("#inv_text").text(dict[lang]['inv_text']);
    $("#inv_low").text(dict[lang]['inv_low']);
    $("#inv_norm").text(dict[lang]['inv_norm']);
    $("#add_inv").text(dict[lang]['add_inv']);
    $("#refill_title").text(dict[lang]['refill']);
    $("#refill_text").text(dict[lang]['refill_text']);
    $("#add_item_text").text(dict[lang]['add_item_text']);
    $("#send_refill").text(dict[lang]['send_refill']);
    $('#send_refill').hide();

    $("#VIP_title").text(dict[lang]['vip']);
    $("#VIPs").text(dict[lang]['VIPs']);
    $("#VIP_text").text(dict[lang]['vip_text']);
    $("#add_VIP").text(dict[lang]['add_vip']);
    $("#credit_title").text(dict[lang]['credit']);
    $("#credit_text").text(dict[lang]['credit_text']);
    $("#creditButton").text(dict[lang]['credit_button']);creditsToAdd
    $("#creditsToAdd").text(dict[lang]['creditsToAdd']);
    $('#creditButton').hide();
    $('#creditsToAdd').hide();
    $('label[for="creditsToAdd"]').hide();

    $("#security_yes").text(dict[lang]['yes']);
    $("#remove_yes").text(dict[lang]['yes']);
    $("#security_no").text(dict[lang]['no']);
    $("#remove_no").text(dict[lang]['no']);
    $("#add_item").text(dict[lang]['add']);
    $("#cancel").text(dict[lang]['cancel']);
    $("#submit").text(dict[lang]['submit']);
    $("#reset").text(dict[lang]['reset']);
    $("#add_order").text(dict[lang]['add_order']);
    $("#subtract_order").text(dict[lang]['subtract_order']);
    $("#confirm_change").text(dict[lang]['confirm']);
    $("#pay").text(dict[lang]['Pay_button']);
    $("#exit_security").text(dict[lang]['exit']);
    $("#exit_remove").text(dict[lang]['exit']);  
    $("#exit_add").text(dict[lang]['exit']);  
    $("#exit_dis").text(dict[lang]['exit']);
    $("#exit_ord").text(dict[lang]['exit']);     

    $('label[for="discount"]').text(dict[lang]['discount']);
    $('label[for="comment"]').text(dict[lang]['comment']);


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
    undo_redo.push([Dict, total_price, limit]);
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
        limit= prevState[2];
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
        limit= prevState[2];
        displayOrder();
    }
}


function SwapDivsWithClick(div1, div2) {
    $('#' + div1).show();
    $('#' + div2).hide();
} // swap food and drink pages by clicking on buttons food, drinks


function add_element(name, price){
    if (decreaseStockAllMenu(name)){
        $('#saveOrder').text(dict[lang]['Save_order']);
        saveState() //save current state and then add new element to the order
        if(typeof OrderDict[name]!="undefined"){
            if  (OrderDict[name][1]<10){
                OrderDict[name][1] +=1;//if this element exists in the order, we increase the count 
                total_price+=Number(price)
            }
            else {
                limit="quantity"
            }
        }
        else{
            if (Object.keys(OrderDict).length<10){
                OrderDict[name] =[Number(price), 1];//
                total_price+=Number(price)
            }
            else {
                limit="items"
            }
        }
        
    }
    else {
        limit = "stock"
    }
    displayOrder()//if this element doesn't exist in the order, we add it to the dictionary
}//add new element to customer order or change element in the dictionary 

function remove_element(name, price){
    increaseStockAllMenu(name)
    $('#saveOrder').text(dict[lang]['Save_order']);
    saveState()  //save current state and then remove element from the order
    if(OrderDict[name][1]>1){
        OrderDict[name][1]-=1;//decrease the count of element if quantity>1
        if (limit==="quantity") 
            limit="false"
    }
    else{
        delete OrderDict[name]// delete element from order if quantity==1
        if (limit==="items") limit="false"
    }
    total_price-=Number(price);
    if (limit==="stock") 
        limit="false"
    console.log(OrderDict[name])
    displayOrder()
}// delete element for the order


function add_customer(){    
    if (all_orders.length<3){
        undo_redo = [];
        historyIndex = -1;
    
        total_price=0;
        if(current_customer===all_orders.length){
            OrderDict = {};
            current_customer+=1;
        }
        else {
            OrderDict = {};
            current_customer=all_orders.length;

        }
    }
    else limit="customers"
    displayOrder()
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
    $('#saveOrder').text(dict[lang]["Saved_order"]);
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
        $('#paymentMessage').html(dict[lang]['Total_price']+total_price+"<br>"+dict[lang]['Choose_payment']);
    }
    else{
        $('#paymentMessage').html(dict[lang]['Empty_order']);
        $('#ClosePayment').show();
        $('#NewOrder').hide();
        $('#payByCreditsButton').hide();
        $('#payAtBarButton').hide();
    }
}//display popup window for payment

function hidePaymentPopup() {
    $('#paymentPopup').fadeOut();
}//hide popup window for payment

// Function to push order to database
function pushOrder(all_orders, current_order_id, total_price, paid)
{
    DB_orders.push({
        "order_id": current_order_id,
        "bartender_id": "B00000",
        "customer_id": "C00001",
        "amount": total_price,
        'tableNr' : 7,
        "timestamp": "2023-11-10 19:04:13",
        "suborder": all_orders,
        "paid": paid
    });
    current_order_id +=1;
    updateOrderView();
}

// Functions to display payment confirmation message(bar payment)
function messagePaymentBar() {
    pushOrder(all_orders, current_order_id, total_price, false);
    $('#paymentMessage').text(dict[lang]['Bar_payment']);
    $('#ClosePayment').hide();
    $('#NewOrder').show();
    $('#payByCreditsButton').hide();
    $('#payAtBarButton').hide();
}

// Functions to display payment confirmation message(credits payment)
function messagePaymentCredits() {
    if (user_credits >= total_price){
        user_credits -=total_price;
        pushOrder(all_orders, current_order_id, total_price, true);
        $('#DisplayCredits').text(dict[lang]['Credits'] + user_credits);
        decreaseCredits(user_id,total_price)
        $('#paymentMessage').text(dict[lang]['Credits payment']);
        $('#ClosePayment').hide();
        $('#New order').show();
        $('#payByCreditsButton').hide();
        $('#payAtBarButton').hide();
    }
    else {
        pushOrder(all_orders, current_order_id, total_price, false);
        $('#paymentMessage').text(dict[lang]['Not enough credits']);
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
    console.log(limit)
    let div = $("#order");
    div.empty();
    for (let k in OrderDict) {
        (function (currentKey) {
            let button_add = $("<button>").text(dict[lang]['Add']).click(function () {
                add_element(currentKey, Number(OrderDict[currentKey][0]));
            });

            let button_remove = $("<button>").text(dict[lang]['Remove']).click(function () {
                remove_element(currentKey, Number(OrderDict[currentKey][0]));
            });

            let p = $("<p>").html(dict[lang]['Total_price']);
            p.html(currentKey + "<br>" +dict[lang]['Price']+ OrderDict[currentKey][0] + "<br>"+dict[lang]['Quantity'] + OrderDict[currentKey][1] + '<br>');
            p.append(button_add);
            p.append(button_remove);
            p.attr('draggable', true);
            p.attr('ondragstart', `drag(event, '${currentKey}', '${OrderDict[currentKey][0]}')`);
            div.append(p);
        })(k);
    }
    let p = $("<p>").text(dict[lang]['Total_price'] + total_price);
    div.append(p);
    if (limit==="customers"){
        $("#customers_limit").show()
        $("#quantity_limit").hide()
        $("#items_limit").hide()
    }else if (limit==="quantity"){
        $("#quantity_limit").show()
        $("#items_limit").hide()
        $("#customers_limit").hide()
    }
    else if (limit==="items" || limit==="stock"){
        $("#items_limit").show()
        $("#quantity_limit").hide()
        $("#customers_limit").hide()
    }else {
        $("#items_limit").hide()
        $("#quantity_limit").hide()
        $("#customers_limit").hide()
    }

}//display all element in the order


function showOrders() {
    $('#openPopupButton').click(function () {
        let main = $('#main');
        let window = $('#window_order');
        let text = "";
        for (customer in all_orders) {
            text += dict[lang]['Customer'] +(Number(customer)+1) +": ";
            for (element in all_orders[customer][0]) {
                text += all_orders[customer][0][element][1] + " " + element + ", ";
            }
            text += dict[lang]['Price'] + all_orders[customer][1];
            text += "<br>";
        }
        window.html(text);
        window.append(dict[lang]['Total_price']+ total_price)
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
