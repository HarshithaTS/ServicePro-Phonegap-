/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var myApp = new Framework7();

//   var result;
var createDbStatement;
var populateDbStatement;
var db;
var ServiceOrderArray = new Array();

var refreshAppFlag;

//var NavigationOrBackButtonClickedFlag = window.localStorage.getItem("NavigationOrBackButtonClicked");
var NavigationOrBackButtonClickedFlag = window.sessionStorage.getItem("NavigationOrBackButtonClicked");
//            alert("NavigationOrBackButtonClickedFlag2 : " + NavigationOrBackButtonClickedFlag);


/*
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
    
    var activeScreen = window.localStorage.getItem("ActiveScreen");

    if(activeScreen == "TotalTasksOverview")
    {
        document.getElementById("ScreenTitle").innerHTML = "My Tasks";
        window.localStorage.setItem('ScreenTitle',"My Tasks");
    }
    
    else if(activeScreen == "TasksForTodayOverview")
    {
        document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
        window.localStorage.setItem('ScreenTitle',"My Tasks For The Day");
    }
    
    checkOffline();
    
    //                              document.addEventListener("pause", onPause1, false);
    
    document.addEventListener("resume", onResume1, false);
    
    db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    //                              alert("doc ready");
    

    if(checkConnection() == "none")
    {
        db.transaction(qryDB, dbErrorCB);
    }
    
    else
    {
     if (NavigationOrBackButtonClickedFlag != "Yes") {

//         serviceTasksApiCall();

         //                                                         alert("Calling webservice");
        
        myApp1.showPreloader('Fetching Service Tasks');
        
        var webServiceURL = 'http://75.99.152.10:8050/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/110/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';
        
        var soapMessage = '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><n0:ZGssmwfmHndlEvntrqst00 id="o0" c:root="1" xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style"><DpistInpt i:type="c:Array" c:arrayType="d:anyType[4]">'
        +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'DEVICE-ID:184E3B65F52CFE8C191B2D34F3E54EE5:DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:EABEBABFEBD2605401301AE2A779935B:GLTTD:0.000000:GLNGTD:0.000000:' + '</Cdata></item>'
        +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'NOTATION:ZML:VERSION:0:DELIMITER:[.]' + '</Cdata></item>'
        +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]FULL-SETS' + '</Cdata></item>'
        + '</DpistInpt></n0:ZGssmwfmHndlEvntrqst00></v:Body></v:Envelope>';
        
        $.ajax({
               url: webServiceURL,
               type: "POST",
               dataType: "xml",
               //       timeout: 10000000,
               data: soapMessage,
               contentType: "text/xml; charset=\"utf-8\"",
               complete: onComplete,
               success:function(Result, textStatus, XMLHttpRequest) {
               //                                alert(Result);
               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
               //                                 alert("Status: " + textStatus); alert("Error: " + errorThrown);
               }
               });
        //                     });

     }
    //                              else if (NavigationOrBackButtonClickedFlag == "Yes") {
     else
     {
        //                              alert("else");
        db.transaction(qryDB, dbErrorCB);
        window.localStorage.setItem('NavigationOrBackButtonClicked',"No");
     }
    }

    
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
//    var parentElement = document.getElementById(id);
//    var listeningElement = parentElement.querySelector('.listening');
//    var receivedElement = parentElement.querySelector('.received');
//
//    listeningElement.setAttribute('style', 'display:none;');
//    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
}
};

*/



function qryDB(tx) {
//    alert("qryDB func");
    db.transaction(function (tx) {
                   
//                   alert("qryDB transaction func");
                   
                   var activeScreen = window.localStorage.getItem("ActiveScreen");
                   
                   if(activeScreen == "TotalTasksOverview")
                   {
                   //                   document.getElementById("ScreenTitle").innerHTML = "My Tasks";
                   
                   //                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);
                   
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);
                   
                   }
                   
                   else if(activeScreen == "TasksForTodayOverview")
                   {
                   //                   document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
                   
                   var today = new Date();
                   var dd = today.getDate();
                   var mm = today.getMonth()+1; //January is 0!
                   var yyyy = today.getFullYear();
                   
                   if(dd < 10) {
                   dd='0'+dd
                   }
                   
                   if(mm < 10) {
                   mm='0'+mm
                   }
                   
                   today = mm+'/'+dd+'/'+yyyy;
                   today = yyyy+'-'+mm+'-'+dd;
                   
                   //                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);
                   
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);
                   
                   }
                   
                   });
}

