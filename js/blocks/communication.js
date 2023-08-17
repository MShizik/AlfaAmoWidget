var communiactionContentBlock = document.querySelector("#communication-content-block");
var communiactionBtn = document.querySelector("#communiaction-btn");

communiactionContentBlock.addEventListener("click" , () => {
    if (communiactionContentBlock.classList.contains("active") || communiactionContentBlock.classList.contains("forbidden")) return;
    toggleContentBlock(communiactionContentBlock);

    var communiactionWrapper = communiactionContentBlock.querySelector(".chat-wrapper");

    var messagesData = [
        {
            date : "12.03.2023",
            name  : "Клиент Клиентов",
            isManager : false,
            text : "Текстовое сообщение от клиента любой длины и текстуры"
        },
        {
            date : "28.03.2023",
            name  : "Менеджеров Менеджер",
            isManager : true,
            text : "Текстовое сообщение от менеджера любой длины и текстуры"
        },
    ];

    messagesData.forEach(data => {
        communiactionWrapper.appendChild(generateChatMessage(data));
    });
});


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


    let writerName = document.createElement('div');
    writerName.classList.add("writer-name");
    writerName.innerHTML = name;

    let writerStatus = document.createElement('div');
    writerStatus.classList.add("writer-status");
    writerStatus.innerHTML = isManager ? "Менеджер" : "Клиент";


    let messageText = document.createElement('div');
    messageText.classList.add("message-text");
    messageText.innerHTML = text;

    messageWriter.appendChild(writerName);
    messageWriter.appendChild(writerStatus);

    messageBody.appendChild(messageWriter);
    messageBody.appendChild(messageText);

    base.appendChild(dateHolder);
    base.appendChild(messageBody);

    return base;
}