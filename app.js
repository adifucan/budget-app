// BUDGET CONTROLLER
var budgetController = (function () {

    // function constructors for expenses and incomes
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // all data for expenses and incomes
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, desc, value) {
            var newItem, ID;

            // Create new ID
            // ID = last ID + 1 or 0 if empty
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;

            // Create new item based on 'exp' or 'inc' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, value);
            }

            // push new item to data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    };

})();

// UI CONTROLLER
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either exp or inc
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        getDomStrings: function () {
            return DOMStrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDomStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', controllAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' || event.code === 'Enter') {
                controllAddItem();
            }
        });
    };

    var controllAddItem = function () {
        var input, newItem;

        // 1. get field input data
        input = UICtrl.getInput();

        // 2. Add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add item to the UI

        // 4. Calculate budget

        // 5. Display budget on the UI
    };

    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
