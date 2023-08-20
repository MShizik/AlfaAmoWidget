var studentChoserContentBlock = document.querySelector("#student-choser-content-block");

studentChoserContentBlock.addEventListener("click", () => {
    toggleContentBlock(studentChoserContentBlock);
})

let removeNoteAndWriteIntoResultField = function(_el){

    let chosenResult = _el.querySelector('[data-select="toggle"]').textContent;
    let selection_row = _el.parentElement.parentElement;

    selection_row.querySelector(".note").classList.add("hidden");
    selection_row.querySelector(".result-value").innerHTML =chosenResult ;
    selection_row.classList.remove("unselected");
    selection_row.classList.add("selected");
    selection_row.querySelector(".selection-result").classList.remove("hidden");

    let inactiveResult = document.querySelector("#student_choser_" + _el.id.replace("student_choser_", "").replace("_selector", "") + "_inactive_result");
    inactiveResult.querySelector(".result-value").innerHTML = chosenResult;
    let wrapper = document.querySelector("#student-choser-content-block");

    if (wrapper.querySelectorAll(".itc-select__option_selected").length === 3){
        let forbiddentBlocks = document.querySelectorAll(".forbidden");
        forbiddentBlocks.forEach(block => {
            block.classList.remove("forbidden");
        });
    }
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
    callback :  removeNoteAndWriteIntoResultField
});

//Наполнение селекторов
let parentData = [
    ["1", "Выбор 1"],
    ["2", "Выбор 2"],
    ["3", "Выбор 3"],
    ["4", "Выбор 4"]
];
parentSelector.updateData(parentData);

let studentData = [
    ["1", "Выбор 1"],
    ["2", "Выбор 2"],
    ["3", "Выбор 3"],
    ["4", "Выбор 4"]
];
studentSelector.updateData(studentData);


