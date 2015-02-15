// ==UserScript==
// @name         SFDC_delete
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://*.salesforce.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function() {
    setButtons();
});

function setButtons(){
    $("[id^='aqtr_']*").each(function(i){
        var act_id=this.id.substr(this.id.indexOf("_") + 1);
        //alert("id " + act_id);
        var deleteBtn=document.createElement("input");
        deleteBtn.type="button";
        deleteBtn.value="Del";
        deleteBtn.textContent="Del";
        deleteBtn.onclick = function(){clickDelete(act_id);};
        $(this).find("th").before($('<td/>').append(deleteBtn));
    });
}
function clickDelete(i){
    $.get( "/"+i, function(data) {
        var navigateTo = $("input[name='del']", $(data))[0].onclick.toString().split("'")[1];
        //alert( "success" + navigateTo);
          $("tr[id='aqtr_"+i+"']").attr("style", "display: none;")
        deleteEntry(navigateTo);
       
    })
    .fail(function(data) {
        alert( "error ");
    });
 
    
}

function deleteEntry(entryUrl){
    $.get( entryUrl, function(data) {
        //alert( "success" );
        //document.location.reload(true); 
    })
    .fail(function(data) {
        alert( "error ");
    });
}