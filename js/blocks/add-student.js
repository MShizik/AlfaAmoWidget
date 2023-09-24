var addStudentAsLeadCheckBox = document.querySelector( "#add_as_lead");
var addStudentBtn = document.querySelector("#add_student_btn");
var addStudentRefresher  = document.querySelector("#add_student_refresher");
var addStudentContentBlock = document.querySelector("#add-student-content-block");

addStudentContentBlock.addEventListener("click" , () => {
    if (addStudentContentBlock.classList.contains("active") || addStudentContentBlock.classList.contains("forbidden")) return
    openContentBlock(addStudentContentBlock);
    addStudentAsLeadCheckBox.checked = isLeadBasicState;
    if (studentSelector.option !== "-1"){
        addStudentBtn.classList.remove("active");
        addStudentBtn.classList.add("inactive");
    }else{
        addStudentBtn.classList.remove("inactive");
        addStudentBtn.classList.add("active");
    }
});

addStudentBtn.addEventListener("click", e => {
    if (addStudentBtn.classList.contains("active")){
        addStudentContentBlock.classList.add("used");
        closeContentBlock(addStudentContentBlock);
        createLoader(addStudentContentBlock);

        var parentAmoId = null;
        if (parentSelector.index != -1){
            parentAmoId = parentDataForSelector[parentSelector.index][0];
        }
        //console.log(parentDataForSelector);
        //console.log(parentSelector.index);
        
        var studentAmoId = studentDataForSelector[studentSelector.index][2];
        var filialSelectorData = filialSelector.option;

        var isLead = addStudentAsLeadCheckBox.checked;
        var lead_id = null;
        var link = document.location.href;
        var regex = /^https:\/\/.*?\/.*?\/.*?\/(.*?)$/;
        var result = regex.exec(link);

        if (result && result.length > 1) {
            lead_id = result[1];
        }

        //console.log('https://alfa-amo.ru/testwidget/add_student.php?branch_id=' + filialSelectorData +  "&user_id=" + user_id +  "&student_id=" + studentAmoId +  "&parent_id=" + parentAmoId +  "&isLead=" + Number(isLead) +  "&lead_id=" + lead_id);
        
        fetch('https://alfa-amo.ru/testwidget/add_student.php?branch_id=' + filialSelectorData +  "&user_id=" + user_id +  "&student_id=" + studentAmoId +  "&parent_id=" + parentAmoId +  "&isLead=" + Number(isLead) +  "&lead_id=" + lead_id    , {
            method: 'GET'
        })
        .then(response => response.json()) 
        .then(data => {
            //console.log(data);
            if (data['added_id'] !== null && data['added_id'] != -1){
                var selector = document.querySelector("#student_choser_student_selector");

                var toggle = selector.querySelector(".itc-select__toggle");
                toggle.dataset.option = data['added_id'];
                
                var option = selector.querySelector(".itc-select__option_selected");
                option.dataset.option = data['added_id'];

                let forbiddentBlocksQuery = ".forbidden";
                let forbiddentBlocks = document.querySelectorAll(forbiddentBlocksQuery);
                forbiddentBlocks.forEach(block => {
                    block.classList.remove("forbidden");
                });

                addStudentContentBlock.classList.remove("active");
                addStudentContentBlock.classList.add("inactive");
                addStudentContentBlock.classList.add("forbidden");

                forbiddenTip.innerHTML = "Ученик уже записан в alfaCRM";
                removeLoader(addStudentContentBlock);
                toggleOperationResult(true, "Студент добавлен", addStudentContentBlock);
            }else{
                toggleOperationResult(false, "Студент не был добавлен", addStudentContentBlock);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});


function resetAddStudent(){
    addStudentContentBlock.classList.remove("used");
}