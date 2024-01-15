var addStudentToLessonContentBlock = document.querySelector("#add-student-to-lesson-content-block");

let addStudentToLessonBtn = document.querySelector("#add-student-to-lesson-btn");

let subjectSearchSelector = null;
let lessonSearchSelector = null;
let addStudentToLessonCalendar = null;
let addStudentToLessonTable = null;

var lessonsData = [];
var lessonsColumns = [];

var isLoadedChecker = 0;


var calInputChangedHandler = function(cal){
    var inputValues = cal.getValues();
    var inputs = cal.getInputs();
    var firstDate = inputValues['firstInput'];
    var secondDate = inputValues['secondInput'];
    if (addStudentToLessonTable !== null && firstDate !== null && ((secondDate === null && inputs['secondInput'].value.replace(/\./g, "").replace(/\D+/g, "").replace(/\./g, "").replace(" ", "").length === 0) || secondDate !== null)){
        var cropedData = [];
        lessonsData.forEach(data=> {
            var parsedData = Date.parse(data['date'].split(".").reverse().join("-"));
            if (parsedData >= firstDate && (parsedData <= secondDate || secondDate === null)){
                cropedData.push(data);
            }
        });
        addStudentToLessonTable.insertBasicData(null , cropedData);
        addStudentToLessonBtn.classList.add("inactive");
    }
};

var calClearHandler = function(){
    addStudentToLessonTable.insertBasicData(null,lessonsData);
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

        //console.log('https://alfa-amo.ru/testwidget/load_lessons.php?branch_id=' + filialSelector.option + "&lesson_type_id=" + lessonSearchSelector.option + "&subject_id=" + subjectSearchSelector.option + "&user_id=" + user_id);

        if (isLoadedChecker === 1){
            isLoadedChecker = 2;
        }
        if (isLoadedChecker === 0 ){
            isLoadedChecker = 1;
            createLoader(addStudentToLessonContentBlock);
        }

        

        fetch('https://alfa-amo.ru/testwidget/load_lessons.php?branch_id=' + filialSelector.option + "&lesson_type_id=" + lessonSearchSelector.option + "&subject_id=" + subjectSearchSelector.option + "&user_id=" + user_id , {
            method: 'GET'
        })
        .then(response => response.json()) 
        .then(data => {
            //console.log(data);
            if (isLoadedChecker === 1){
                removeLoader(addStudentToLessonContentBlock);
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
    
                addStudentToLessonTable.insertBasicData(null, cropedData);
                isLoadedChecker = 0;
            }
            else{
                isLoadedChecker = 1;
            }
           
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoader(addStudentToLessonContentBlock);
            toggleOperationResult(false, LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE, addStudentToLessonContentBlock);
        });

        if (lessonSearchSelector.option === "2"){
            lessonsColumns = LESSON_ADD_STUDENT_GROUP_COLUMNS_LIST;
        }else{
            lessonsColumns = LESSON_ADD_STUDENT_SHORT_COLUMNS_LIST;
        }

        addStudentToLessonTable = new SearchWithTable(tableWrapper, document.querySelector("#add_student_teacher_input"), [], lessonsColumns, checkboxHandler, addStudentToLessonBtn, () => {console.log("test");});
        tableWrapper.classList.remove("hidden");
    }
}


addStudentToLessonContentBlock.addEventListener("click" ,() =>{
    if (addStudentToLessonContentBlock.classList.contains("active") || addStudentToLessonContentBlock.classList.contains("forbidden")) return;
    openContentBlock(addStudentToLessonContentBlock);
    refreshAddStudetnToLesson();
});

addStudentToLessonBtn.addEventListener("click", () => {
    if (addStudentToLessonBtn.classList.contains("active")){
        addStudentToLessonContentBlock.classList.add("used");
        toggleBtn(addStudentToLessonBtn);
        createLoader(addStudentToLessonContentBlock);

        var checkedRows = document.querySelector("#add-student-to-lesson-table-container").querySelectorAll("input:checked");
        var parsedTableData = [];

        //console.log(lessonsData);

        checkedRows.forEach(checkbox =>{
            var lessonId = Number(checkbox.id.replace("add-student-to-lesson-table_row_", "").replace("_checkbox", ""));
            lessonsData.forEach(data => {
                if (data['id'] === lessonId){
                    parsedTableData.push(data);
                }
            });
            
        } );

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

        //console.log(JSON.stringify(parsedData));

        fetch('https://alfa-amo.ru/adm/?token=aiUWVpSyAFs0BoEcMJTa9n3v&action=widget_add_student_to_lesson' , {
            method: 'POST',
            body : JSON.stringify(parsedData)
        })
        .then(response => {
            removeLoader(addStudentToLessonContentBlock);
            refreshAddStudetnToLesson();
            toggleOperationResult(true, LESSON_ADD_STUDENT_RES_ADD_TXT_SUC, addStudentToLessonContentBlock);
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoader(addStudentToLessonContentBlock);
            toggleOperationResult(false, LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE, addStudentToLessonContentBlock);
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

    addStudentToLessonTable != null && addStudentToLessonTable.insertBasicData(null, []);
}

function refreshAddStudetnToLesson(){
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
}





