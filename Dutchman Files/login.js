function login() {
    console.log('ASDASD')
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    user = checkPassword(username, password)

    if (user){
        if(user.credentials == 0)
            
        if(user.credentials == 1)

        if(user.credentials == 3)

    } else {
        alert("Invalid username or password.");
    }
}
