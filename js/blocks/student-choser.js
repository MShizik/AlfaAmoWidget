var studentChoserContentBlock = document.querySelector("#student-choser-content-block");

studentChoserContentBlock.addEventListener("click", () => {
    openContentBlock(studentChoserContentBlock);
})

let removeNoteAndWriteIntoResultField = function(_el){

    let chosenResult = _el.querySelector('[data-select="toggle"]').textContent;
    let selection_row = _el.parentElement.parentElement;

    selection_row.querySelector(".widget-note").classList.add("hidden");
    selection_row.querySelector(".result-value").innerHTML =chosenResult ;
    selection_row.classList.remove("unselected");
    selection_row.classList.add("selected");
    selection_row.querySelector(".selection-result").classList.remove("hidden");

    let inactiveResult = document.querySelector("#student_choser_" + _el.id.replace("student_choser_", "").replace("_selector", "") + "_inactive_result");
    inactiveResult.querySelector(".result-value").innerHTML = chosenResult;
    inactiveResult.classList.remove("hidden");
    let wrapper = document.querySelector("#student-choser-content-block");

    if (wrapper.querySelector("#student_choser_student_selector").parentElement.parentElement.classList.contains("selected") &&
    wrapper.querySelector("#student_choser_filial_selector").parentElement.parentElement.classList.contains("selected")){
        let forbiddenBlocksQuery = ".forbidden";
        forbiddenTip.innerHTML = FORBIDDEN_TIP_STUDENT_EXIST;
        if (studentSelector.option === "-1"){
            forbiddenBlocksQuery = "#add-student-content-block";
            forbiddenTip.innerHTML = FORBIDDEN_TIP_STUDENT_UNEXIST;
            let closedBlocks = document.querySelectorAll(".widget-content-block:not(.static):not(.disabled)");
            closedBlocks.forEach(block => {
                block.classList.add("forbidden");
                block.classList.remove("active");
                block.classList.add("inactive");
            });
        }
        let forbiddentBlocks = document.querySelectorAll(forbiddenBlocksQuery);
        forbiddentBlocks.forEach(block => {
            block.classList.remove("forbidden");
            block.classList.remove("active");
            block.classList.add("inactive");
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
parentSelector.updateData([]);

let studentSelector = ItcCustomSelect.create('#student_choser_student_selector', {
    name: 'student_choser_student_selector',
    targetValue: 'Выбор',
    options: [
       
    ],
    callback : removeNoteAndWriteIntoResultField
});
studentSelector.updateData([]);

let filialSelector = ItcCustomSelect.create('#student_choser_filial_selector', {
    name: 'student_choser_filial_selector',
    targetValue: 'Выбор',
    options: [
    ],
    callback :  removeNoteAndWriteIntoResultField
});
filialSelector.updateData([]);

function resetStudentChoser(){
    
    studentChoserContentBlock.classList.remove("inactive");
    studentChoserContentBlock.classList.add("active");
    parentSelector.updateData([]);
    studentSelector.updateData([]);
    filialSelector.updateData([]);

    resetSelectionRow(parentSelector._el);
    resetSelectionRow(studentSelector._el);
    resetSelectionRow(filialSelector._el);

    
    let wrapper = document.querySelector(".basement");

    let contentBlocks = wrapper.querySelectorAll(".widget-content-block:not(.static)");

    contentBlocks.forEach(block => {
        block.classList.add("forbidden");
        block.classList.remove("active");
        block.classList.add("inactive");
    });
}

function resetSelectionRow(_el){
    var selectorRow = _el.parentElement.parentElement;
    selectorRow.querySelector(".widget-note").classList.remove("hidden");
    selectorRow.querySelector(".result-value").innerHTML = "" ;
    selectorRow.classList.remove("selected");
    selectorRow.classList.add("unselected");
    selectorRow.querySelector(".selection-result").classList.add("hidden");

    let inactiveResult = document.querySelector("#student_choser_" + _el.id.replace("student_choser_", "").replace("_selector", "") + "_inactive_result");
    inactiveResult.querySelector(".result-value").innerHTML = "";
    inactiveResult.classList.add("hidden");

}

