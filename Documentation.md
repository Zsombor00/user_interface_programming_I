# Beverages Data

This file contains data about various beverages.

## Data Structure

The data is structured as an array of objects, where each object represents a beverage. Each beverage object has the following properties:

- `nr`: Beverage number
- `artikelid`: Article ID
- `varnummer`: Variant number
- `namn`: Name of the beverage
- `namn2`: Additional name information
- `prisinklmoms`: Price including VAT
- `volymiml`: Volume in milliliters
- `prisperliter`: Price per liter
- `saljstart`: Date of sale start
- `slutlev`: End of sale
- `varugrupp`: Type of beverage
- `forpackning`: Packaging
- `forslutning`: Closure type
- `ursprung`: Origin
- `ursprunglandnamn`: Country of origin
- `producent`: Producer
- `leverantor`: Supplier
- `argang`: Vintage
- `provadargang`: Tasted vintage
- `alkoholhalt`: Alcohol content
- `modul`: Module
- `sortiment`: Assortment
- `ekologisk`: Organic (1 for true, 0 for false)
- `koscher`: Kosher (1 for true, 0 for false)
- `stock`: Stock quantity
- `available`: Availability (true/false)
- `category`: Beverage category

# Database Model

This file contains data about users stored in the database.

## Data Structure

The data is structured as an array of objects, where each object represents a user. Each user object has the following properties:

- `user_id`: User ID
- `credentials`: User credentials (0-VIP, 1-Bartender, 3-Waiter)
- `password`: User password
- `username`: Username
- `first_name`: User's first name
- `last_name`: User's last name
- `email`: User's email address
- `phone`: User's phone number

# Dishes Data

This file contains data about various dishes available.

## Data Structure

The data is structured as an array of objects, where each object represents a dish. Each dish object has the following properties:

- `nr`: Dish number
- `name`: Name of the dish
- `priceinclvat`: Price including VAT
- `stock`: Stock quantity
- `category`: Category of the dish
- `description`: Description of the dish
- `available`: Availability (true/false)
- `ingredients`: Ingredients used in the dish


# Model Data

This file contains the model of the application, which keeps track of information involved in the activities within the application.

## Description

The model stores data in various ways, including simple variables and data structures. It maintains information that can change over time and is crucial for the application's functionality.

## Data Structure

The model data is stored in a variable called `modelData`, which contains the following properties:

- `orders`: An array storing information about orders made within the application.
- `productAttributes`: An array of attributes related to products.
- `dishAttributes`: An array of attributes related to dishes.


# Dictionary

This file defines two structures, `cnst` and `dict`, containing constants and strings used throughout the program. This dictionary facilitates internationalization and localization efforts by centralizing strings and allowing for easy translation.

## Constants (`cnst`)

The `cnst` structure stores values that remain constant during the program's execution.

## Dictionary (`dict`)

The `dict` structure contains strings used in the program, allowing for easy translation and runtime insertion using the correct key.

### English (`eng`)

- **Menu Categories**:
  - Beers
  - Wines
  - Spirits
  - Specials
  - Food menu
  - Drinks menu

- **Alcohol Content**:
  - Any alcohol content
  - Less than 5%
  - 5% - 10%
  - 10% - Less than 20%
  - 20% - Less than 30%
  - 30% - 40%
  - Greater than 40%

- **Food Categories**:
  - All
  - Snacks
  - Appetizers
  - Main Courses
  - Vegetarian
  - Desserts

- **Order Actions**:
  - Save
  - Add new customer
  - Previous customer
  - Next customer
  - Show order
  - Pay button
  - Pay at bar
  - Pay by credits
  - New order
  - Close payment window

- **Payment Related**:
  - Total price
  - Choose payment
  - Empty order
  - Bar payment
  - Credits payment
  - Credits
  - Not enough credits

- **Product Attributes**:
  - Price
  - Quantity
  - Category
  - Packaging
  - Captype
  - Country of Origin
  - Alcohol Strength
  - Description

- **User Interface**:
  - Login screen
  - Username
  - Password
  - Exit

- **Bartender View**:
  - All food
  - All drinks
  - Orders
  - Inventory
  - VIP customers
  - Security
  - Logout

- **Other UI Elements**:
  - Add
  - Remove
  - Confirm
  - Exit

- **Confirmation Messages**:
  - Are you sure...
  - This choice cannot be undone

- **Form Prompts**:
  - Add item
  - Security call confirmation

### Russian (`rus`)

(Translated strings corresponding to the English ones)

### Swedish (`swe`)

(Translated strings corresponding to the English ones)


# db_model.js

This JavaScript file `db_model.js` contains functions related to interacting with the database, including fetching user data, managing credits, updating stock levels of items, and filtering items by category or name.

## User Functions

