// BUDGET CONTROLLER
var budgetController = (function () {

})();

// UI CONTROLLER
var UIController = (function () {

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
    var controllAddItem = function () {
        // 1. get field input data

        // 2. Add item to the budget controller

        // 3. Add item to the UI

        // 4. Calculate budget

        // 5. Display budget on the UI

        console.log('It works');
    };

    document.querySelector('.add__btn').addEventListener('click', controllAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' || event.code === 'Enter') {
            controllAddItem();
        }
    });
})(budgetController, UIController);
