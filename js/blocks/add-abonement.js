var addAbonementContentBlock = document.querySelector("#add-abonement-content-block");
var addAbonementBtn = document.querySelector("#add-abonement-btn");
var choiceContainer = document.querySelector("#add-abonement-data-container");

var addAbonementSearchTable = null;

var abonementTableData = [];
var abonementTableColumns = [];

var addAbonementsActiveGroups = [];

var addAbonementTableCheckBoxBehavior = function(table, checkbox){
    if (table.querySelectorAll('.block_of_choice').length > 0){
        addAbonementBtn.classList.remove("inactive");
        addAbonementBtn.classList.add("active");
    }else{
        addAbonementBtn.classList.remove("active");
        addAbonementBtn.classList.add("inactive");
    }

    var checkboxCell = table.querySelector(`td:has(#${checkbox.id})`);
    var name = checkboxCell.nextSibling.querySelector("div").innerHTML;
    if (checkbox.checked){
        var dataForGeneration = {
            "id" : getIdFromString(name),
            "name" : name
        };

        if (choiceContainer.querySelector("#add_abonement_block_of_choice_" + dataForGeneration['id']) === null ){

            var filialSelectorIndex = filialSelector.option;

            var block_of_choice = document.createElement("div");
            block_of_choice.classList.add("block_of_choice");
            block_of_choice.id = "add_abonement_block_of_choice_" + dataForGeneration['id'];
            choiceContainer.appendChild(block_of_choice);
    
            var calendar = generateAbonementCalendar(dataForGeneration, "#" + block_of_choice.id + "");

            var lessonSelectionRow = document.createElement("div");
            lessonSelectionRow.classList.add("selection-row");
            lessonSelectionRow.classList.add("vertical");
            block_of_choice.appendChild(lessonSelectionRow);
        
            var lessonSelectorTitle = document.createElement("div");
            lessonSelectorTitle.innerHTML = "Выберите уроки:";
            lessonSelectionRow.appendChild(lessonSelectorTitle);

            var lessonSelectorBlock = document.createElement("div");
            lessonSelectorBlock.classList.add("selector");

            var lessonSelectorBody = document.createElement("div");
            lessonSelectorBody.id = "add_abonement_lesson_selector_" + dataForGeneration['id'];

            lessonSelectorBlock.appendChild(lessonSelectorBody);

            lessonSelectionRow.appendChild(lessonSelectorBlock);

            var lessonTypes = reconstructLessonTypes(filialSelectorIndex, lessonTypesByBranches);

            lessonSearchSelector = ItcCustomMultipleSelect.create('#' + lessonSelectorBody.id, {
                name: lessonSelectorBody.id,
                targetValue: 'Выбор',
                options: lessonTypes,
                callback: selectorAfterSelectHandler
            });
            
            var subjectSelectionRow = document.createElement("div");
            subjectSelectionRow.classList.add("selection-row");
            subjectSelectionRow.classList.add("vertical");
            block_of_choice.appendChild(subjectSelectionRow);

            var subjectSelectorTitle = document.createElement("div");
            subjectSelectorTitle.innerHTML = "Выберите предметы:";
            subjectSelectionRow.appendChild(subjectSelectorTitle);

            var subjectSelectorBlock = document.createElement("div");
            subjectSelectorBlock.classList.add("selector");

            var subjectSelectorBody = document.createElement("div");
            subjectSelectorBody.id = "add_abonement_subject_selector_" + dataForGeneration['id'];

            subjectSelectorBlock.appendChild(subjectSelectorBody);

            subjectSelectionRow.appendChild(subjectSelectorBlock);


            var subjects = reconstructSubjects(filialSelectorIndex, subjectsByBranches);

            subjectSearchSelector = ItcCustomMultipleSelect.create('#' + subjectSelectorBody.id, {
                name: subjectSelectorBody.id,
                targetValue: 'Выбор',
                options: subjects,
                callback: selectorAfterSelectHandler
            });

            var checkbox = generateAbonementPayCheckBox(dataForGeneration['name']);
            block_of_choice.appendChild(checkbox);
    
            addAbonementsActiveGroups.push(block_of_choice);
        }
    }else{
        var deletedId = deleteBlockOfChoice(name, "#" + choiceContainer.id);
        addAbonementsActiveGroups = addAbonementsActiveGroups.filter(block => block.getId() !== deletedId);
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
    
    
    addAbonementSearchTable = new SearchWithTable(document.querySelector("#add_abonement_table_container"), document.querySelector("#add_abonement_search_input"), abonementTableData, abonementTableColumns, addAbonementTableCheckBoxBehavior, addAbonementBtn,onUpdate);
    

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

function onUpdate(tableObj){
    console.log("sh1");
    addAbonementsActiveGroups.forEach(active => {
        var name = active.querySelector(".date_picker_input label").innerHTML;
        var rowId = null;
        console.log(name);
        abonementTableData.forEach((row, id) => {
            if (row['name'] === name){
                rowId = id;
            }
        });

        console.log(rowId);

        if (rowId != null){

            var checkbox = tableObj.tbody.querySelector("#add_abonement_table_container_row_" + rowId + "_checkbox");
            checkbox.checked = true;

        }

        
    });
}

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

function generateAbonementCalendar(data, insertionPlace){
    let placeToInsert = document.querySelector(insertionPlace);
    var id = data["id"];
    var name = data["name"];
    generateAbonementCalendarBody("add_abonement_calendar_" + getIdFromString(name), name, placeToInsert);
    return new CustomCalendar(document.querySelector(`#add_abonement_calendar_${id}`), null, null);
}

function generateAbonementPayCheckBox(name){
    var id = "add_abonement_checkbox_" + getIdFromString(name);
    `<div class="task_checkbox">
        <input type="checkbox" class="custom-checkbox" id="add_as_lead" name="add_as_lead" value="yes">
        <label for="add_as_lead">Записать как лид</label>
    </div>`
    var checkbox = document.createElement("div");
    checkbox.classList.add("task_checkbox");

    var input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("custom-checkbox");
    input.id = id;
    input.name = id;
    
    var label = document.createElement("label");
    label.htmlFor = id;
    label.innerHTML = "Раздельный тип расчетов";

    checkbox.appendChild(input);
    checkbox.appendChild(label);

    return checkbox;
}

function deleteBlockOfChoice(name, basicContainer){
    var blockId = "add_abonement_block_of_choice_" + getIdFromString(name);
    var block = document.querySelector(`#${blockId}`);
    document.querySelector(basicContainer).removeChild(block);
    return blockId;
}

function getIdFromString(str){
    return str.replaceAll(' ', '').replaceAll("/", "").replaceAll(".","").replaceAll(",");
}

function generateAbonementCalendarBody(id, name, parent){
    const div1 = document.createElement('div');
    div1.setAttribute('class', 'calendar-wrapper');
    div1.setAttribute('id', id);

    const div2 = document.createElement('div');
    div2.setAttribute('class', 'date_picker');

    const div3 = document.createElement('div');
    div3.setAttribute('class', 'date_picker_input');

    const label = document.createElement('label');
    label.textContent = name;

    const div4 = document.createElement('div');
    div4.setAttribute('class', 'cal_input_block');

    const div5 = document.createElement('div');
    div5.setAttribute('class', 'cal_input_icon');

    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg1.setAttribute('width', '14');
    svg1.setAttribute('height', '14');
    svg1.setAttribute('viewbox', '0 0 14 14');
    svg1.setAttribute('fill', 'none');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('clip-rule', 'evenodd');
    path1.setAttribute('d', 'M2.25667 1.74459V0H3.9481V1.74459H10.0517V0H11.7431V1.74459H12.1105C13.7255 1.74459 13.9791 2.03447 14 3.45121V12.2503C14 13.489 13.8885 14 12.3656 14H1.64392C0.121022 14 0 13.6287 0 12.1248V3.62268C0.0204458 2.42723 0.136099 1.74459 1.7507 1.74459L2.25667 1.74459ZM1.35359 11.8814C1.35359 12.3546 1.4963 12.3861 1.80608 12.3861H12.2508C12.5602 12.3861 12.6469 12.3787 12.6469 11.9047V4.80285C12.6382 4.43703 12.5197 4.37272 12.2791 4.37272H1.69559C1.45479 4.37272 1.35029 4.42559 1.35359 4.7071L1.35359 11.8814Z');
    path1.setAttribute('fill', '#AFBCBE');

    svg1.appendChild(path1);
    div5.appendChild(svg1);

    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('class', 'cal_date_input first');
    input1.setAttribute('id', id + "_first_input");
    input1.setAttribute('placeholder', 'с ..___');
    input1.setAttribute('data-slots', '');

    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('class', 'cal_date_input second');
    input2.setAttribute('id', id + "_second_input");
    input2.setAttribute('placeholder', 'по ..___');
    input2.setAttribute('data-slots', '');

    const div6 = document.createElement('div');
    div6.setAttribute('class', 'cal_input_clear');

    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg2.setAttribute('width', '14');
    svg2.setAttribute('height', '14');
    svg2.setAttribute('viewbox', '0 0 14 14');
    svg2.setAttribute('fill', 'none');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12.8337 2.34175L11.6587 1.16675L7.00033 5.82508L2.34199 1.16675L1.16699 2.34175L5.82533 7.00008L1.16699 11.6584L2.34199 12.8334L7.00033 8.17508L11.6587 12.8334L12.8337 11.6584L8.17533 7.00008L12.8337 2.34175Z');
    path2.setAttribute('fill', '#AFBCBE');

    svg2.appendChild(path2);
    div6.appendChild(svg2);

    div4.appendChild(div5);
    div4.appendChild(input1);
    div4.appendChild(input2);
    div4.appendChild(div6);

    div3.appendChild(label);
    div3.appendChild(div4);

    const div7 = document.createElement('div');
    div7.setAttribute('class', 'date_picker_calendar hidden');

    const div8 = document.createElement('div');
    div8.setAttribute('class', 'calendar_header');

    const button1 = document.createElement('button');
    button1.setAttribute('class', 'cal-btn back');

    const svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg3.setAttribute('width', '10');
    svg3.setAttribute('height', '11');
    svg3.setAttribute('viewbox', '0 0 10 11');
    svg3.setAttribute('fill', 'none');

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M1.90039 5.5L7.30039 0.303848L7.30039 10.6962L1.90039 5.5Z');
    path3.setAttribute('fill', '#AFBCBE');

    svg3.appendChild(path3);
    button1.appendChild(svg3);

    const span = document.createElement('span');

    const button2 = document.createElement('button');
    button2.setAttribute('class', 'cal-btn front');

    const svg4 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg4.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg4.setAttribute('width', '10');
    svg4.setAttribute('height', '11');
    svg4.setAttribute('viewbox', '0 0 10 11');
    svg4.setAttribute('fill', 'none');

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M8.59961 5.5L3.19961 10.6962L3.19961 0.303848L8.59961 5.5Z');
    path4.setAttribute('fill', '#AFBCBE');

    svg4.appendChild(path4);
    button2.appendChild(svg4);

    div8.appendChild(button1);
    div8.appendChild(span);
    div8.appendChild(button2);

    const div9 = document.createElement('div');
    div9.setAttribute('class', 'cal_wrapper');

    const div10 = document.createElement('div');
    div10.setAttribute('class', 'cal_days');

    const div11 = document.createElement('div');
    div11.setAttribute('class', 'calendar_main');

    div9.appendChild(div10);
    div9.appendChild(div11);

    div7.appendChild(div8);
    div7.appendChild(div9);

    div2.appendChild(div3);
    div2.appendChild(div7);

    div1.appendChild(div2);

    parent.appendChild(div1);
}

function resetAddStudentToGroup(){

    addStudentToGroupContentBlock.classList.remove("used");
    addStudentToGroupBtn.classList.remove("active");
    addStudentToGroupBtn.classList.add("inactive");

    groupData = [];

    addStudentToGroupTable != null && addStudentToGroupTable.insertData(null, []);

    addStudentToGroupActiveCals.forEach(element => {
        deleteCalendar(element.getId(), "#add-student-to-group-calendars");
    });
    addStudentToGroupActiveCals = [];

}

function reconstructSubjects(branchId, subjectsByBranches){
    var reconstructed = [];
    var subjects = subjectsByBranches[branchId + ""];

    for (var key in subjects){
        reconstructed.push([key, subjects[key]]);
    }

    return reconstructed;
}

function reconstructLessonTypes(branchId, lessonTypes){
    var reconstructed = [];
    var types = lessonTypes[branchId + ""];

    types.forEach(type => {
        reconstructed.push([type['id'], type['name']]);
    });

    return reconstructed;
}