// BUDGET CONTROLLER
var budgetController = (function() {

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
        addItem: function(type, desc, value) {
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

        testing: function() {
            console.log(data);
        }
    };

})();

// UI CONTROLLER
var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either exp or inc
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">\n' +
                        '<div class="item__description">%description%</div>\n' +
                            '<div class="right clearfix">\n' +
                                '<div class="item__value">%value%</div>\n' +
                                '<div class="item__delete">\n' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                                '</div>\n' +
                            '</div>\n' +
                        ' </div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%">\n' +
                            '<div class="item__description">%description%</div>\n' +
                            '<div class="right clearfix">\n' +
                                '<div class="item__value">%value%</div>\n' +
                                '<div class="item__percentage">21%</div>\n' +
                                '<div class="item__delete">\n' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                                '</div>\n' +
                            '</div>\n' +
                        '</div>';
            }

            // Replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // clear descript and value input fields after adding list item
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
            });
            fieldsArr[0].focus();
        },

        getDomStrings: function() {
            return DOMStrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDomStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.code === 'Enter') {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {

        // 1. Calculate budget

        // 2. Return budget

        // 3. Display budget on the UI
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. get field input data
        input = UICtrl.getInput();

        if (input.description.length !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
