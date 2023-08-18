var connectionSignAmo = document.querySelector("#amo-connection");
var connectionSignAlfa = document.querySelector("#alfa-connection");

var subjectsByBranches = [];

fetch('https://alfa-amo.ru/testwidget/basic_load.php', {
  method: 'GET'
})
.then(response => response.json()) 
.then(data => {
    var dbCon = data["db"];
    if (dbCon){
        connectionSignAmo.querySelector(".connection-indicator").classList.add(data['amo'] ? "connection-succeed" : "connection-failure");
        connectionSignAlfa.querySelector(".connection-indicator").classList.add(data['alfa'] ? "connection-succeed" : "connection-failure");

        let filialData = parseBranchData(data['branches']);
        filialSelector.updateData(filialData);

        subjectsByBranches = data['subjects'];

        createConnectionTips();
    }
})
.catch(error => {
    console.error('Error:', error);
});


function parseBranchData(branchesData){

    var parsedBranchesData = [];

    branchesData.forEach(branch => {
        parsedBranchesData.push([branch["id"], branch["name"]]);
    });
    
    return parsedBranchesData;
}