- `getAllUsers`: Retrieves all users from the database.
- `getAllUserNames`: Retrieves the usernames of all users from the database.
- `getCredits`: Retrieves the credits of a specific user.
- `increaseCredits`: Increases the credits of a specific user.
- `decreaseCredits`: Decreases the credits of a specific user.
- `getUser`: Retrieves a user by their user ID.
- `getUserID`: Retrieves a user's ID by their username.
- `checkPassword`: Checks if the provided password matches the password of the given username.

## Beverage Functions

- `updateStock`: Updates the stock level of a specific beverage item.
- `decreaseStock`: Decreases the stock level of a specific beverage item by one.
- `getBeverage`: Retrieves a beverage item by its item number.
- `getAllBeverages`: Retrieves all beverage items from the database.
- `filterBeveragesByCategory`: Filters beverage items by category.
- `filterBeveragesByName`: Filters beverage items by name.

## Dish Functions

- `getDish`: Retrieves a dish item by its item number.
- `getAllDishes`: Retrieves all dish items from the database.
- `filterDishesByCategory`: Filters dish items by category.
- `filterDishesByName`: Filters dish items by name.

## Stock Management Functions

- `decreaseStockAllMenu`: Decreases the stock level of a specific menu item (dish or beverage) by one.
- `increaseStockAllMenu`: Increases the stock level of a specific menu item (dish or beverage) by one.


# index.html

## Document Structure:
- **Document Type Declaration**: `<!DOCTYPE html>`
- **HTML Root Element**: `<html lang="en">`

## Head Section:
- **Metadata**: Charset, Title, Description, Keywords
- **Viewport Configuration**: Responsive design settings
- **Favicon**: Link to the favicon image
- **External CSS**: Link to an external CSS file (`style.css`)
- **External Scripts**: Links to various jQuery and JavaScript files for functionality
- **Google Fonts**: Link to Google Fonts for custom fonts
- **CSS Icons**: Link to Font Awesome CSS for icons

## Body Section:
- **Header**: Contains buttons for login/logout, undo/redo, language selection
- **Login Container**: Container for user login interface
- **VIP Customer View**: Contains menus for drinks and food selection, order management, customer options, and pop-up window for orders
- **Employee View**: Contains control buttons for different views (orders, inventory, VIP users), menus for orders, inventory, VIP users, pop-up windows for security confirmation, item removal confirmation, item addition dialogue, discount, and change order dialogue

## External Scripts (Bottom of Body):
- **JQuery**: Link to the jQuery library
- **Load Database**: Script to load database files (commented out)

# style.css
Contains the styling of the index.html file.

# Bartender.js

## Overview
`Bartender.js` is a JavaScript file containing functions for managing orders, inventory, and VIP users in a bartender application. It provides features such as toggling between different views, creating and updating orders, managing inventory, and handling VIP user interactions.

## Functions

### `toggleView(buttonID)`
- Description: Toggles between order, inventory, and VIP view based on the button clicked.
- Parameters:
  - `buttonID`: ID of the button clicked to toggle the view.

### Order Functions
1. `createOrderElement(order)`
   - Description: Creates an HTML element for an order.
   - Parameters:
     - `order`: Order details.
   
2. `updateOrderView()`
   - Description: Redraws the order view using the order model.

3. `applyOrderFilter(category)`
   - Description: Filters orders based on the specified category.

4. `createBillElement(order_id, suborder_index, productName, quantity)`
   - Description: Creates a bill element with the name and quantity of a product in the order.

5. `showOrder(order_id)`
   - Description: Shows order details in the right column.

6. `change_order(order_id, suborder_index, productName, quantity)`
   - Description: Opens a window to change the quantity of a product within an order.

7. `updateOrder(order_id, suborder_index, productName, quantity)`
   - Description: Updates the order database with a new quantity of a product.

8. `pay_order(n, order_ID)`
   - Description: Opens the pay dialogue for the order.

9. `finishPayment(order_ID)`
   - Description: Marks the order as paid and updates the view.

### Inventory Functions
1. `createAvailableKey(ID)`
   - Description: Creates an HTML button to mark the chosen item in inventory as unavailable.

2. `createRemoveKey(ID)`
   - Description: Creates an HTML button to permanently remove an item from inventory.

3. `createRefillKey(ID, price)`
   - Description: Creates an HTML button to refill an item in inventory.

4. `createInventoryElement(product)`
   - Description: Creates an HTML element for an inventory item.

5. `applyInventoryFilter(category)`
   - Description: Filters inventory items based on the specified category.

6. `updateInventoryView()`
   - Description: Redraws the inventory view using the inventory model.

7. `add_refill(ID, price)` / `remove_refill(ID, price)`
   - Description: Adds/removes refill of inventory.

8. `sendRefill()`
   - Description: Sends the refill order.

### VIP-User Functions
1. `createUserElement(user)`
   - Description: Creates an HTML element for a VIP user.

2. `updateVIPView()`
   - Description: Redraws the VIP view from the user database.

3. `showUser(ID)`
   - Description: Shows details of the selected user.

