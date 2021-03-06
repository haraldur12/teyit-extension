/*
MIT License

Copyright (c) 2017 Ozan Araz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


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
    newLine.setAttribute('class','notice notice-success');
    newLink.setAttribute('target','_blank');
    newLine.appendChild(newLink);
    document.getElementById("listView").appendChild(newLine);
}
function addToIds(url){
    document.getElementById("listIdsOfTeyits").innerHTML = "<h2 class='panel-title'>Eklenen teyitler</h2>";
    var newLine = document.createElement('li');
    var newButton = document.createElement('button');
    var newLink = document.createElement('a');
    newLink.textContent = url;
    newLink.setAttribute('href',url);
    newLine.setAttribute('class','notice notice-success' );
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
