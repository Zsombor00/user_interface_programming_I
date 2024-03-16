var DB = require('./DBLoaded.js');
var DB2 = require('./Beverages.js');
var DB3 = require('./Dishes.js');

function getAllUsers() {
    // Create an empty array
    var allUsers = [];
    // Iterate over the database
    for (i = 0; i < DB.users.length; i++) {
        allUsers.push(DB.users[i]);
    }
    // Return the array
    return allUsers;
}

function getAllUserNames() {
    var nameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        nameCollect.push(DB.users[i].username);
    }
    return nameCollect;
}

function getCredits(userId) {
    // Find the user in the database
    var account = DB.account.find(function(account) {
        return account.user_id == userId;
    });
    return account.creditSEK
}

function increaseCredits(userId, creditsToAdd) {
    // Find the user in the database
    var user = DB.account.find(function(user) {
        return user.user_id == userId;
    });

    // If the user is found, increase their credits
    if (user) {
        // Convert creditSEK to number, add creditsToAdd, and convert back to string
        var currentCredits = parseInt(user.creditSEK);
        var newCredits = currentCredits + parseInt(creditsToAdd);
        user.creditSEK = newCredits.toString();
        return true; // Return true indicating the operation was successful
    } else {
        return false; // Return false indicating the user was not found
    }
}

function decreaseCredits(userId, creditsToSubtract) {
    // Find the user in the database
    var user = DB.account.find(function(user) {
        return user.user_id == userId;
    });

    // If the user is found, increase their credits
    if (user) {
        // Convert creditSEK to number, add creditsToSubtract, and convert back to string
        var currentCredits = parseInt(user.creditSEK);
        var newCredits = currentCredits - parseInt(creditsToSubtract);
        user.creditSEK = newCredits.toString();
        return true; // Return true indicating the operation was successful
    } else {
        return false; // Return false indicating the user was not found
    }
}

function getUser(userId) {
    // Find the user in the database
    var user = DB.users.find(function(user) {
        return user.user_id == userId;
    });
    return user
}

function getUserID(userName) {
    // Find the user in the database
    var user = DB.users.find(function(user) {
        return user.username == userName;
    });
    return user.user_id
}

// Function to update stock of a specific item
function updateStock(itemNr, newStock) {
    // Find the item in the beverages array
    var item = DB2.beverages.find(function(item) {
        return item.nr == itemNr;
    });

    // If the item is found, update its stock
    if (item) {
        item.stock = newStock.toString();
        return true; // Return true indicating the operation was successful
    } else {
        return false; // Return false indicating the item was not found
    }
}



// Function to decrease stock by one
function decreaseStock(itemNr) {
    // Find the item in the beverages array
    var item = DB2.beverages.find(function(item) {
        return item.nr == itemNr;
    });

    // If the item is found, update its stock
    if (item) {
        item.stock = item.stock-1
        return true; // Return true indicating the operation was successful
    } else {
        return false; // Return false indicating the item was not found
    }
}


// Function to increase stock by one
function decreaseStock(itemNr) {
    // Find the item in the beverages array
    var item = DB2.beverages.find(function(item) {
        return item.nr == itemNr;
    });

    // If the item is found, update its stock
    if (item) {
        if (Number(item.stock)>0){
            item.stock = item.stock+1
            return true; // Return true indicating the operation was successful
        }else{
            return false
        }
    } else {
        return false; // Return false indicating the item was not found
    }
}

function getBeverage(itemNr) {
    // Find the item in the beverages array
    var item = DB2.beverages.find(function(item) {
        return item.nr == itemNr;
    });
    return item
}

function getAllBeverages() {
    // Create an empty array
    var allBeverages = [];
    // Iterate over the database
    for (i = 0; i < DB2.beverages.length; i++) {
        allBeverages.push(DB2.beverages[i]);
    }
    // Return the array
    return allBeverages;
}

function getDish(itemNr) {
    // Find the item in the dishes array
    var item = DB3.dishes.find(function(item) {
        return item.nr == itemNr;
    });
    return item
}

function getAllDishes() {
    // Create an empty array
    var allDishes = [];
    // Iterate over the database
    for (i = 0; i < DB3.dishes.length; i++) {
        allDishes.push(DB3.dishes[i]);
    }
    // Return the array
    return allDishes;
}

function filterBeveragesByCategory(category) {
    // Create an empty array
    var filtered = [];
    // Iterate over the database
    for (i = 0; i < DB2.beverages.length; i++) {
        if (DB2.beverages[i].category==category)
        filtered.push(DB2.beverages[i]);
    }
    // Return the array
    return filtered;
}

function filterDishesByCategory(category) {
    // Create an empty array
    var filtered = [];
    // Iterate over the database
    for (i = 0; i < DB3.dishes.length; i++) {
        if (DB3.dishes[i].category==category)
        filtered.push(DB3.dishes[i]);
    }
    // Return the array
    return filtered;
}

function filterBeveragesByName(name) {
    // Create an empty array
    var filtered = [];
    // Iterate over the database
    for (i = 0; i < DB2.beverages.length; i++) {
        if (DB2.beverages[i].namn.toLowerCase().includes(name.toLowerCase()))
        filtered.push(DB2.beverages[i]);
    }
    // Return the array
    return filtered;
}

function filterDishesByName(name) {
    // Create an empty array
    var filtered = [];
    // Iterate over the database
    for (i = 0; i < DB3.dishes.length; i++) {
        if (DB3.dishes[i].name.toLowerCase().includes(name.toLowerCase()))
        filtered.push(DB3.dishes[i]);
    }
    // Return the array
    return filtered;
}

function filterDishesByName(name) {
    // Create an empty array
    var filtered = [];
    // Iterate over the database
    for (i = 0; i < DB3.dishes.length; i++) {
        if (DB3.dishes[i].name.toLowerCase().includes(name.toLowerCase()))
        filtered.push(DB3.dishes[i]);
    }
    // Return the array
    return filtered;
}

function checkPassword(username, password){
    var user = DB.users.find(function(user) {
        return user.username == username;
    });
    if (user){
        if (user.password==password)
            return user
        else return null
    }
    else
        return null
        
    }

function decreaseStockAllMenu(itemName) {
        // Find the item in the dishes array
        var item = DB3.dishes.find(function(item) {
            return item.name == itemName;
        });
        if (!item){
            var item = DB2.beverages.find(function(item) {
                return item.namn == itemName;
            });
        }
        if (Number(item.stock)>0){
            item.stock = item.stock-1
            return true; // Return true indicating the operation was successful
        }else{
            return false
        }

    }

function increaseStockAllMenu(itemName) {
        // Find the item in the dishes array
        var item = DB3.dishes.find(function(item) {
            return item.name == itemName;
        });
        if (!item){
            var item = DB2.beverages.find(function(item) {
                return item.namn == itemName;
            });
        }
        item.stock = item.stock+1
        return true; // Return true indicating the operation was successful

    }
