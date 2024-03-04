function login() {
    console.log('ASDASD')
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (checkPassword(username, password)){
        alert("Login successful!");
    } else {
        alert("Invalid username or password.");
    }
}
