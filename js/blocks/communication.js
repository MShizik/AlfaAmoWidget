var communiactionContentBlock = document.querySelector("#communication-content-block");
var communicationBtn = document.querySelector("#communication-btn");

var offset = 0;
var messagesData = 0;

communiactionContentBlock.addEventListener("click" , () => {
    if (communiactionContentBlock.classList.contains("active") || communiactionContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(communiactionContentBlock);

    var communiactionWrapper = communiactionContentBlock.querySelector(".chat-wrapper");

    communiactionWrapper.innerHTML = "";

    fetch('https://alfa-amo.ru/testwidget/load_communication.php?branch_id=' + filialSelector.option + "&user_id=" + user_id + "&offset=" + offset + "&student_id=" + studentSelector.option, {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        toggleConnectionMarks(data['amo'], data['alfa']);
        createConnectionTips();

        messagesData = data['communications'];

        if (messagesData.length < 10){
            communicationBtn.classList.remove("active");
            communicationBtn.classList.add("inactive");
        }

        messagesData.forEach(data => {
            communiactionWrapper.appendChild(generateChatMessage(data));
        });
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
});

communicationBtn.addEventListener("click", () => {
    var communiactionWrapper = communiactionContentBlock.querySelector(".chat-wrapper");
    offset += 10;

    

    fetch('https://alfa-amo.ru/testwidget/load_communication.php?branch_id=' + filialSelector.option + "&user_id=" + user_id + "&offset=" + offset + "&student_id=" + studentSelector.option, {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        toggleConnectionMarks(data['amo'], data['alfa']);
        createConnectionTips();

        messagesData = data['communications'];

        if (messagesData.length < 10){
            communicationBtn.classList.remove("active");
            communicationBtn.classList.add("inactive");
        }else{
            communicationBtn.classList.remove("inactive");
            communicationBtn.classList.add("active");
        }

        messagesData.forEach(data => {
            communiactionWrapper.appendChild(generateChatMessage(data));
        });
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function resetCommunication(){
    offset = 0;
    var communiactionWrapper = communiactionContentBlock.querySelector(".chat-wrapper");
    communiactionWrapper = "";
}


function generateChatMessage(message){
    let date = message['date'];
    let name = message['name'];
    let isManager = message['isManager'];
    let text = message['text'];

    let base = document.createElement('div');
    base.classList.add("chat-message");
    if (isManager) base.classList.add("manager-message");
    else base.classList.add("user-message");

    let dateHolder = document.createElement('div');
    dateHolder.classList.add("message-date");
    dateHolder.innerHTML = date;

    let messageBody = document.createElement('div');
    messageBody.classList.add("message-body");

    let messageWriter = document.createElement('div');
    messageWriter.classList.add("message-writer");

    if (name != ""){
        let writerName = document.createElement('div');
        writerName.classList.add("writer-name");
        writerName.innerHTML = name;
        messageWriter.appendChild(writerName);
    }

    

    let writerStatus = document.createElement('div');
    writerStatus.classList.add("writer-status");
    writerStatus.innerHTML = isManager ? "Менеджер" : "Клиент";


    let messageText = document.createElement('div');
    messageText.classList.add("message-text");
    messageText.innerHTML = text;

    
    messageWriter.appendChild(writerStatus);

    messageBody.appendChild(messageWriter);
    messageBody.appendChild(messageText);

    base.appendChild(dateHolder);
    base.appendChild(messageBody);

    return base;
}