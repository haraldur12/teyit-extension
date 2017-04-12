var urlList=[];
var idList = [];

document.addEventListener('DOMContentLoaded', function() {
    getUrlListAndRestoreInDom();
    getUrlIdsAndRestoreInDom();
    addUrlValue();
    // event listener for the button inside popup window
    document.getElementById('listall').addEventListener('click', addLink);
    document.getElementById('teyitAdd').addEventListener('click', addId);

});

// fetch the URL of the current tab, add inside the window
function addLink() {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        var url = tabs[0].url;
        if(urlList.indexOf(url) === -1){
            //Don't add duplicates
            addUrlToListAndSave(url);
            addUrlToDom(url);
            form.submit();
        }
    });
}
function addId() {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        var url = tabs[0].url;
        if(idList.indexOf(url) === -1){
            addIdtoListAndSave(url);        }
            addToIds(url);
    });
}

function getUrlListAndRestoreInDom(){
    chrome.storage.local.get({urlList:[]},function(data){
        urlList = data.urlList;
        urlList.forEach(function(url){
            addUrlToDom(url);
        });
    });
}
function getUrlIdsAndRestoreInDom(){
    chrome.storage.local.get({idList:[]},function(teyit){
        idList = teyit.idList;
        idList.forEach(function(url){
            addToIds(url);
        });
    });
}
function addUrlToDom(url){
    document.getElementById("listContainer").innerHTML = "<h2 class='panel-title'>Teyit edilen sayfalar</h2>";
    var newLine = document.createElement('li');
    var newButton = document.createElement('button');
    var newLink = document.createElement('a');
    newLink.textContent = url;
    newLink.setAttribute('href',url);
    newLine.setAttribute('class','list-group-item');
    newLink.setAttribute('target','_blank');
    newLine.appendChild(newLink);
    document.getElementById("listView").appendChild(newLine);
}
function addToIds(url){
    document.getElementById("listIdsOfTeyits").innerHTML = "<h2 class='panel-title'>Eklenen teyitler:</h2>";
    var newLine = document.createElement('li');
    var newButton = document.createElement('button');
    var newLink = document.createElement('a');
    newLink.textContent = url;
    newLink.setAttribute('href',url);
    newLine.setAttribute('class','list-group-item');
    newLink.setAttribute('target','_blank');
    newLine.appendChild(newLink);
    document.getElementById("idView").appendChild(newLine);
}

function addUrlToListAndSave(url){
    if(urlList.indexOf(url) === -1){
        //URL is not already in list
        urlList.push(url);
        saveList();
    }
}
function addIdtoListAndSave(url){
    if(idList.indexOf(url) === -1 ){
        idList.push(url);
        saveIdList();
    }
}

function saveIdList(callback){
    chrome.storage.local.set({idList},function(){
        if(typeof callback === 'function'){
          callback();
        }
    });
}
function saveList(callback){
    chrome.storage.local.set({urlList},function(){
        if(typeof callback === 'function'){
            //If there was no callback provided, don't try to call it.
            callback();
        }
    });
}
function addUrlValue(){
      chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
      var url = tabs[0].url;
      document.getElementById("requested_url").value = tabs[0].url;
      hideButton(url);
      });
}

function hideButton(url){
  var page = url;
  var pageCheck = 'teyit.link';
  var button = document.getElementById('teyitAdd');
  if(page.indexOf(pageCheck) !== -1){

  }else{
    button.style.display = 'none';
  }
}