function querySuccessCB(tx, results) {
    
    //            alert(results.rows.length);
    
    //    serviceorderList();
    
    dynamicViewTable(results, svfieldAttr, svfieldLabel, "overviewTable","OBJECT_ID");
    
    
}

function qryError(tx, results) {
    //            alert("Query error");
}




function overviewDetails()    {

//                 app.receivedEvent('deviceready');
    
/*                 var activeScreen = window.localStorage.getItem("ActiveScreen");
                 
                 if(activeScreen == "TotalTasksOverview")
                 {
                 document.getElementById("ScreenTitle").innerHTML = "My Tasks";
                 window.localStorage.setItem('ScreenTitle',"My Tasks");
                 }
                 
                 else if(activeScreen == "TasksForTodayOverview")
                 {
                 document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
                 window.localStorage.setItem('ScreenTitle',"My Tasks For The Day");
                 }
*/
    
    
                 checkOffline();
                 
                 //                              document.addEventListener("pause", onPause1, false);
                 
                 document.addEventListener("resume", onResume1, false);
                 
                 db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    
    
    checkContextServiceTaskdatabase();
    
        if(window.sessionStorage.getItem("appDidEnterForeground") == "Yes")
        {
            window.sessionStorage.setItem('appDidEnterForeground',"No");

            onResume1();
//            window.sessionStorage.setItem('appDidEnterForeground',"No");
        }
        else
        {
                 if(checkConnection() == "none")
                 {
                 db.transaction(qryDB, dbErrorCB);
                 }
                 
                 else
                 {
                 if (NavigationOrBackButtonClickedFlag != "Yes") {
                 
                          serviceTasksApiCall();
                 
                 //                                                         alert("Calling webservice");
                 
/*                 myApp1.showPreloader('Fetching Service Tasks');
                 
                 var webServiceURL = 'http://75.99.152.10:8050/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/110/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';
                 
                 var soapMessage = '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><n0:ZGssmwfmHndlEvntrqst00 id="o0" c:root="1" xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style"><DpistInpt i:type="c:Array" c:arrayType="d:anyType[4]">'
                 +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'DEVICE-ID:184E3B65F52CFE8C191B2D34F3E54EE5:DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:EABEBABFEBD2605401301AE2A779935B:GLTTD:0.000000:GLNGTD:0.000000:' + '</Cdata></item>'
                 +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'NOTATION:ZML:VERSION:0:DELIMITER:[.]' + '</Cdata></item>'
                 +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]FULL-SETS' + '</Cdata></item>'
                 + '</DpistInpt></n0:ZGssmwfmHndlEvntrqst00></v:Body></v:Envelope>';
                 
                 $.ajax({
                        url: webServiceURL,
                        type: "POST",
                        dataType: "xml",
                        //       timeout: 10000000,
                        data: soapMessage,
                        contentType: "text/xml; charset=\"utf-8\"",
                        complete: onComplete,
                        success:function(Result, textStatus, XMLHttpRequest) {
                        //                                alert(Result);
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //                                 alert("Status: " + textStatus); alert("Error: " + errorThrown);
                        }
                        });
*/
                 //                     });
                 
                 }
                 //                              else if (NavigationOrBackButtonClickedFlag == "Yes") {
                 else
                 {
                     
//                 db.transaction(qryDB, dbErrorCB);
//                     db.transaction(qryDB, dbErrorCB, dbSuccessCB);
                     
                     db.transaction(function (tx) {
                                    
                                    var activeScreen = window.localStorage.getItem("ActiveScreen");
                                    
                                    if(activeScreen == "TotalTasksOverview")
                                    {
                                                                        
                                    //                   document.getElementById("ScreenTitle").innerHTML = "My Tasks";
                                    
                                    //                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);
                                    
//                                    tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);
                                    
                                    tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], function (tx, results) {
                                                  
//                                                  serviceorderList();
                                                  
                                                  dynamicViewTable(results, svfieldAttr, svfieldLabel, "overviewTable","OBJECT_ID");

                                        }, null);
                                    
                                    }
                                    
                                    else if(activeScreen == "TasksForTodayOverview")
                                    {
                                    //                   document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
                                    
                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!
                                    var yyyy = today.getFullYear();
                                    
                                    if(dd < 10) {
                                    dd='0'+dd
                                    }
                                    
                                    if(mm < 10) {
                                    mm='0'+mm
                                    }
                                    
                                    today = mm+'/'+dd+'/'+yyyy;
                                    today = yyyy+'-'+mm+'-'+dd;
                                    
                                    //                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);
                                    
//                                    tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);
                                    
                                    tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], function (tx, results) {
                                                  
//                                                  serviceorderList();
                                                  
                                                  dynamicViewTable(results, svfieldAttr, svfieldLabel, "overviewTable","OBJECT_ID");
                                                  
                                                  }, null);

                                    
                                    }
                                    
                                    });

                     
