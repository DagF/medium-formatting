/* https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests#Example.3A_creating_a_standard_function_to_read_external_files */
function xhrSuccess () { this.callback.apply(this, this.arguments); }

function xhrError () { console.error(this.statusText); }

function loadFile (sURL, fCallback , argumentToPass1) {
    var oReq = new XMLHttpRequest();
    oReq.callback = fCallback;
    oReq.arguments = Array.prototype.slice.call(arguments, 2);
    oReq.onload = xhrSuccess;
    oReq.onerror = xhrError;
    oReq.open("get", sURL, true);
    oReq.send(null);
}

function getSectionFromFile(index){
    container.innerHTML = sections.length + " of " + section_links.length + " pages loaded";
    var section = "<h1>Could not load page</h1>";
    var p = document.createElement("div");
    p.innerHTML = this.responseText;
    sections[index+1] = p.getElementsByTagName("article")[0];
    if(sections.length > section_links.length){
        container.innerHTML = "";
        for(var i = 0; i < sections.length; i++){
            container.innerHTML += "<article class='post'>" + sections[i].innerHTML + "</article>";
        };
    }
}
/*End copy*/

function cleanSection(section){

}

var article = document.getElementsByTagName("article")[0];

var links = article.querySelectorAll("li a");

var sections = [];
sections.push(article);
var section_links = [];

var container = document.getElementById("container");
container.innerHTML = "Loading pages";

for(var i = 0; i < links.length; i++){
    if(links[i].host == window.location.hostname){
        section_links.push(links[i]);
        loadFile(links[i].href, getSectionFromFile, i);
    }
};



