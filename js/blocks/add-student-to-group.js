let addStudentToGroupBtn = document.querySelector("#add-student-to-group-btn");
var addStudentToGroupContentBlock = document.querySelector("#add-student-to-group-content-block");

var addStudentToGroupActiveCals = [];

var groupData = [];

var groupColumns = [];

var addStudentToGroupTable = null;


addStudentToGroupContentBlock.addEventListener("click", () => {
    if (addStudentToGroupContentBlock.classList.contains("active") || addStudentToGroupContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addStudentToGroupContentBlock);



    groupData = [];

    groupColumns = [
        '',
        'Название группы',
        'Педагог',
        'Комментарий'
    ];
    
    addStudentToGroupTable = new CustomTable(document.querySelector("#add-student-to-group-table-container"), groupData, groupColumns, addStudentToGroupCheckboxCallBack);
    addStudentToGroupActiveCals.forEach(element => {
        deleteCalendar(element.getId(), "#add-student-to-group-calendars");
    });
    addStudentToGroupActiveCals = [];

    fetch('https://alfa-amo.ru/testwidget/load_groups.php?branch_id=' + filialSelector.option + "&customer_id=" + studentSelector.option  + "&user_id=" + user_id , {
            method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        toggleConnectionMarks(data['amo'], data['alfa']);
        createConnectionTips();
        groupData = data["groups"];
        addStudentToGroupTable.insertData(null, groupData);
        addStudentToGroupTable.setUpRowOnClickHandler();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

addStudentToGroupBtn.addEventListener("click", () => {
    if (addStudentToGroupBtn.classList.contains("active")){
        addStudentToGroupContentBlock.classList.add("used");
        
        var parsedTableData = [];

        var activeCheckboxes = addStudentToGroupContentBlock.querySelectorAll("input:checked");
        

        activeCheckboxes.forEach(checkbox => parsedTableData.push(groupData[Number(checkbox.id.replace("add-student-to-group-table_row_", "").replace("_checkbox", ""))]));
        
        parsedTableData.forEach(dataRow =>  {
            var connectedCalendar = addStudentToGroupActiveCals.find((cal) => cal.getId() === getIdFromString(dataRow['name']));
            var calendarValue = connectedCalendar.getValues();
            var calendarData = connectedCalendar.getInputs();
            dataRow['start_date'] = (calendarValue['firstInput'] !== null ) ? calendarData['firstInput'].value.replace("с ", "") : null;
            dataRow['end_date'] =  (calendarValue['secondInput'] !== null ) ? calendarData['secondInput'].value.replace("по ", "") : null;
        });

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

        console.log(JSON.stringify(parsedData));

        fetch('https://alfa-amo.ru/adm/?token=aiUWVpSyAFs0BoEcMJTa9n3v&action=widget_add_student_to_group' , {
            method: 'POST',
            body : JSON.stringify(parsedData)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});



var addStudentToGroupCheckboxCallBack = function(table, checkbox){
    if (table.querySelectorAll('input:checked').length > 0){
        addStudentToGroupBtn.classList.remove("inactive");
        addStudentToGroupBtn.classList.add("active");
    }else{
        addStudentToGroupBtn.classList.remove("active");
        addStudentToGroupBtn.classList.add("inactive");
    }
    var checkboxCell = table.querySelector(`td:has(#${checkbox.id})`);
    var name = checkboxCell.nextSibling.querySelector("div").innerHTML;
    if (checkbox.checked){
        var dataForGeneration = {
            "id" : getIdFromString(name),
            "name" : name
        };
        addStudentToGroupActiveCals.push(generateCalendar(dataForGeneration, "#add-student-to-group-calendars"));
        inputMasksEventListner();
    }else{
        var deletedId = deleteCalendar(name, "#add-student-to-group-calendars");
        addStudentToGroupActiveCals = addStudentToGroupActiveCals.filter(cal => cal.getId() !== deletedId);
    } 
}


function generateCalendar(data, insertionPlace){
    let placeToInsert = document.querySelector(insertionPlace);
    var id = data["id"];
    var name = data["name"];
    if (placeToInsert.querySelector("#group_cal_" + id + "") === null ){
        generateCalendarBody(getIdFromString(name), name, placeToInsert);
        return new CustomCalendar(document.querySelector(`#group_cal_${id}`), groupCalendarCallback, groupClearCalendarCallback);
    }
    
}

function deleteCalendar(name, basicContainer){
    var calId = getIdFromString(name);
    var cal = document.querySelector(`#group_cal_${calId}`);
    document.querySelector(basicContainer).removeChild(cal);
    return calId;
}

function groupCalendarCallback(){
    addStudentToGroupActiveCals.forEach(cal => {
        if (cal.firstSelectedDay === null){
            addStudentToGroupBtn.classList.remove("active");
            addStudentToGroupBtn.classList.add("inactive");
        }else{
            addStudentToGroupBtn.classList.remove("inactive");
            addStudentToGroupBtn.classList.add("active");
        }
    });
}

function groupClearCalendarCallback(){
    addStudentToGroupBtn.classList.remove("active");
    addStudentToGroupBtn.classList.add("inactive");
}

function getIdFromString(str){
    return str.replaceAll(' ', '').replaceAll("/", "").replaceAll(".","").replaceAll(",");
}

function generateCalendarBody(id, name, parent){
    const div1 = document.createElement('div');
    div1.setAttribute('class', 'calendar-wrapper');
    div1.setAttribute('id', "group_cal_" + id);

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
    input1.setAttribute('placeholder', 'с __.__.____');
    input1.setAttribute('data-slots', '');

    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('class', 'cal_date_input second');
    input2.setAttribute('id', id + "_second_input");
    input2.setAttribute('placeholder', 'по __.__.____');
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