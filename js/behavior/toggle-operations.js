var content_blocks = document.querySelectorAll(".content-block:not(.disabled)");

content_blocks.forEach(element => {
    element.addEventListener("click", function(e){
        if (!element.classList.contains("active") && !element.classList.contains("forbidden")){
            var opened_blocks = document.querySelectorAll(".content-block.active:not(.block-fixed)");
            opened_blocks.forEach(oblock => {
                oblock.classList.remove("active");
                oblock.classList.add("inactive");
            });
            element.classList.add("active");
            element.classList.remove("inactive");
        }
    });
});