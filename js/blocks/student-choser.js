let removeNoteAndWriteIntoResultField = function(_el){

    let chosenResult = _el.querySelector('[data-select="toggle"]').textContent;
    let selection_row = _el.parentElement.parentElement;

    console.log(selection_row);
    selection_row.querySelector(".note").classList.add("hidden");
    selection_row.querySelector(".result-value").innerHTML =chosenResult ;
    selection_row.classList.remove("unselected");
    selection_row.classList.add("selected");
    selection_row.querySelector(".selection-result").classList.remove("hidden");

    let inactiveResult = document.querySelector("#student_choser_" + _el.id.replace("student_choser_", "").replace("_selector", "") + "_inactive_result");
    inactiveResult.querySelector(".result-value").innerHTML = chosenResult;
}


//Создание селекторов
let parentSelector = ItcCustomSelect.create('#student_choser_parent_selector', {
    name: 'student_choser_parent_selector',
    targetValue: 'Выбор',
    options: [
    ],
    callback : removeNoteAndWriteIntoResultField
});
let studentSelector = ItcCustomSelect.create('#student_choser_student_selector', {
    name: 'student_choser_student_selector',
    targetValue: 'Выбор',
    options: [
       
    ],
    callback : removeNoteAndWriteIntoResultField
});
let filialSelector = ItcCustomSelect.create('#student_choser_filial_selector', {
    name: 'student_choser_filial_selector',
    targetValue: 'Выбор',
    options: [
    ],
    callback : function(_el){
        removeNoteAndWriteIntoResultField(_el);
        let forbiddenBlocks = document.querySelectorAll(".content-block.forbidden");
        forbiddenBlocks.forEach(block => {
            block.classList.remove("forbidden");
        });
    }
});

//Наполнение селекторов
let parentData = [
    ["chose 1", "Выбор 1"],
    ["chose 2", "Выбор 2"],
    ["chose 3", "Выбор 3"],
    ["chose 4", "Выбор 4"]
];
parentSelector.updateData(parentData);

let studentData = [
    ["chose 1", "Выбор 1"],
    ["chose 2", "Выбор 2"],
    ["chose 3", "Выбор 3"],
    ["chose 4", "Выбор 4"]
];
studentSelector.updateData(studentData);

let filialData = [
    ["chose 1", "Выбор 1"],
    ["chose 2", "Выбор 2"],
    ["chose 3", "Выбор 3"],
    ["chose 4", "Выбор 4"]
];
filialSelector.updateData(filialData);
