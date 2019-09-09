// BUDGET CONTROLLER
var budgetController = (function () {

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
                type: document.querySelector(DOMStrings.inputType).value,
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

        // 1. get field input data
        const input = UICtrl.getInput();

        console.log(input);

        // 2. Add item to the budget controller

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
