/*Structures
OrderDict{
    key: value
    Name of dish:[Price of dish, quantity of the dish]
}
all_orders=[[OrderDict, total_price],[OrderDict, total_price]] where [OrderDict, total, price]- order of one person
*/

var OrderDict = {};// dictionary of all element in order of one person
var all_orders =[];// array of all customer orders
current_customer=0;// save the index of current customer
total_price=0;


var undo_redo = [];
var historyIndex = -1;

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


function SwapDivsWithClick(div1,div2){
        d1 = document.getElementById(div1);
        d2 = document.getElementById(div2);
        d1.style.display = "block";
        d2.style.display = "none";
} // swap food and drink pages by clicking on buttons food, drinks


function add_element(name, price){
    saveState() //save current state and then add new element to the order
    if(typeof OrderDict[name]!="undefined"){
        OrderDict[name][1] +=1;}//if this element exists in the order, we increase the count 

    else{
        OrderDict[name] =[Number(price), 1];}//
    total_price+=Number(price)

    displayOrder()//if this element doesn't exist in the order, we add it to the dictionary
}//add new element to customer order or change element in the dictionary 

function remove_element(name, price){
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

window.onload=function () {
    const data = [
        { id: 1, name: "Burger", price: 10 , description: "description"},
        { id: 2, name: "Pizza", price: 12, description: "description" },
        { id: 3, name: "Salad", price: 7 , description: "description"},
    ];//local database NEED TO CHANGE

            const menuContainer = document.getElementById("menu_food");// get menu container
            data.forEach(item => {
                // console.log(typeof item.name)
                // console.log(typeof item.name)
                const menuItem = document.createElement("div");//create div for each element in menu
                menuItem.setAttribute('draggable', true);
                menuItem.setAttribute('ondragstart', `drag(event, '${item.name}', '${item.price}')`);
                // menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button onclick="add_element('${item.name}','${item.price}')">Add dish</button>
                `;// add header, description, price and ADD DISH button
                menuContainer.appendChild(menuItem);// add this div to the menu container  
            });
        

};//test function for food menu

function displayOrder() {

    var div = document.getElementById("order");//get div with order
    div.innerHTML = "";  // clear the current div
    price=0
    for (var k in OrderDict) {
        (function (currentKey) {
            // console.log(currentKey)

            var button_add = document.createElement("button");
            button_add.textContent = "Add " ;// create add button 
            button_add.addEventListener("click", function () {
                add_element(currentKey, Number(OrderDict[currentKey][0]));//add element to the order by clicking on add button
                // console.log("Button clicked for:", OrderDict[currentKey][0]);
            });

            var button_remove = document.createElement("button");
            button_remove.textContent = "Remove";// create remove button 
            button_remove.addEventListener("click", function () {
                remove_element(currentKey, Number(OrderDict[currentKey][0]));//remove  element from the order by clicking on remove button
                // console.log("Button clicked for:", currentKey, OrderDict[currentKey]);
            });
            var p = document.createElement("p");
            var text1 = currentKey + "<br>Price:" + OrderDict[currentKey][0]+ "<br>Quantity:" + OrderDict[currentKey][1]+'<br>';
            p.innerHTML = "Total price:"
            p.innerHTML = text1;
            p.appendChild(button_add);
            p.appendChild(button_remove);
            p.setAttribute('draggable', true);
            p.setAttribute('ondragstart', `drag(event, '${currentKey}', '${OrderDict[currentKey][0]}')`);
            div.appendChild(p);
        })(k);
    }
    var p = document.createElement("p");
    p.innerHTML = "Total price: "+total_price;
    div.appendChild(p);
    // console.log(price)
} //display all element in the order


function showOrders(){
    document.getElementById('openPopupButton').addEventListener('click', function () {
        var main = document.getElementById('main');
        var window = document.getElementById('window_order');
        var text=""//create a string line to add information about the order
        // console.log(all_orders)
        for (customer in all_orders){
            // console.log(customer.type)
            text+=`Customer ${Number(customer)+1}:  `;//for each client we add the current client number
            for (element in all_orders[customer][0]){
                // console.log(all_orders[customer][0][element])
                text+= all_orders[customer][0][element][1]+" "+ element+", "//add all items with their quantity from current customer’s order
            }   
            text+="Price: "+ all_orders[customer][1];//add Price NEED TO FIX
            text+="<br>"; //switch to the new line 
        }
        window.innerHTML = text;//finally add the whole text about order to the pop up window

        main.style.display = 'block';//display pop up window
        main.addEventListener('click', function () {
            main.style.display = 'none';//close by clicking on the screen
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
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    remove_element(data.name, data.price);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop_to_order(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    add_element(data.name, data.price);
}