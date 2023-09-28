var updateIsRunning = false;
var connectionSignAmo = document.querySelector("#amo-connection");
var connectionSignAlfa = document.querySelector("#alfa-connection");

var isLeadBasicState = false;

var subjectsByBranches = [];
var lessonTypesByBranches = [];

let studentsData = [];
let parentsData = [];

let studentDataForSelector = [];

let parentDataForSelector = [];

let user_id = -1;

function basicLoad(){

    var basicLoadUrl = "https://alfa-amo.ru/testwidget/basic_load.php";

    var subdomain = document.location.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1].split(".")[0];

    var lead_id  = null;
    var link = document.location.href;
    var regexLead = /^https:\/\/.*?\/.*?\/.*?\/(.*?)$/;
    var resultLead = regexLead.exec(link);

    if (resultLead && resultLead.length > 1) {
        lead_id = resultLead[1];
    }

    var isStudentFieldId = findContactFieldId();

    //console.log(basicLoadUrl + '?cur_url=' + subdomain  + "&lead_id=" + lead_id + "&student_field_id=" + isStudentFieldId);
    if (!updateIsRunning) {
        updateIsRunning = true;
        fetch(basicLoadUrl + '?cur_url=' + subdomain  + "&lead_id=" + lead_id + "&student_field_id=" + isStudentFieldId, {
            method: 'GET'
            })
            .then(response => response.json()) 
            .then(data => {
                //console.log(data);
                var dbCon = data["db"];
                if (dbCon){
                    toggleConnectionMarks(data['amo'], data['alfa']);
                    user_id = data['user_id'];
                    if (user_id === null){
                        toggleConnectionMarks(false, false);
                        createErrorLoadShower('Зарегистрируйтесь <a href = "https://comontech.ru" >comontech.ru</a>');
                    }
                    if (data['is_active'] === 0){
                        toggleConnectionMarks(false, false);
                        createErrorLoadShower('Продлите подписку');
                    }
                    createConnectionTips();
        
                    if (user_id !== null && data['is_active'] === 1){
        
                        let filialData = parseBranchData(data['branches']);
                        filialSelector.updateData(filialData);
        
                        subjectsByBranches = data['subjects'];
        
                        createConnectionTips();
        
                        updateSubscriptionValue(data['subEnd']);
        
                        studentsData = data['students'];
                        parentsData = data['parents'];
        
                        studentDataForSelector = parseStudentsData(studentsData);
                        parentDataForSelector = parseParentsData(parentsData);
        
        
                        parentSelector.updateData(parentDataForSelector);
        
                        studentSelector.updateData(studentDataForSelector);
        
                        isLeadBasicState = Boolean(data['isLead']);
        
                        lessonTypesByBranches = data['lessonTypes'];
                    }
                }
                updateIsRunning = false;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    
}

function createErrorLoadShower(message){
    var errorBasement = document.createElement("div");
    errorBasement.classList.add("widget-error-basement");

    errorBasement.innerHTML = message;
    mainBody.appendChild(errorBasement);
}

function parseStudentsData(students){
    var result = [];

    students.forEach(student => {
        result.push([student['alfa_id'], student['name'], student['id']]);
    });

    return result;
}

function parseParentsData(parents){
    var result = [];

    parents.forEach(parent => {
        result.push([parent['id'], parent['name']]);
    });

    return result;
}

function findContactFieldId(){

    var field = document.querySelector('#contacts_list .linked-form__field:has(.linked-form__field__label[title="Ученик"])');
    var secondField = document.querySelector('#contacts_list .linked-form__field:has(.linked-form__field__label[title="Student"])');

    if (field != null){
        return field.dataset.id;
    }

    if (secondField != null){
        return secondField.dataset.id;
    }

    return null;
}

function parseBranchData(branchesData){

    var parsedBranchesData = [];

    branchesData.forEach(branch => {
        parsedBranchesData.push([branch["id"], branch["name"]]);
    });
    
    return parsedBranchesData;
}

function toggleConnectionMarks(firstMarkValue, secondMarkValue){
    if (firstMarkValue){
        connectionSignAmo.querySelector(".connection-indicator").classList.remove("connection-failure");
        connectionSignAmo.querySelector(".connection-indicator").classList.add("connection-succeed");
    }else{
        connectionSignAmo.querySelector(".connection-indicator").classList.add("connection-failure");
        connectionSignAmo.querySelector(".connection-indicator").classList.remove("connection-succeed");
    }

    if (secondMarkValue){
        connectionSignAlfa.querySelector(".connection-indicator").classList.remove("connection-failure");
        connectionSignAlfa.querySelector(".connection-indicator").classList.add("connection-succeed");
    }else{
        connectionSignAlfa.querySelector(".connection-indicator").classList.add("connection-failure");
        connectionSignAlfa.querySelector(".connection-indicator").classList.remove("connection-succeed");
    }
}

function updateSubscriptionValue(dateOfEnd){
    var endDate = new Date(dateOfEnd);
    endDate.setHours(0, 0, 0, 0);
    var curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    var subLen = Math.floor((endDate - curDate) / (1000 * 60 * 60 * 24));
    var footerSubscriptionInfo = document.querySelector(".footer .info-block");
    footerSubscriptionInfo.innerHTML = "Подписка " + subLen + " " + declOfNum(subLen, ["день", "дня", "дней"]);
}

function declOfNum(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

function getNameFromContact(contact){
    var name = "";
    var nameFields = contact.querySelectorAll('div>tester');
    name += (nameFields[0].innerHTML !== "Имя") ? nameFields[0].innerHTML : "";
    name += (nameFields.length > 0 && nameFields[1].innerHTML !== "Фамилия") ? nameFields[1].innerHTML : "";
    return name;
}