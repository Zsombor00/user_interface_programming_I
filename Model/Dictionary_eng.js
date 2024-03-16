// ===========================================================================
// In this file we define two structures that will contain the constants,
// as well as the Strings that will be used in the program. It is considered
// good programming hygiene to remove constant values and Strings from the
// actual code. This renders the code easier to read and also easier to modify
// when needed.
//
// ===========================================================================
// The cnst structure will store all kinds of values that will not be modified
// during the running of the program.
//
const cnst = {

}

// THe dict structure will contain all strings that will be used in the program
// and the strings can easily be inserted at runtime through calls to the dict
// with the correct key.
//

// Current dictionary
var dict = {};

const dict_eng = {
    // Log in screen
    'login': "Log in",
    'username': 'Username:',
    'password': 'Password:',

    // Customer view


    // Bartender view
    'ord': "Orders",
    'inv': "Inventory",
    'vip': "VIP customers",
    'security' : 'Security',
    'logout': "Log In",

    'ord_text': "",
    'ordID' : 'Order ID: ',
    'tableNr' : ', Table number: ',
    'pay': 'Pay selected order',
    'pay_text': '',
    'split_bill': 'Split bill',
    'group_bill': 'Group bill',

    'inv_text': "",
    'inv_low': "These items are low in stock, consider refill:",
    'inv_norm': "These items are high in stock:",
    'refill': 'Refill',
    'unavailable': 'Mark as unavailable',
    'available': 'Mark as available',
    'remove': 'Remove permanently',
    'refill_text': 'List of selected items to refill will be shown here',
    'add_inv' : 'Add new item',
    'productName': "Product name: ",
    'price': ", Product price: ",
    'stock': ", Stock: ",
    'send_refill': "Place order",

    'vip_text': "",
    'add_vip': "Add new VIP",
    'credit': 'User profile',
    'credit_text': '',
    'credit_button': 'Add credits',
    'user_id': "User ID: ",
    'user_name': "User name: ",
    'current_credits': "Current credits: ",

    'remove_text_1': 'Are you sure you want to remove the following item: ',
    'remove_text_2': '(This choice can not be undone)',

    'add_item_text': 'Fill in the form below to add new item',

    'security_text_1': 'Are you sure you want to call sequrity?',
    'security_text_2': 'Security has been called, stay put.',
    'eng':{
        'all':'All',
        'Beers':'Beers',
        'Wines':'Wines',
        'Spirits':'Spirits',
        'Specials':'Specials',
        'Food_menu':'Food',
        'Drinks_menu':'Drinks',
        'AlcoholAll':'Any alcohol content',
        'alcohol5':"Less than 5%",
        'alcohol5_10':'5% - 10%',
        'alcohol10_20':'10% - Less than 20%',
        'alcohol20_30':'20% - Less than 30%',
        'alcohol30_40':'30% - 40%',
        'alcohol40':'Greater than 40%',
        'food_type0':'Type 1',
        'food_type1':'Type 2',
        'food_type2':'Type 3',
        'Title_order':'Your order ',
        'Order_list':'Your order here',
        'Customers_limit':'You have reached the limit of customers in one order.',
        'Items_limit':'You have reached the limit of items in one order for one customer.',
        'Quantity_limit':'You have reached the limit of the quantity of one item from the menu in the order.',
        'Save_order':'Save',
        'Add_new_customer':'Add new customer',
        'Previous_customer':'previous customer',
        'Next_customer':'Next customer',
        'Show_order':'Show order',
        'Pay_button':'Pay',
        'Pay_at_bar':'Pay at Bar',
        'Pay_by_credits':'Pay by Credits',
        'New_order':'Make new order',
        'Close_payment':'Close payment window',
        'Total_price':'Total price: ',
        'Choose_payment':'Choose payment method',
        'Empty_order':"You didn't choose any item from menu",
        'Bar_payment':'You chose to pay at the bar.',
        'Credits payment':'Your order was paid by credits.',
        'Credits':'Your number of credits: ',
        'Not enough credits':'You do not have enough credits. Please pay at the bar.',
        'Price':'Price: ',
        'Quantity':'Quantity: ',
        'Customer ':'Customer',
        'Add':'Add',
        'Remove':'Remove',
        'Category':'Category: ',
        'Packaging':'Category: ',
        'Captype':'Captype: ',
        'Country of Origin':'Country of Origin: ',
        'Alcohol Strength':'Alcohol Strength: '
    },
    'rus':{
        'all':'Всё',
        'Beers':'Пиво',
        'Wines':'Вино',
        'Spirits':'Крепкие напитки',
        'Specials':'Специальные предложения',
        'Food_menu':'Еда',
        'Drinks_menu':'Напитки',
        'AlcoholAll':'Любое содержание алкоголя',
        'alcohol5':"Меньше чем 5%",
        'alcohol5_10':'5% - 10%',
        'alcohol10_20':'10% - Меньше чем  20%',
        'alcohol20_30':'20% - Меньше чем  30%',
        'alcohol30_40':'30% - 40%',
        'alcohol40':'Выше чем 40%',
        'food_type0':'Тип 1',
        'food_type1':'Тип 2',
        'food_type2':'Тип 3',
        'Title_order':'Ваш заказ ',
        'Order_list':'Ваш заказ здесь',
        'Customers_limit':'Вы достигли максимального количества клиентов в одном заказе.',
        'Items_limit':'Вы достигли максимального количества элементов в одном заказе для одного клиента.',
        'Quantity_limit':'Вы достигли максимального количества одного элемента из меню в заказе.',
        'Save_order':'Сохранить',
        'Saved_order':'Заказ сохранен',
        'Add_new_customer':'Добавить клиента',
        'Previous_customer':'Предыдущий клиент',
        'Next_customer':'Следующий клиент',
        'Show_order':'Показать заказ',
        'Pay_button':'Оплатит',
        'Pay_at_bar':'Оплатить в баре',
        'Pay_by_credits':'Оплатить баллами',
        'New_order':'Сделать новый заказ',
        'Close_payment':'Закрыть окно оплаты',
        'Total_price':'Общая стоимость: ',
        'Choose_payment':'Выберите метод оплаты',
        'Empty_order':"Вы не выбрали ни одной позиции в меню",
        'Bar_payment':'Вы выбрали оплатить в баре',
        'Credits payment':'Ваш заказ был оплачен баллами',
        'Credits':'Ваше количество баллов: ',
        'Not enough credits':'У вас недостаточное количетво балов. Пожалуйста, оплатить в баре',
        'Price':'Цена: ',
        'Quantity':'Количество: ',
        'Customer ':'Клиент',
        'Add':'Добавить',
        'Remove':'Удалить',
        'Category':'Категория: ',
        'Packaging':'Упаковка: ',
        'Captype':'Captype: ',
        'Country of Origin':'Страна производства: ',
        'Alcohol Strength':'Крепость: '
    }

}





// ===========================================================================
// END OF FILE
// ===========================================================================