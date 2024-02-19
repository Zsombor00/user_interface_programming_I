
let OrderDict = {};// dictionary of all element in order of one person
var array =[];// array of all customer orders
current_customer=0;// save the index of current customer


function SwapDivsWithClick(div1,div2){
        d1 = document.getElementById(div1);
        d2 = document.getElementById(div2);
        d1.style.display = "block";
        d2.style.display = "none";
} // swap food and drink pages by clicking on buttons food, drinks


function add_element(name){
    if(OrderDict[name]>0){
        OrderDict[name] =OrderDict[name]+1;}//if this element exists in the order, we increase the count 
    else{
        OrderDict[name] =1;}//
    displayOrder()//if this element doesn't exist in the order, we add it to the dictionary
}//add new element to customer order or change element in the dictionary 

function remove_element(name){
    if(OrderDict[name]>1){
        OrderDict[name] =OrderDict[name]-1;}//decrease the count of element if quantity>1
    else{
        delete OrderDict[name]}// delete element from order if quantity==1
    displayOrder()
}// delete element for the order


function add_customer(){
    if(current_customer===array.length){
    OrderDict = {};
    current_customer+=1;
    displayOrder()
    console.log(array)
    }
    else {
        OrderDict = {};
        current_customer=array.length;
        displayOrder()
        console.log(array)
    }
}// add new customer to the order

function save_order(){
    if(current_customer===array.length && OrderDict != {}){
        array.push(OrderDict)
        displayOrder()
        console.log(array)
        }
        else if(current_customer<array.length && OrderDict != {}){
            array[current_customer]=OrderDict
            console.log(array)
        }
}// save order of the current customer (if order is not empty)

function previous_customer(){
    if(current_customer!=0){
        current_customer-=1;
        OrderDict=array[current_customer]
        console.log(array)
        displayOrder()
    }
}// switch page to the previous customer 


function next_customer(){
    if(current_customer<array.length-1){
        current_customer+=1;
        OrderDict=array[current_customer]
        displayOrder()
    }
}// switch page to the next customer 

window.onload=function () {
    const data = [
        { id: 1, name: "Burger", price: 10.99 , description: "description"},
        { id: 2, name: "Pizza", price: 12.99, description: "description" },
        { id: 3, name: "Salad", price: 7.99 , description: "description"},
    ];//local database NEED TO CHANGE

            const menuContainer = document.getElementById("menu_food");// get menu container
            data.forEach(item => {
                // console.log(typeof item.name)
                // console.log(typeof item.name)
                const menuItem = document.createElement("div");//create div for each element in menu
                // menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button onclick="add_element('${item.name}')">Add dish</button>
                `;// add header, description, price and ADD DISH button
                menuContainer.appendChild(menuItem);// add this div to the menu container  
            });
        

};//test function for food menu

function displayOrder() {

    var div = document.getElementById("order");//get div with order
    div.innerHTML = "";  // clear the current div

    for (var k in OrderDict) {
        (function (currentKey) {
            // console.log(currentKey)
            var button_add = document.createElement("button");
            button_add.textContent = "Add " ;// create add button 
            button_add.addEventListener("click", function () {
                add_element(currentKey);//add element to the order by clicking on add button
                console.log("Button clicked for:", currentKey, OrderDict[currentKey]);
            });

            var button_remove = document.createElement("button");
            button_remove.textContent = "Remove";// create remove button 
            button_remove.addEventListener("click", function () {
                remove_element(currentKey);//remove  element from the order by clicking on remove button
                console.log("Button clicked for:", currentKey, OrderDict[currentKey]);
            });

            var p = document.createElement("p");
            var text1 = currentKey + "     " + OrderDict[currentKey];
            p.appendChild(document.createTextNode(text1));
            p.appendChild(button_add);
            p.appendChild(button_remove);
            div.appendChild(p);
        })(k);
    }
} //display all element in the order


function showOrders(){
    document.getElementById('openPopupButton').addEventListener('click', function () {
        var main = document.getElementById('main');
        var window = document.getElementById('window_order');
        var text=""//create a string line to add information about the order
        for (customer in array){
            console.log(customer.type)
            text+=`Customer ${Number(customer)+1}:  `;//for each client we add the current client number
            for (element in array[customer]){
                text+= element+"    "+array[customer][element]+", "//add all items with their quantity from current customer’s order
            }   
            text+="Price";//add Price NEED TO FIX
            text+="<br>"; //switch to the new line 
        }
        window.innerHTML = text;//finally add the whole text about order to the pop up window
        main.style.display = 'block';//display pop up window
        main.addEventListener('click', function () {
            main.style.display = 'none';//close by clicking on the screen
        });
    });
}// pop up window with all element of order

