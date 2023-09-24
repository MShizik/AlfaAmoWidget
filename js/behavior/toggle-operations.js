function openContentBlock(element){
    if (!element.classList.contains("active") && !element.classList.contains("forbidden")){
        var opened_blocks = document.querySelectorAll(".widget-content-block.active:not(.block-fixed)");
        opened_blocks.forEach(oblock => {
            oblock.classList.remove("active");
            oblock.classList.add("inactive");
        });
        element.classList.add("active");
        element.classList.remove("inactive");
    }
};

function closeContentBlock(element){
    element.classList.remove("active");
    element.classList.add("inactive");
}

function toggleBtn(btn){
    if (!btn.classList.contains("active")){
        btn.classList.add("active");
        btn.classList.remove("inactive");
    }else{
        btn.classList.remove("active");
        btn.classList.add("inactive");
    }
}

function toggleOperationResult(isFine, text, block){
    var resultBlock = block.querySelector(".block-result");
    var sign = resultBlock.querySelector(".result-arrow");
    if (isFine){
        sign.classList.remove("failure");
        sign.classList.add("success");
    }else{
        sign.classList.remove("success");
        sign.classList.add("failure");
    }
    var textBlock = resultBlock.querySelector(".result-text");
    textBlock.innerHTML = text;
    resultBlock.classList.remove("hidden");
    setTimeout(() => {
        resultBlock.classList.add("hidden");
    }, 5000);
}