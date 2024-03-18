function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    user = checkPassword(username, password)
    current_view="logout"
    if (user){
        if(user.credentials == 0){
            user_credits = getCredits(getUserID(username ))
            display_view("VIP")
            current_view="VIP"
        }
        if(user.credentials == 1){
            current_view="bartender"
            display_view("bartender")
        }
        if(user.credentials == 3){
            current_view="waiter"
            display_view("waiter")
        }
        user_id=getUserID(username )
        login__status=true
    } else {
        alert("Invalid username or password.");
    }
}



function display_view(type_view) {
    var employee = document.getElementById("employee_view");
    var customer = document.getElementById("vip_customer_view");
    var login=document.getElementById("login_view")
    if (type_view === "bartender") {
        updateInventoryView();
        employee.style.display = "block";
        customer.style.display = "none";
        login.style.display = "none";
        // Change undo/redo between different views
        $("#logout").text(dict[lang]['logout'])
        $("#logout").attr("onclick", "display_view('customer')");
        $("#undo").attr("onclick","undo_refill()");
        $("#redo").attr("onclick","redo_refill()");
    }
    else if (type_view === "waiter") {
        updateInventoryView();
        employee.style.display = "block";
        customer.style.display = "none";
        login.style.display = "none";
        // Change undo/redo between different views
        $("#logout").text(dict[lang]['logout'])
        $("#logout").attr("onclick", "display_view('customer')");
        $("#undo").attr("onclick","undo_refill()");
        $("#redo").attr("onclick","redo_refill()");
    }
    else if (type_view === "customer") {
        current_view="customer"
        employee.style.display = "none";
        customer.style.display = "block";
        login.style.display = "none";
        customer_type="ordinary"
        $("#logout").text(dict[lang]['login'])
        $("#logout").attr("onclick", "display_view('logout')");
        newOrder()
        $('#DisplayCredits').hide()
        $("#undo").attr("onclick","undo()");
        $("#redo").attr("onclick","redo()");
    }
    else if (type_view === "VIP") {
        employee.style.display = "none";
        customer.style.display = "block";
        login.style.display = "none";
        $("#logout").text(dict[lang]['logout'])
        $("#logout").attr("onclick", "display_view('customer')");
        customer_type="vip"
        newOrder()
        $('#DisplayCredits').text("You have "+ user_credits +" credits");
        $('#DisplayCredits').show()
        $("#undo").attr("onclick","undo()");
        $("#redo").attr("onclick","redo()");
    }
    else if (type_view === "logout") {
        current_view="logout"
        employee.style.display = "none";
        customer.style.display = "none";
        login.style.display = "block";
        $("#logout").text(dict[lang]['Exit'])
        $("#logout").attr("onclick", "display_view('customer')");
        $("#undo").attr("onclick","undo()");
        $("#redo").attr("onclick","redo()");
    }


}