//                 window.localStorage.setItem('NavigationOrBackButtonClicked',"No");
                     window.sessionStorage.setItem('NavigationOrBackButtonClicked',"No");
                 }
                 }
        }

}

//app.initialize();


function serviceorderList(results)
{
    var id;
    var len = results.rows.length;
    console.log("result len: "+len);
//    hideWaitMe();
    
//    dynamicViewTable(results, svfieldAttr, svfieldLabel, "svtable1","OBJECT_ID");
    dynamicViewTable(results, svfieldAttr, svfieldLabel, "overviewTable","OBJECT_ID");

    //convertpdf();
/*
    $('#svtable1 tbody tr td span').click(function() {
                                          //alert($(this).attr('id'));
                                          id = $(this).attr('id');
                                          window.localStorage.setItem("SVgallerypath", "ServicePro/ServiceTasks/"+id);
                                          window.localStorage.setItem("SVLocalAttchmntpath", "ServiceTasks/LocalAttchments/"+id);
                                          window.location.href = 'serviceeditscreen.html?id='+id;	
                                          });
*/
    //dynamicViewGrid(results, fieldAttr, fieldLabel, "contentTable","MATNR");			
}

    
function onResume1()
{
    myApp.closeModal();

    checkOffline();
    
    //                alert("onresume func");
    
    window.sessionStorage.setItem('appEnteredForeground',"Yes");

    if(checkConnection() == "none")
    {
        db.transaction(qryDB, dbErrorCB);
    }
    else
    {
//        window.sessionStorage.setItem('appEnteredForeground',"Yes");
        serviceTasksApiCall();
    }
}

/*
function serviceTasksApiCall()
{
    //            alert("Calling webservice");
    
    myApp1.showPreloader('Fetching Service Tasks');
    
    var webServiceURL = 'http://75.99.152.10:8050/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/110/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';
    
    var soapMessage = '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><n0:ZGssmwfmHndlEvntrqst00 id="o0" c:root="1" xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style"><DpistInpt i:type="c:Array" c:arrayType="d:anyType[4]">'
    +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'DEVICE-ID:184E3B65F52CFE8C191B2D34F3E54EE5:DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:EABEBABFEBD2605401301AE2A779935B:GLTTD:0.000000:GLNGTD:0.000000:' + '</Cdata></item>'
    +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'NOTATION:ZML:VERSION:0:DELIMITER:[.]' + '</Cdata></item>'
    +  '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	'EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]FULL-SETS' + '</Cdata></item>'
    + '</DpistInpt></n0:ZGssmwfmHndlEvntrqst00></v:Body></v:Envelope>';
    
    $.ajax({
           url: webServiceURL,
           type: "POST",
           dataType: "xml",
           //       timeout: 10000000,
           data: soapMessage,
           contentType: "text/xml; charset=\"utf-8\"",
           complete: onComplete,
           success:function(Result, textStatus, XMLHttpRequest) {
           //                                alert(Result);
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
           //                                 alert("Status: " + textStatus); alert("Error: " + errorThrown);
           }
           });
}
*/

function serviceTasksApiCall()
{
//    alert("serviceTasksApiCall func");
    
    myApp.showPreloader('Fetching Service Tasks');
    
    restype = responseTypeDecider(WEBSERVICE_SERVICE_TASK);
    var items = new Array();
    var deviceid = localStorage.getItem("deviceid");
    var altdeviceid = localStorage.getItem("altdeviceid");
    //	var servicelistlistflag = window.localStorage.getItem(SERVICETASKS_LIST_PREF);
    items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
    items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
    //alert(resptype);
    
//    items.push("EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0"+restype);

    if(window.localStorage.getItem("refreshAppFlag") == "Yes")
    {
        items.push("EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]REFRESHED");
//        window.localStorage.setItem('refreshAppFlag',"No");
    }
    else
    {
        items.push("EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0"+restype);
    }

//    soapRequest(qryDB,items);
    soapRequest(contextApiCall,items);
}

//function contextApiCall(tx)
function contextApiCall(xmlHttpRequest, status)
{
    console.log("Soap Response ::" + xmlHttpRequest.responseText);

    if(window.localStorage.getItem("refreshAppFlag") == "Yes")
    {
        contextServiceOrderList(qryDB);
        //        window.localStorage.setItem('refreshAppFlag',"No");
    }
    else
    {
        qryDB();
    }
}


