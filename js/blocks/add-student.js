var addStudentAsLeadCheckBox = document.querySelector( "#add_as_lead");
var addStudentBtn = document.querySelector("#add_student_btn");
var addStudentRefresher  = document.querySelector("#add_student_refresher");
var updateLinkBlock = document.querySelector("#update_student_data");
var addStudentContentBlock = document.querySelector("#add-student-content-block");
var reloadLinkBlock = document.querySelector("#add_student_refresh");

addStudentContentBlock.addEventListener("click" , () => {
    if (addStudentContentBlock.classList.contains("active") || addStudentContentBlock.classList.contains("forbidden")) return
    openContentBlock(addStudentContentBlock);
    addStudentAsLeadCheckBox.checked = isLeadBasicState;
    if (studentSelector.option !== "-1"){
        reloadLinkBlock.classList.remove("inactive");
        reloadLinkBlock.classList.add("active");
        updateLinkBlock.classList.remove("inactive");
        updateLinkBlock.classList.add("active");
        addStudentBtn.classList.remove("active");
        addStudentBtn.classList.add("inactive");
    }else{
        addStudentBtn.classList.remove("inactive");
        addStudentBtn.classList.add("active");
        reloadLinkBlock.classList.add("inactive");
        reloadLinkBlock.classList.remove("active");
        updateLinkBlock.classList.add("inactive");
        updateLinkBlock.classList.remove("active");
    }
});


reloadLinkBlock.addEventListener("click", () => {
    if (reloadLinkBlock.classList.contains("active")){
        createLoader(addStudentContentBlock);
        //console.log('https://alfa-amo.ru/testwidget/reload_links.php?branch_id=' + filialSelector.option +  "&user_id=" + user_id +  "&student_id=" + studentDataForSelector[studentSelector.index][0] +  "&contact_id=" + studentDataForSelector[studentSelector.index][2]);
        fetch('https://alfa-amo.ru/testwidget/reload_links.php?branch_id=' + filialSelector.option +  "&user_id=" + user_id +  "&student_id=" + studentDataForSelector[studentSelector.index][0] +  "&contact_id=" + studentDataForSelector[studentSelector.index][2] , {
            method: 'GET'
        }).
        then(response => response.json()).
        then(data => {
            removeLoader(addStudentContentBlock);
            toggleOperationResult(true, ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE, addStudentContentBlock);
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoader(addStudentContentBlock);
            toggleOperationResult(false, ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE, addStudentContentBlock);
        });
    }
});

updateLinkBlock.addEventListener("click", () => {
    if (updateLinkBlock.classList.contains("active")){

        var lead_id = null;
        var link = document.location.href;
        var regex = /^https:\/\/.*?\/.*?\/.*?\/(.*?)$/;
        var result = regex.exec(link);

        if (result && result.length > 1) {
            lead_id = result[1];
        }

        createLoader(addStudentContentBlock);
        //console.log('https://alfa-amo.ru/testwidget/update_student.php?branch_id=' + filialSelector.option +  "&user_id=" + user_id +  "&student_id=" + studentDataForSelector[studentSelector.index][0] +  "&contact_id=" + studentDataForSelector[studentSelector.index][2] + "&lead_id=" + lead_id);
        fetch('https://alfa-amo.ru/testwidget/update_student.php?branch_id=' + filialSelector.option +  "&user_id=" + user_id +  "&student_id=" + studentDataForSelector[studentSelector.index][0] +  "&contact_id=" + studentDataForSelector[studentSelector.index][2] + "&lead_id=" + lead_id, {
            method: 'GET'
        }).
        then(response => response.json()).
        then(data => {
            removeLoader(addStudentContentBlock);
            //console.log(data);
            if (data['res'] === true){
                toggleOperationResult(true, ADD_STUDENT_RES_UPDATE_DATA_TXT_SUC, addStudentContentBlock);
            }
            else{
                toggleOperationResult(false, ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE, addStudentContentBlock);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoader(addStudentContentBlock);
            toggleOperationResult(false, ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE, addStudentContentBlock);
        });
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

                reloadLinkBlock.classList.remove("inactive");
                reloadLinkBlock.classList.add("active");
                updateLinkBlock.classList.remove("inactive");
                updateLinkBlock.classList.add("active");
                addStudentBtn.classList.remove("active");
                addStudentBtn.classList.add("inactive");
                
                removeLoader(addStudentContentBlock);
                toggleOperationResult(true, ADD_STUDENT_RES_ADD_TXT_SUC, addStudentContentBlock);
            }else{
                removeLoader(addStudentContentBlock);
                toggleOperationResult(false, ADD_STUDENT_RES_ADD_TXT_FAILURE, addStudentContentBlock);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoader(addStudentContentBlock);
            toggleOperationResult(false, ADD_STUDENT_RES_ADD_TXT_FAILURE, addStudentContentBlock);
        });
    }
});


function resetAddStudent(){
    addStudentContentBlock.classList.remove("used");
}