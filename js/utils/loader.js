function createLoader(parentElement){
    var loaderURL = chrome.runtime.getURL("../css/loader.gif");

    var loaderElement = document.createElement("img");
    loaderElement.classList.add("extension-loader");
    loaderElement.src = loaderURL;
    parentElement.querySelector(".title").querySelector(".block-loader").appendChild(loaderElement);
}

function removeLoader(parentElement){
    parentElement.querySelector(".title").querySelector(".block-loader").removeChild(parentElement.querySelector(".extension-loader"));
}