
var connectionSignAmo = document.querySelector("#amo-connection");
var connectionSignAlfa = document.querySelector("#alfa-connection");

var subjectsByBranches = [];

let user_id = -1;

function basicLoad(){

    fetch('https://alfa-amo.ru/testwidget/basic_load.php?cur_url=' + document.location.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1].split(".")[0], {
    method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        var dbCon = data["db"];
        if (dbCon){
            toggleConnectionMarks(data['amo'], data['alfa']);

            let filialData = parseBranchData(data['branches']);
            filialSelector.updateData(filialData);

            subjectsByBranches = data['subjects'];

            user_id = data['user_id'];

            if (user_id === null){
                toggleConnectionMarks(false, false);
            }

            createConnectionTips();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
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