function onComplete(xmlHttpRequest, status)
{
    myApp.hidePreloader();
    
    //                     alert("Reponse text :\n"+xmlHttpRequest.responseText);
    console.log("Response :\n"+xmlHttpRequest.responseText);
    
    $(xmlHttpRequest.responseXML)
    .find('DpostOtpt').find('item')
    .each(function()
          {
          var name = $(this).find('Cdata').text();
          
          var result = name.split("[.]");
          
          if (result[0] == "DATA-TYPE")
          {
          createDbStatement = "";
          
          db.transaction(function(transaction){ createDb(transaction, result);}, dbErrorCB, dbSuccessCB);
          }
          else if(result[0] == "NOTATION:ZML:VERSION:0:DELIMITER:")
          {
          }
          else if(result[0] == "EVENT-RESPONSE")
          {
          }
          else
          {
          populateDbStatement = "";
          
          db.transaction(function(transaction){ populateDb(transaction, result);}, dbErrorCB, onDbSuccess);
          }
          });
    db.transaction(qryDB, dbErrorCB);
}


function createDb(tx,result) {
    if(result[0] == "DATA-TYPE")
    {
        tx.executeSql('DROP TABLE IF EXISTS ' + result[1]);
        
        var createDbStatement = "CREATE TABLE IF NOT EXISTS " + result[1] + " (";
        for( i=3 ; i<result.length ; i++)
        {
            if(i>3)
                createDbStatement = createDbStatement + ",";
            createDbStatement = createDbStatement + result[i];
        }
        createDbStatement = createDbStatement + ")";
        
        tx.executeSql(createDbStatement);
    }
}

function dbErrorCB(err) {
    //            alert("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.code);
}

function dbSuccessCB(err) {
    console.log("DB creation Success");
}

function populateDb(tx,result) {
    
    var populateDbStatement = "INSERT INTO " + result[0] + " VALUES " + " (";
    for( i=1 ; i<result.length ; i++)
    {
        if(i>1)
            populateDbStatement = populateDbStatement + ",";
        
        populateDbStatement = populateDbStatement + "'";
        populateDbStatement = populateDbStatement + result[i];
        populateDbStatement = populateDbStatement + "'";
    }
    populateDbStatement = populateDbStatement + ")";
    
    tx.executeSql(populateDbStatement);
}

// Transaction success callback
//
function onDbSuccess() {
    
    db.transaction(function (tx) {
                   //   tx.executeSql('SELECT * FROM ?', [result[0]], function (tx, results) {
                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10', [], function (tx, results) {
                                 var len = results.rows.length;
                                 var i;
                                 //       msg = "Found rows: " + len + "\n";
                                 
                                 for (i = 0; i < len; i++){
                                 }
                                 }, null);
                   });
}

/*
function qryDB(tx) {
                alert("qryDB func");
    db.transaction(function (tx) {
                   
                                              alert("qryDB transaction func");
                   
                   var activeScreen = window.localStorage.getItem("ActiveScreen");
                   
                   if(activeScreen == "TotalTasksOverview")
                   {
//                   document.getElementById("ScreenTitle").innerHTML = "My Tasks";
                   
//                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);
                   
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], querySuccessCB, qryError);

                   }
                   
                   else if(activeScreen == "TasksForTodayOverview")
                   {
//                   document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
                   
                   var today = new Date();
                   var dd = today.getDate();
                   var mm = today.getMonth()+1; //January is 0!
                   var yyyy = today.getFullYear();
                   
                   if(dd < 10) {
                   dd='0'+dd
                   }
                   
                   if(mm < 10) {
                   mm='0'+mm
                   }
                   
                   today = mm+'/'+dd+'/'+yyyy;
                   today = yyyy+'-'+mm+'-'+dd;
                   
//                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);
                   
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], querySuccessCB, qryError);

                   }
                   
                   });
}

function querySuccessCB(tx, results) {
    
    //            alert(results.rows.length);

//    msg1 = "";
//    for (i = 0; i < results.rows.length; i++){
//        
//        ServiceOrderArray[i] = new Array(results.rows.item(i).PRIORITY,
//                                         results.rows.item(i).STATUS,
//                                         results.rows.item(i).ZZKEYDATE + "\n" + results.rows.item(i).ZZKEYTIME,
//                                         results.rows.item(i).NAME_ORG1 + "\n" + results.rows.item(i).NAME_ORG2,
//                                         results.rows.item(i).ZZETADATE,
//                                         results.rows.item(i).OBJECT_ID,
//                                         results.rows.item(i).CP1_NAME1_TEXT,
//                                         results.rows.item(i).DESCRIPTION);
//        
//    }
//    //            alert(msg1);
//    
//    addTable();

    
//    serviceorderList();
    
    dynamicViewTable(results, svfieldAttr, svfieldLabel, "overviewTable","OBJECT_ID");
    

}

function qryError(tx, results) {
    //            alert("Query error");
}
*/

