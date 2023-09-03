
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

    var foundedPeople = findStudentAndParent();

    var lead_id = null;
    var link = document.location.href;
    var regexLead = /^https:\/\/.*?\/.*?\/.*?\/(.*?)$/;
    var resultLead = regexLead.exec(link);

    if (resultLead && resultLead.length > 1) {
        lead_id = resultLead[1];
    }

    //console.log(basicLoadUrl + '?cur_url=' + subdomain + (foundedPeople['student_id'] !== undefined ? "&studentId=" + foundedPeople['student_id'] : "&studentId=null") + (foundedPeople['parents'][0] !== undefined ? "&parentId=" + foundedPeople['parents'][0]['id'] : "&parentId=null"));

    fetch(basicLoadUrl + '?cur_url=' + subdomain + (foundedPeople['student_id'] !== undefined ? "&studentId=" + foundedPeople['student_id'] : "&studentId=null") + (foundedPeople['parents'][0] !== undefined ? "&parentId=" + foundedPeople['parents'][0]['id'] : "&parentId=null" + "&lead_id=" + lead_id), {
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
            }
            createConnectionTips();

            if (user_id !== null){

                let filialData = parseBranchData(data['branches']);
                filialSelector.updateData(filialData);

                subjectsByBranches = data['subjects'];

                

                createConnectionTips();

                updateSubscriptionValue(data['subEnd']);

                studentsData = data['students'];
                parentsData = data['parents'];

                studentDataForSelector = parseStudentsData(studentsData);

                if (parentsData.length >= foundedPeople['parents'].length){
                    parentDataForSelector = parseParentsData(parentsData);
                }else{
                    parentDataForSelector = parseParentsData(foundedPeople['parents']);
                }


                parentSelector.updateData(parentDataForSelector);

                studentSelector.updateData(studentDataForSelector);

                isLeadBasicState = Boolean(data['isLead']);

                lessonTypesByBranches = data['lessonTypes'];
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
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

function findStudentAndParent(){
    var result = [];
    result['parents'] = [];
    var contactsList = document.querySelector("#contacts_list");

    if (contactsList != null){
        var contacts = contactsList.querySelectorAll(".linked-forms__item");

        contacts.forEach(contact => {
            var isPupil = contact.querySelector('.linked-form__field__label[title="Ученик"]').parentElement.querySelector(".control-checkbox").classList.contains("is-checked");
            if (isPupil){
                result['student_id'] = contact.querySelector('input[name="ID"]').value;
                result['student_name'] = getNameFromContact(contact);
            }else{
                result['parents'].push({
                    "id" : contact.querySelector('input[name="ID"]').value,
                    "name" :  getNameFromContact(contact)
                });
            }
        });
    }

    return result;
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
    var subLen = Math.floor((new Date(dateOfEnd) - new Date()) / (1000 * 60 * 60 * 24));
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