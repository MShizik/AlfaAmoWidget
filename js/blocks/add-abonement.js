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
    ];
    
    
    addAbonementSearchTable = new SearchWithTable(document.querySelector("#add_abonement_table_container"), document.querySelector("#add_abonement_search_input"), abonementTableData, abonementTableColumns, addAbonementTableCheckBoxBehavior, addAbonementBtn);
    

    fetch('https://alfa-amo.ru/testwidget/load_abonements.php?branch_id=' + filialSelector.option + "&user_id=" + user_id , {
            method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        toggleConnectionMarks(data['amo'], data['alfa']);
        createConnectionTips();
        abonementTableData = data["abonements"];
        addAbonementSearchTable.basicData = data["abonements"];
        addAbonementSearchTable.tableObj.insertData(null, abonementTableData);
        addAbonementSearchTable.tableObj.setUpRowOnClickHandler();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

addAbonementBtn.addEventListener("click", () => {
    if (addAbonementBtn.classList.contains("active")){
        addAbonementContentBlock.classList.add("used");

        var checkedCheckboxes = addAbonementContentBlock.querySelectorAll("input:checked");

        var parsedTableData = [];

        checkedCheckboxes.forEach(checkbox => parsedTableData.push(abonementTableData[Number(checkbox.id.replace("add_abonement_table_container_row_", "").replace("_checkbox", ""))]));
    
        var parentSelectorData = parentSelector.option;
        var studentSelectorData = studentSelector.option;
        var filialSelectorData = filialSelector.option;


        var parsedData = {
            "user_id" : user_id,
            "parent_id" : parentSelectorData,
            "student_id" : studentSelectorData,
            "branch_id" : filialSelectorData,
            "data" : parsedTableData
        };

        fetch('https://alfa-amo.ru/adm/?token=aiUWVpSyAFs0BoEcMJTa9n3v&action=widget_add_abonement' , {
            method: 'POST',
            body : JSON.stringify(parsedData)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function resetAddAbonement(){
    addAbonementContentBlock.classList.remove("used");
    addAbonementBtn.classList.remove("active");
    addAbonementBtn.classList.add("inactive");

    abonementTableData = [];
    if (addAbonementSearchTable != null){
        addAbonementSearchTable.basicData = abonementTableData;
        addAbonementSearchTable.tableObj.insertData(null, abonementTableData);
        addAbonementSearchTable.tableObj.setUpRowOnClickHandler();
    }
}