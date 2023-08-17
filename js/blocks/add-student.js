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
    }
});