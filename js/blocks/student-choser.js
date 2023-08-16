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


ItcCustomSelect.create('#student_choser_parent_selector', {
    name: 'student_choser_parent_selector',
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
        ],
        [
            'choose4', 'Выбор 4'
        ],
        [
            'choose4', 'Выбор 4'
        ],
        [
            'choose4', 'Выбор 4'
        ]
    ],
    callback : removeNoteAndWriteIntoResultField
});


ItcCustomSelect.create('#student_choser_student_selector', {
    name: 'student_choser_student_selector',
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
    callback : removeNoteAndWriteIntoResultField
});


ItcCustomSelect.create('#student_choser_filial_selector', {
    name: 'student_choser_filial_selector',
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
    callback : function(_el){
        removeNoteAndWriteIntoResultField(_el);
        let forbiddenBlocks = document.querySelectorAll(".content-block.forbidden");
        forbiddenBlocks.forEach(block => {
            block.classList.remove("forbidden");
        });
    }
});

