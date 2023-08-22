var addPaymentContentBlock = document.querySelector("#add-payment-content-block");
var addPaymentBtn = document.querySelector("#add-payment-btn");

var addPaymentCasData = [];
var addPaymentCategoryData = [];
var addPaymentIncomeData = [];



var addPaymentCasSelector = null;
var addPaymentCategorySelector = null;
var addPaymentIncomeSelector = null;

addPaymentContentBlock.addEventListener("click", () => {
    if (addPaymentContentBlock.classList.contains("active") || addPaymentContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addPaymentContentBlock);

    addPaymentCasSelector = ItcCustomSelect.create('#add_payment_cas_selector', {
        name: 'add_payment_cas_selector',
        targetValue: 'Выбор',
        options: addPaymentCasData,
        callback : selectorActivateBtn
    });

    addPaymentCasSelector.updateData([]);

    addPaymentCategorySelector = ItcCustomSelect.create('#add_payment_category_selector', {
        name: 'add_payment_category_selector',
        targetValue: 'Выбор',
        options: addPaymentCategoryData,
        callback : function() {
            var filteredIncomeData = filterPayItemData(addPaymentIncomeData, addPaymentCategorySelector.option);
            addPaymentIncomeSelector.updateData(filteredIncomeData);
            selectorActivateBtn();
        }
    });

    addPaymentCategorySelector.updateData([]);

    addPaymentIncomeSelector = ItcCustomSelect.create('#add_payment_income_selector', {
        name: 'add_payment_income_selector',
        targetValue: 'Выбор',
        options: addPaymentIncomeData,
        callback : selectorActivateBtn
    });

    addPaymentIncomeSelector.updateData([]);

    fetch('https://alfa-amo.ru/testwidget/load_pay.php?branch_id=' + filialSelector.option +  "&user_id=" + user_id , {
            method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        toggleConnectionMarks(data['amo'], data['alfa']);
        createConnectionTips();

        addPaymentCategoryData = filterPayItemCategoryData(data['pay_item_category']);
        addPaymentCasData = filterPayAccountData(data['pay_account']);

        addPaymentCasSelector.updateData(addPaymentCasData);
        addPaymentCategorySelector.updateData(addPaymentCategoryData);

        addPaymentIncomeData = data['pay_item'];
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


addPaymentBtn.addEventListener("click" , () => {
    if (addPaymentBtn.classList.contains("active")){
        addPaymentContentBlock.classList.add("used");

        var selectedCas = addPaymentCasSelector.option;
        var selectedCategory = addPaymentCategorySelector.option;
        var selectedIncome = addPaymentIncomeSelector.option;

        var selectedBranch = filialSelector.option;
        var selectedStudent = studentSelector.option;

        var lead_id = 0;
        var link = document.location.href;
        var regex = /^https:\/\/.*?\/.*?\/.*?\/(.*?)$/;
        var result = regex.exec(link);

        if (result && result.length > 1) {
            lead_id = result[1];
            console.log(lead_id);
        }

        var budgetBlock = document.querySelector('div[data-id="budget"');

        if (budgetBlock != null){
            var parsedData = {
                "lead_id" : lead_id,
                "student_id" : selectedStudent,
                "user_id" : user_id,
                "branch_id" : selectedBranch,
                "pay_account_id" : selectedCas,
                "pay_item_category_id" : selectedCategory,
                "pay_item_id" : selectedIncome,
                "sum" : budgetBlock.querySelector("tester").innerHTML.replaceAll(" ", "")
            }

            fetch('https://alfa-amo.ru/adm/?token=aiUWVpSyAFs0BoEcMJTa9n3v&action=widget_add_payment' , {
                method: 'POST',
                body : JSON.stringify(parsedData)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
});


var selectorActivateBtn = function(){
    let wrapper = document.querySelector("#add-payment-content-block");

    
    if (wrapper.querySelectorAll(".itc-select__option_selected").length === 3){
        addPaymentBtn.classList.remove("inactive");
        addPaymentBtn.classList.add("active");
    }else{
        addPaymentBtn.classList.remove("active");
        addPaymentBtn.classList.add("inactive");
    }
}

function filterPayItemCategoryData(data){
    var result = [];
    data.forEach(category => {
        result.push([category['id'], category['name']]);
    });

    return result;
}

function filterPayAccountData(data){
    var result = [];
    data.forEach(account => {
        result.push([account['id'], account['name']]);
    });

    return result;
}

function filterPayItemData(data, categoryId = -1){
    var result = [];
    data.forEach(item => {
        if (categoryId != -1 && item['id'] == categoryId){
            result.push([item['id'], item['name']]);
        }
    });

    return result;
}

function resetAddPayment(){
    addPaymentContentBlock.classList.remove("used");
    addPaymentBtn.classList.remove("active");
    addPaymentBtn.classList.add("inactive");

    addPaymentCasSelector != null && addPaymentCasSelector.updateData([]);
    addPaymentCategorySelector != null && addPaymentCategorySelector.updateData([]);
    addPaymentIncomeSelector != null && addPaymentIncomeSelector.updateData([]);
}