4. `addCredits()`
   - Description: Updates the credits in the database and then updates the view.

### Miscellaneous Functions
1. `openSecurity()`
   - Description: Opens the security dialogue.

2. `callSecurity()`
   - Description: Calls security.

3. `toggleWindow(ID)`
   - Description: Toggles the visibility of a pop-up window.

4. `exitWindow(ID)`
   - Description: Exits a pop-up window.

## Usage
- The functions can be called based on user interactions such as button clicks or system events.
- Ensure proper parameters are provided when calling each function to achieve the desired behavior.

# Customer.js Documentation

## Overview
The `Customer.js` file contains JavaScript code for managing customer orders and interactions in a restaurant or similar establishment. It provides functionality for adding items to orders, managing order quantities, handling payments, and more. This documentation aims to explain the various functions and structures present in the code. The `Customer.js` file provides essential functionality for managing customer orders and interactions in a restaurant setting. It includes features for adding, removing, and viewing items in orders, as well as handling payments and language settings. The provided documentation aims to facilitate understanding and usage of the codebase.

## Structures
- **OrderDict**: This is a dictionary representing the order of one person. Each key-value pair consists of the name of a dish and an array containing the price of the dish and the quantity ordered.
- **all_orders**: This is an array of all customer orders. Each element in the array is a tuple containing an `OrderDict` and the total price of the order.
- **current_customer**: An integer representing the index of the current customer being served.
- **total_price**: The total price of the current order.
- **current_order_id**: An identifier for the current order.
- **undo_redo**: An array used for implementing undo and redo functionality. It stores the history of changes to orders.
- **historyIndex**: An index used to navigate through the `undo_redo` array.
- **user_credits**: The number of credits available to the user for payment.
- **user_id**: Identifier for the current user.
- **limit**: A string indicating any limitations or constraints on the order process.
- **lang**: The language setting for the user interface.

## Functions
1. `change_language(new_lang)`:
   - Updates the language setting and calls the `translation()` and `updateMenu()` functions to reflect the change in the user interface.

2. `getAlcoholRange(alcoholContent)`:
   - Determines the alcohol range category based on the alcohol content provided.

3. `applyFilter(category, alcoholFilter)`:
   - Filters menu items based on category and alcohol content.

4. `updateMenu()`:
   - Updates the menu display based on available items and language settings.

5. `translation()`:
   - Translates various elements of the user interface based on the selected language.

6. `saveState()`:
   - Saves the current state of the order for implementing undo and redo functionality.

7. `undo()` and `redo()`:
   - Allows undoing and redoing changes to the order history.

8. `SwapDivsWithClick(div1, div2)`:
   - Toggles between different menu pages (food and drinks).

9. `add_element(name, price)`:
   - Adds an item to the current order.

10. `remove_element(name, price)`:
    - Removes an item from the current order.

11. `add_customer()`, `save_order()`, `previous_customer()`, and `next_customer()`:
    - Functions for managing customers, adding new customers, and navigating between customers.

12. `paymentPopup()`` and `hidePaymentPopup()`:
    - Display and hide the payment popup window.

13. `pushOrder(all_orders, current_order_id, total_price, paid)`:
    - Pushes the current order to the database.

14. `messagePaymentBar()`` and `messagePaymentCredits()`:
    - Displays payment confirmation messages for bar and credits payment methods.

15. `newOrder()`:
    - Resets all variables for starting a new order.

16. `displayOrder()`:
    - Displays the current order and any limitations or constraints.

17. `showOrders()`:
    - Displays a pop-up window with all orders and their details.

18. `drag(event, name, price)`, `drop_to_menu(ev)`, and `drop_to_order(ev)`:
    - Functions for handling drag and drop functionality between menu and order sections.

# login.js

This file contains JavaScript functions related to user authentication and view management. These functions provide the necessary logic to handle user authentication and manage the display of different views within the application.

## Functions
1. `login()`

This function handles user login. It retrieves the username and password from the input fields, checks the credentials using the `checkPassword()` function, and then determines the appropriate view to display based on the user's role.

- If the login is successful, it sets the `current_view` variable accordingly and displays the appropriate view.
- If the login fails, it displays an alert indicating invalid credentials.

2. `display_view(type_view)`

This function controls the display of different views based on the `type_view` parameter.

- **Parameters**:
  - `type_view`: A string representing the type of view to display.

- **Functionality**:
  - Depending on the `type_view`, it adjusts the visibility of elements on the page to show the desired view.
  - It handles different views such as bartender, waiter, customer, VIP customer, and logout.
  - Updates UI elements and button actions based on the selected view.

- **View Types**:
  - **Bartender**: Displays inventory management and relevant actions.
  - **Waiter**: Similar to bartender view but tailored for waiter responsibilities.
  - **Customer**: Shows the menu and allows customers to place orders.
  - **VIP Customer**: Similar to the customer view with additional features for VIP customers.
  - **Logout**: Returns to the login screen.

