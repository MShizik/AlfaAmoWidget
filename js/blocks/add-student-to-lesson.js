var addStudentToLessonContentBlock = document.querySelector("#add-student-to-lesson-content-block");

let addStudentToLessonBtn = document.querySelector("#add-student-to-lesson-btn");

let subjectSearchSelector = null;
let lessonSearchSelector = null;
let addStudentToLessonCalendar = null;
let addStudentToLessonTable = null;

var lessonsData = [];
var lessonsColumns = [];

var calInputChangedHandler = function(cal){
    console.log(lessonsData);
    var inputValues = cal.getValues();
    var inputs = cal.getInputs();
    var firstDate = inputValues['firstInput'];
    var secondDate = inputValues['secondInput'];
    if (addStudentToLessonTable !== null && firstDate !== null && ((secondDate === null && inputs['secondInput'].value.replace(/\./g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0) || secondDate !== null)){
        var cropedData = [];
        lessonsData.forEach(data=> {
            var parsedData = Date.parse(data['date'].split(".").reverse().join("-"));
            if (parsedData >= firstDate && (parsedData <= secondDate || secondDate === null)){
                cropedData.push(data);
            }
        });
        addStudentToLessonTable.insertData(null , cropedData);
        addStudentToLessonTable.setUpRowOnClickHandler();
        addStudentToLessonBtn.classList.add("inactive");
    }
};

var calClearHandler = function(){
    addStudentToLessonTable.insertData(null,lessonsData);
    addStudentToLessonTable.setUpRowOnClickHandler();
    addStudentToLessonBtn.classList.add("inactive");
}

var checkboxHandler = function(table){
    if (table.querySelectorAll('input:checked').length > 0){
        addStudentToLessonBtn.classList.remove("inactive");
        addStudentToLessonBtn.classList.add("active");
    }else{
        addStudentToLessonBtn.classList.remove("active");
        addStudentToLessonBtn.classList.add("inactive");
    }
};

var selectorAfterSelectHandler = function(){
    let wrapper = document.querySelector("#add-student-to-lesson-content-block");
    
    if (wrapper.querySelectorAll(".itc-select__option_selected").length === 2){
        
        var tableWrapper = document.querySelector("#add-student-to-lesson-table-container");
        tableWrapper.innerHTML = "";

        console.log('https://alfa-amo.ru/testwidget/load_lessons.php?branch_id=' + filialSelector.option + "&lesson_type_id=" + lessonSearchSelector.option + "&subject_id=" + subjectSearchSelector.option + "&user_id=" + user_id);

        fetch('https://alfa-amo.ru/testwidget/load_lessons.php?branch_id=' + filialSelector.option + "&lesson_type_id=" + lessonSearchSelector.option + "&subject_id=" + subjectSearchSelector.option + "&user_id=" + user_id , {
            method: 'GET'
        })
        .then(response => response.json()) 
        .then(data => {
            toggleConnectionMarks(data['amo'], data['alfa']);
            createConnectionTips();
            lessonsData = data["lessons"];
            var cropedData = [];
            var inputValues = addStudentToLessonCalendar.getValues();
            var inputs = addStudentToLessonCalendar.getInputs();
            var firstDate = inputValues['firstInput'];
            var secondDate = inputValues['secondInput'];
            if (firstDate !== null && ((secondDate === null && inputs['secondInput'].value.replace(/\./g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0)) || secondDate !== null){

                lessonsData.forEach(lsData=> {
                    var parsedData = Date.parse(lsData['date'].split(".").reverse().join("-"));
                    if (parsedData >= firstDate && (parsedData <= secondDate || secondDate === null)){
                        cropedData.push(lsData);
                    }
                });
            }

            addStudentToLessonTable.insertData(null, cropedData);
            addStudentToLessonTable.setUpRowOnClickHandler();
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if (lessonSearchSelector.option === "2"){
            lessonsColumns = [
                '',
                'Дата',
                'Время урока',
                'Предмет',
                'Педагог',
                'Аудитория',
                'Название группы',
                'Комментарий'
            ];
        }else{
            lessonsColumns = [
                '',
                'Дата',
                'Время урока',
                'Предмет',
                'Педагог',
                'Аудитория',
                'Комментарий'
            ];
        }

        addStudentToLessonTable = new CustomTable(tableWrapper, [], lessonsColumns, checkboxHandler);
        tableWrapper.classList.remove("hidden");
    }
}


addStudentToLessonContentBlock.addEventListener("click" ,() =>{

    if (addStudentToLessonContentBlock.classList.contains("active") || addStudentToLessonContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addStudentToLessonContentBlock);
    addStudentToLessonBtn.classList.remove("active");
    addStudentToLessonBtn.classList.add("inactive");

    
    var filialSelectorIndex = filialSelector.option;

    var lessonTypes = reconstructLessonTypes(filialSelectorIndex, lessonTypesByBranches);

    lessonSearchSelector = ItcCustomSearchSelect.create('#add-student-to-lesson-lesson-selector', {
        name: 'add-student-to-lesson-lesson-selector',
        targetValue: 'Выбор',
        options: lessonTypes,
        callback: selectorAfterSelectHandler
    });

    var subjects = reconstructSubjects(filialSelectorIndex, subjectsByBranches);

    subjectSearchSelector = ItcCustomSearchSelect.create('#add-student-to-lesson-subject-selector', {
        name: 'add-student-to-lesson-subject-selector',
        targetValue: 'Выбор',
        options: subjects,
        callback: selectorAfterSelectHandler
    });



    addStudentToLessonCalendar = new CustomCalendar(document.querySelector("#add-student-to-lesson-calendar"), calInputChangedHandler, calClearHandler);

    document.querySelector("#add-student-to-lesson-table-container").classList.add("hidden");
});

addStudentToLessonBtn.addEventListener("click", () => {
    if (addStudentToLessonBtn.classList.contains("active")){
        addStudentToLessonContentBlock.classList.add("used");

        var checkedRows = document.querySelector("#add-student-to-lesson-table-container").querySelectorAll("input:checked");
        var parsedTableData = [];

        checkedRows.forEach(checkbox => parsedTableData.push(lessonsData[Number(checkbox.id.replace("add-student-to-lesson-table_row_", "").replace("_checkbox", ""))]));

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

        fetch('https://alfa-amo.ru/adm/?token=aiUWVpSyAFs0BoEcMJTa9n3v&action=widget_add_student_to_lesson' , {
            method: 'POST',
            body : JSON.stringify(parsedData)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});


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


function resetAddStudentToLesson(){
    addStudentToLessonContentBlock.classList.remove("used");
    addStudentToLessonBtn.classList.remove("active");
    addStudentToLessonBtn.classList.add("inactive");

    lessonSearchSelector != null && lessonSearchSelector.updateData([]);

    lessonsData = [];

    addStudentToLessonTable != null && addStudentToLessonTable.insertData(null, []);
}





