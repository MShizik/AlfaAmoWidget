function createLoader(parentElement){
    var loaderURL = chrome.runtime.getURL("../css/loader.gif");

    var loaderElement = document.createElement("img");
    loaderElement.classList.add("extension-loader");
    loaderElement.src = loaderURL;
    var loaderBlock = parentElement.querySelector(".title").querySelector(".block-loader");
    loaderBlock.classList.remove("hidden");
    loaderBlock.appendChild(loaderElement);
}

function removeLoader(parentElement){
    var loaderBlock = parentElement.querySelector(".title").querySelector(".block-loader");
    loaderBlock.classList.add("hidden");
    loaderBlock.removeChild(parentElement.querySelector(".extension-loader"));
}