function addTable() {
    //     var myTableDiv = document.getElementById("metric_results")
    //     $('#'+overviewTable).dataTable().fnDestroy();
    //     var table = document.createElement('TABLE')
    
    //       $("#overviewTable").dataTable().fnDestroy();
    $("#overviewTable").empty();
    
    var table = document.getElementById('overviewTable');
    var tableHead = document.createElement('THEAD');
    var tableBody = document.createElement('TBODY');
    
    table.border = '1'
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    
    var heading = new Array();
    heading[0] = "Priority"
    heading[1] = "Status"
    heading[2] = "Start Date"
    heading[3] = "Customer Location"
    heading[4] = "Est. Arrival"
    heading[5] = "Service Doc."
    heading[6] = "Contact Name"
    heading[7] = "Description"
    
    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableHead.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
        
    }
    
    for (i = 0; i < ServiceOrderArray.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < ServiceOrderArray[i].length; j++) {
            
            var td = document.createElement('TD')
            
            if(j == 0) {
                var img = document.createElement("img");
                
                if ([ServiceOrderArray[i][j].localeCompare("LOW")] == 0) {
                    img.src = "img/LowPriority.png";
                }
                else if ([ServiceOrderArray[i][j].localeCompare("HIGH")] == 0) {
                    img.src = "img/HighPriority.png";
                }
                else if (([ServiceOrderArray[i][j].localeCompare("NORMAL")] == 0) || ([ServiceOrderArray[i][j].localeCompare("")] == 0)) {
                    img.src = "img/MediumPriority.png";
                }
                
                img.width = 25;
                img.height = 25;
                //                        img.alt = alt;
                
                //                   document.body.appendChild(img);
                td.appendChild(img);
            }
            else {
                td.appendChild(document.createTextNode(ServiceOrderArray[i][j]));
            }
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }
    
    //      myTableDiv.appendChild(table)
    
    //     $("#page").trigger("create");
    
    //  if(len>10)
    //  $('#'+viewId).dataTable({"info":false,"iDisplayLength": 10,"bSort" : false} );
    //  else
    //  $("#overviewTable").dataTable({"info":false,"bPaginate": false,"iDisplayLength": 10,"bSort" : false} );
    
    //          $("#overviewTable").dataTable({"info":false,"bPaginate": false,"bSort" : true} );
    $("#overviewTable").dataTable({"info":false,"bPaginate": false,"bSort" : true, "scrollY": '70vh',"scrollCollapse": true, responsive: true, "bDestroy": true} );
    
    $(".dataTables_filter").hide();
    $(".dataTables_length").hide();
    $(".search").keyup(function(){$(".dataTables_filter input").val($(".search").val());$( ".dataTables_filter input" ).keyup();});
    
    /*
     $(".search").on( 'keyup', function () {
     //                 table.search( this.value ).draw();
     $("#overviewTable").dataTable().search($(".search").val()).draw();
     } );
     */
    
    $(".search").keypress(function(event){
                          
                          var keycode = (event.keyCode ? event.keyCode : event.which);
                          if(keycode == '13'){
                          
                          //                                 alert("Enter key presses in somewhere.");
                          
                          //                                  event.preventDefault();
                          
                          //                                  $(".dataTables_filter input").val($(".search").val());
                          //                                  $( ".dataTables_filter input" ).keypress();
                          
                          event.preventDefault();
                          
                          }
                          });
    
    
    //       $(".dataTables_filter input").attr("data-role", "none");
    
}

function backButtonClicked()
{
//    window.localStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
}

function menuButtonClicked()
{
//    var myApp = new Framework7();
    myApp.modal({
                title:  'Menu',
/*                text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
*/
                verticalButtons: true,
                buttons: [
                          {
                          text: 'Refresh app',
                          onClick: function() {
                                window.localStorage.setItem('refreshAppFlag',"Yes");
                                onResume1();
                          }
                          },
/*
                          {
                          text: 'Task For Other Rep',
                          onClick: function() {
//                                getColleagueList();
                                window.location='colleague.html';
                          }
                          },
*/
                          {
                          text: 'Task For Other Rep',
                          onClick: function() {
                                getColleagueList("colleagueListView","colleagueItem-title","TaskForOtherRep");
                                myApp.popup('.popup-colleagueList');
                          }
                          }
                          ]
                })

}
