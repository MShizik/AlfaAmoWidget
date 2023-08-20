var addPaymentContentBlock = document.querySelector("#add-payment-content-block");
var addPaymentBtn = document.querySelector("#add-payment-btn");


var addPaymentCasSelector = null;
var addPaymentCategorySelector = null;
var addPaymentIncomeSelector = null;

addPaymentContentBlock.addEventListener("click", () => {
    if (addPaymentContentBlock.classList.contains("active") || addPaymentContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addPaymentContentBlock);

    addPaymentCasSelector = ItcCustomSelect.create('#add_payment_cas_selector', {
        name: 'add_payment_cas_selector',
        targetValue: 'Выбор',
        options: [
            [
                'choose1', 'Выбор 1'
            ],
            [
                'choose2', 'Выбор 2'
            ],
            [
                'choose3', 'Выбор 3'
            ],
            [
                'choose4', 'Выбор 4'
            ]
        ],
        callback : selectorActivateBtn
    });

    addPaymentCategorySelector = ItcCustomSelect.create('#add_payment_category_selector', {
        name: 'add_payment_category_selector',
        targetValue: 'Выбор',
        options: [
            [
                'choose1', 'Выбор 1'
            ],
            [
                'choose2', 'Выбор 2'
            ],
            [
                'choose3', 'Выбор 3'
            ],
            [
                'choose4', 'Выбор 4'
            ]
        ],
        callback : selectorActivateBtn
    });

    addPaymentIncomeSelector = ItcCustomSelect.create('#add_payment_income_selector', {
        name: 'add_payment_income_selector',
        targetValue: 'Выбор',
        options: [
            [
                'choose1', 'Выбор 1'
            ],
            [
                'choose2', 'Выбор 2'
            ],
            [
                'choose3', 'Выбор 3'
            ],
            [
                'choose4', 'Выбор 4'
            ]
        ],
        callback : selectorActivateBtn
    });
});


addPaymentBtn.addEventListener("click" , () => {
    if (addPaymentBtn.classList.contains("active")){
        addPaymentBtn.classList.add("used");

        var selectedCas = addPaymentCasSelector.value;
        var selectedCategory = addPaymentCategorySelector.value;
        var selectedIncome = addPaymentIncomeSelector.value;

        var parsedData = {
            "user_id" : user_id,
            "selectedCas" : selectedCas,
            "selectedCategory" : selectedCategory,
            "selectedIncome" : selectedIncome
        }
    }
});


var selectorActivateBtn = function(){
    let wrapper = document.querySelector("#add-payment-content-block");
    
    if (wrapper.querySelectorAll(".itc-select__option_selected").length === 3){
        addPaymentBtn.classList.remove("inactive");
        addPaymentBtn.classList.add("active");
    }
}



