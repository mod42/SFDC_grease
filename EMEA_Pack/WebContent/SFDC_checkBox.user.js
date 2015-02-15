// ==UserScript==
// @id		     SFDCcheckBoxes
// @name         SFDC add_delete checkBoxes
// @namespace    http://your.homepage/
// @version      0.4
// @description  This script adds check Boxes to the Salesforces "unresolved items" line items. With the "Del" Button the entries are directly deleted.
// @author       Steffen Miller
// @match        https://*.salesforce.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function() {
    setButtons();
    var delAllBtn = $(document.createElement("input")).attr({
        id : 'checkAll',
        name : "deleteAll",
        value :"delete Selected",
        class : "btn",
        type : 'button'
    });
    delAllBtn.click ( function( event )
                     {
                         $( "input[type=checkbox]:checked" ).each(function(){
                             var act_id = this.value;
                             if ( act_id != "on"){
                                 //alert("Treffer " + act_id);
                                 clickDelete(act_id);
                             }
                         });
                         //alert("Anzahl "+ $( "input[type=checkbox]:checked" ).length) ;
                     } );
    
    var checkBtnAll = $(document.createElement("input")).attr({
        id : 'checkAll',
        name : "delete Selection",
        type : 'checkbox',
        checked : false,
    });
    $(".queueButtonTR").prepend($('<td>').append(checkBtnAll));
    $("[id='checkAll']").click(function () {    
        $(':checkbox.deleteList').prop('checked', this.checked);
    });
    
    $("[id='massAssociationButtonDiv']").prepend(delAllBtn);
});

function setButtons(){
    $("[id^='aqtr_']*").each(function(i){
        var act_id=this.id.substr(this.id.indexOf("_") + 1);
        //alert("id " + act_id);
        var checkBtn = $(document.createElement("input")).attr({
            id : 'entry_' + act_id,
            name : 'deleteList',
            class: 'deleteList',
            value : act_id,
            type : 'checkbox'
        });
        var deleteBtn=document.createElement("input");
        deleteBtn.type="button";
        deleteBtn.value="Del";
        deleteBtn.textContent="Del";
        deleteBtn.onclick = function(){clickDelete(act_id);};
//        $(this).find("th").before($('<td/>').append(deleteBtn).append(checkBtn));
        $(this).find("th").before($('<td/>').append(checkBtn));

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
        var checkBtn = $(document.createElement("input")).attr({
			 id:	'entry_' + act_id
 			,name:	deleteList
 			,value:	act_id
 			,type:	'checkbox'
 			,checked:false
 		})
        $(this).find("th").before($('<td/>').append(deleteBtn).append(checkBtn));
        
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