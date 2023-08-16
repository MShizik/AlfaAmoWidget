var disabledFunctions = document.querySelectorAll(".disabled");

var tip = document.createElement('div');
tip.innerHTML = "Эта функция находится\n в разработке";
tip.classList.add("tip");

disabledFunctions.forEach(element => {
    element.addEventListener("mouseenter", function(e) {
        document.body.appendChild(tip);
    });

    element.addEventListener("mouseleave", function(e){
        document.body.removeChild(tip);
    });
    
    element.addEventListener("mousemove", function(e){
        tip.style.position = "absolute";
        tip.style.left = e.clientX + 15 +'px';
        tip.style.top = e.clientY + 'px';
    });
});

var connectionIndicators = document.querySelectorAll(".connection-failure");
var connectionTip = document.createElement('div');
connectionTip.innerHTML = "Что нужно, чтобы восстановить привязку";
connectionTip.classList.add("tip");

connectionIndicators.forEach(element => {
    var connection_mark = element.parentElement;
    connection_mark.addEventListener("mouseenter", function(e) {
        document.body.appendChild(connectionTip);
    });

    connection_mark.addEventListener("mouseleave", function(e){
        document.body.removeChild(connectionTip);
    });
    
    connection_mark.addEventListener("mousemove", function(e){
        connectionTip.style.position = "absolute";
        connectionTip.style.left = e.clientX + 15 +'px';
        connectionTip.style.top = e.clientY + 'px';
    });
});


var forbiddenBlocks = document.querySelectorAll(".forbidden");
var forbiddenTip = document.createElement('div');
forbiddenTip.innerHTML = "Вы не выбрали учащегося";
forbiddenTip.classList.add("tip");

forbiddenBlocks.forEach(element => {
    
    element.addEventListener("mouseenter", function(e) {
        if (element.classList.contains("forbidden")) document.body.appendChild(forbiddenTip);
    });

    element.addEventListener("mouseleave", function(e){
        if (element.classList.contains("forbidden")) document.body.removeChild(forbiddenTip);
    });
    
    element.addEventListener("mousemove", function(e){
        
        forbiddenTip.style.position = "absolute";
        forbiddenTip.style.left = e.clientX + 15 +'px';
        forbiddenTip.style.top = e.clientY + 'px';
    });
});