var addStudentAsLeadCheckBox = document.querySelector( "#add_as_lead");
var addStudentBtn = document.querySelector("#add_student_btn");
var addStudentRefresher  = document.querySelector("#add_student_refresher");
var addStudentContentBlock = document.querySelector("#add-student-content-block");

addStudentContentBlock.addEventListener("click" , () => {
    toggleContentBlock(addStudentContentBlock);
});


addStudentBtn.addEventListener("click", e => {
    if (addStudentBtn.classList.contains("active")){
        addStudentContentBlock.classList.add("used");

        var parentSelectorData = parentSelector.value;
        var studentSelectorData = studentSelector.value;
        var filialSelectorData = filialSelector.option;

        var isLead = addStudentAsLeadCheckBox.checked;

        var parsedData = 
            {
                "parent_name" : parentSelectorData,
                "student_name" : studentSelectorData,
                "branch_id" : filialSelectorData,
                "isLead" : isLead
            }
        console.log(parsedData);        
    }
});