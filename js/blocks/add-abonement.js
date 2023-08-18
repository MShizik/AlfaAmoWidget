var addAbonementContentBlock = document.querySelector("#add-abonement-content-block");
var addAbonementBtn = document.querySelector("#add-abonement-btn");

var addAbonementSearchTable = null;

var abonementTableData = [];
var abonementTableColumns = [];

var addAbonementTableCheckBoxBehavior = function(table){
    if (table.querySelectorAll('input:checked').length > 0){
        addAbonementBtn.classList.remove("inactive");
        addAbonementBtn.classList.add("active");
    }else{
        addAbonementBtn.classList.remove("active");
        addAbonementBtn.classList.add("inactive");
    }
}

addAbonementContentBlock.addEventListener("click", () => {
    if (addAbonementContentBlock.classList.contains("active") || addAbonementContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addAbonementContentBlock);

    abonementTableColumns = [
        '',
        'Название абонемента',
        'Тарификация',
        'Стоимость',
        'Период действия'
    ];
    abonementTableData = [
        {
            name: "Абонемент 1",
            tariff: 'Тариф 1',
            price: '20 000 р.',
            period: '03.08.2023–03.09.2023'
        }, {
            name: "Абонемент 2",
            tariff: 'Тариф 1',
            price: '20 000 р.',
            period: '03.08.2023–03.09.2023'
        }, {
            name: "Абонемент 3",
            tariff: 'Тариф 1',
            price: '20 000 р.',
            period: '03.08.2023–03.09.2023'
        }, {
            name: "Абонемент 4 с очень длинным названием",
            tariff: 'Тариф 1',
            price: '20 000 р.',
            period: '03.08.2023–03.09.2023'
        }
    ];
    
    
    addAbonementSearchTable = new SearchWithTable(document.querySelector("#add_abonement_table_container"), document.querySelector("#add_abonement_search_input"), abonementTableData, abonementTableColumns, addAbonementTableCheckBoxBehavior, addAbonementBtn);
    
});

addAbonementBtn.addEventListener("click", () => {
    if (addAbonementBtn.classList.contains("active")){
        addAbonementBtn.classList.add("used");

        var checkedCheckboxes = addAbonementContentBlock.querySelectorAll("input:checked");

        var parsedTableData = [];

        checkedCheckboxes.forEach(checkbox => parsedTableData.push(abonementTableData[Number(checkbox.id.replace("add_abonement_table_container_row_", "").replace("_checkbox", ""))]));
    
        var parentSelectorData = parentSelector.value;
        var studentSelectorData = studentSelector.value;
        var filialSelectorData = filialSelector.value;


        var parsedData = {
            "selectedParent" : parentSelectorData,
            "selectedStudent" : studentSelectorData,
            "selectedFilial" : filialSelectorData,
            "data" : parsedTableData
        };
    }
});