var addStudentToLessonContentBlock = document.querySelector("#add-student-to-lesson-content-block");

let addStudentToLessonBtn = document.querySelector("#add-student-to-lesson-btn");

let subjectSearchSelector = null;
let lessonSearchSelector = null;
let addStudentToLessonCalendar = null;
let addStudentToLessonTable = null;

var lessonsData = [];
var lessonsColumns = [
    '',
    'Дата',
    'Время урока',
    'Предмет',
    'Педагог',
    'Аудитория',
    'Название группы',
    'Лимит учеников',
    'Комментарий'
];

var calInputChangedHandler = function(cal){
    var inputValues = cal.getValues();
    var inputs = cal.getInputs();
    var firstDate = inputValues['firstInput'];
    var secondDate = inputValues['secondInput'];
    if (addStudentToLessonTable !== null && firstDate !== null && ((secondDate === null && inputs['secondInput'].value.replace(/\./g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0) || secondDate !== null)){
        var cropedData = [];
        lessonsData.forEach(data=> {
            var parsedData = Date.parse(data.date.split(".").reverse().join("-"));
            if (parsedData >= firstDate && (parsedData <= secondDate || secondDate === null)){
                cropedData.push(data);
            }
        });
        addStudentToLessonTable.insertData(null,cropedData);
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

        lessonsData = [
            {
                date: "18.08.2023",
                time: "18:00",
                subj: "Ангийский язык",
                teacher: "Иванов В. А.",
                room: "24",
                group_name: "Новички",
                limit: "3/12",
                comment: "Комментарий"
            },
            {
                date: "21.08.2023",
                time: "18:00",
                subj: "Ангийский язык",
                teacher: "Иванов В. А.",
                room: "24",
                group_name: "Новички",
                limit: "3/12",
                comment: "Комментарий"
            },
            {
                date: "23.08.2023",
                time: "18:00",
                subj: "Ангийский язык",
                teacher: "Иванов В. А.",
                room: "24",
                group_name: "Новички",
                limit: "3/12",
                comment: "Комментарий"
            }
        
        ];

        var cropedData = [];
        var inputValues = addStudentToLessonCalendar.getValues();
        var inputs = addStudentToLessonCalendar.getInputs();
        var firstDate = inputValues['firstInput'];
        var secondDate = inputValues['secondInput'];
        if (firstDate !== null && ((secondDate === null && inputs['secondInput'].value.replace(/\./g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0)) || secondDate !== null){
            var cropedData = [];
            lessonsData.forEach(data=> {
                var parsedData = Date.parse(data.date.split(".").reverse().join("-"));
                if (parsedData >= firstDate && (parsedData <= secondDate || secondDate === null)){
                    cropedData.push(data);
                }
            });
        }
        addStudentToLessonTable = new CustomTable(tableWrapper, cropedData, lessonsColumns, checkboxHandler);
        tableWrapper.classList.remove("hidden");
    }
}


addStudentToLessonContentBlock.addEventListener("click" ,() =>{

    if (addStudentToLessonContentBlock.classList.contains("active") || addStudentToLessonContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(addStudentToLessonContentBlock);

    subjectSearchSelector = ItcCustomSearchSelect.create('#add-student-to-lesson-subject-selector', {
        name: 'add-student-to-lesson-subject-selector',
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
        callback: selectorAfterSelectHandler
    });
    
    lessonSearchSelector = ItcCustomSearchSelect.create('#add-student-to-lesson-lesson-selector', {
        name: 'add-student-to-lesson-lesson-selector',
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
        callback: selectorAfterSelectHandler
    });

    addStudentToLessonCalendar = new CustomCalendar(document.querySelector("#add-student-to-lesson-calendar"), calInputChangedHandler, calClearHandler);

    document.querySelector("#add-student-to-lesson-table-container").classList.add("hidden");
});

addStudentToLessonBtn.addEventListener("click", () => {
    if (addStudentToLessonBtn.classList.contains("active")){
        addStudentToLessonContentBlock.classList.add("used");
    }
});





