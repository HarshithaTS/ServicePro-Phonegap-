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

var currentLocationLatitude;
var currentLocationLongitude;
var nextCustomerResults;
var tasksForTodayResults;

var createDbStatement;
var populateDbStatement;
var db;
//var callContextApi = true;

//var NavigationOrBackButtonClickedFlag = window.localStorage.getItem("NavigationOrBackButtonClicked");
var NavigationOrBackButtonClickedFlag = window.sessionStorage.getItem("NavigationOrBackButtonClicked");
//alert("NavigationOrBackButtonClickedFlag1 : " + NavigationOrBackButtonClickedFlag);

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
        
        alert("device ready func");
        
        app.receivedEvent('deviceready');
        
        window.localStorage.setItem('ScreenTitle',"ServicePro");
        
        checkOffline();
        
//        document.addEventListener("pause", onPause, false);

        document.addEventListener("resume", onResume, false);
        
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
        
        alert("end device ready func");


        if(checkConnection() == "none")
        {
            db.transaction(querySrvcDcmntDB, queryErrorCB);
        }

        else
        {
            if (NavigationOrBackButtonClickedFlag == "Yes")
            {
                db.transaction(querySrvcDcmntDB, queryErrorCB);
                window.localStorage.setItem('NavigationOrBackButtonClicked',"No");
            }
            else
            {
                serviceTasksApiCall();
            }
        }

        
            
//        db.transaction(querySrvcDcmntDB, queryErrorCB);

//        document.getElementById("totalTasksNum").innerHTML = "1";
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

*/


function dashboardDetails()   {
//    alert("device ready func");
    
//    app.receivedEvent('deviceready');
    
    window.localStorage.setItem('ScreenTitle',"ServicePro");
    
    checkOffline();
    
//            document.addEventListener("pause", onPause, false);
    
    document.addEventListener("resume", onResume, false);
    
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    
//    alert("end device ready func");

//    alert("load func");
    
//    db.transaction(querySrvcDcmntDB, queryErrorCB);


    if(window.sessionStorage.getItem("appDidEnterForeground") == "Yes")
    {
        window.sessionStorage.setItem('appDidEnterForeground',"No");

        onResume();
//        window.sessionStorage.setItem('appDidEnterForeground',"No");
    }

    else
    {
        if(checkConnection() == "none")
            {
                 db.transaction(querySrvcDcmntDB, queryErrorCB);
            }
        else
            {
//            alert("load-else func");
            
                if (NavigationOrBackButtonClickedFlag == "Yes")
                    {
//                 alert("load-else-if func");
                        db.transaction(querySrvcDcmntDB, queryErrorCB);
//                    window.localStorage.setItem('NavigationOrBackButtonClicked',"No");
                        window.sessionStorage.setItem('NavigationOrBackButtonClicked',"No");
                    }
                else
                    {
//    ***   Commented for testing purpose, uncomment during deployment  ***
//    ***   Commented to decrease time taken by calling api while coding,testing and debugging   ***
//                        serviceTasksApiCall();
//    ***   Remove below line while uncommenting the actual above code   ***
                        db.transaction(querySrvcDcmntDB, queryErrorCB);
                    }
            }
    }

}

//app.initialize();

function onResume()
{
    myApp.closeModal();
    
    checkOffline();
    
    window.sessionStorage.setItem('appEnteredForeground',"Yes");
    
    if(checkConnection() == "none")
    {
        db.transaction(querySrvcDcmntDB, queryErrorCB);
    }
    else
    {
//        window.sessionStorage.setItem('appEnteredForeground',"Yes");
        serviceTasksApiCall();
    }
}

function queryErrorCB(err) {
    //            alert("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.code);
}

function querySrvcDcmntDB(tx) {

//    alert("querySrvcDcmntDB func");
    
    db.transaction(function (tx) {
                   
//                   alert("querySrvcDcmntDB func transaction func");
                   
//                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10', [], onQuerySuccess, queryError);
                   
//                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], onQuerySuccess, queryError);
                   

                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10', [], function (tx, results) {
                                 
//                                 alert("onQuerySuccess func; results.rows.length = " + results.rows.length);
                                 
                                 document.getElementById('telNum1callButton').style.visibility='hidden';
                                 document.getElementById('telNum2callButton').style.visibility='hidden';
                                 
                                 if(results.rows.length > 0)
                                 {
                                 //        msg1 = msg1 + results.rows.item(i).OBJECT_ID + "     " + results.rows.item(i).NAME_ORG1 + "\n";
                                 document.getElementById("nextCustomerName").innerHTML = results.rows.item(0).NAME_ORG1;
                                 document.getElementById("address1").innerHTML = results.rows.item(0).STRAS;
                                 document.getElementById("address2").innerHTML = results.rows.item(0).ORT01 + ", " + results.rows.item(0).REGIO;
                                 document.getElementById("address3").innerHTML = results.rows.item(0).PSTLZ + ", " + results.rows.item(0).LAND1;
                                 document.getElementById("contactName").innerHTML = results.rows.item(0).CP1_NAME1_TEXT;
                                 if(results.rows.item(0).CP1_TEL_NO.length > 0)
                                 {
                                    document.getElementById("telNum1").innerHTML = results.rows.item(0).CP1_TEL_NO;
                                 
    /*            var img = document.createElement("img");
     img.src = "img/CallButton.png";
     
     var src = document.getElementById("telNum1callButton");
     //            src.style.width = 15px;
     //            src.height = 15px;
     src.appendChild(img);
     
     //            $('#telNum1callButton').append('<img style="width:15px;height:15px;" src="img/CallButton.png" />');
     
     //        $("#telNum1").append("<a href='tel:" + results.rows.item(0).CP1_TEL_NO + "'>");
     //        document.getElementById("telNum1").append("<a href='sms:" + results.rows.item(0).CP1_TEL_NO + "'>");
     */
                                    document.getElementById('telNum1callButton').style.visibility='visible';
                                 
//                                 $("#callTelNum1").attr('href', "facetime:"+results.rows.item(0).CP1_TEL_NO);
//                                 $("#callTeleNum1").attr('href', "facetime:"+results.rows.item(0).CP1_TEL_NO);
                                 
                                 }
                                 if(results.rows.item(0).CP1_TEL_NO2.length > 0)
                                 {
                                    document.getElementById("telNum2").innerHTML = results.rows.item(0).CP1_TEL_NO2;
                                 document.getElementById('telNum2callButton').style.visibility='visible';
                                 
//                                 $("#callTelNum2").attr('href', "facetime:"+results.rows.item(0).CP1_TEL_NO2);
//                                 $("#callTeleNum2").attr('href', "facetime:"+results.rows.item(0).CP1_TEL_NO2);
                                 
                                 }
                                 //        document.getElementById("totalTasksNum").innerHTML = results.rows.length;
                                 }
                                 document.getElementById("totalTasksNum").innerHTML = results.rows.length;
                                 }, null);


//                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10 WHERE ROWID=1', [], qurySuccess, queryError);
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 WHERE ROWID=1', [], qurySuccess, queryError);
                   
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

//                   tx.executeSql('SELECT * FROM ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], qrySuccess, queryError);
                   tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 where ZZKEYDATE = ?', [today], qrySuccess, queryError);
                   
                   });
}


function openCallModal(clickedId)
{
    
//    $("#callTelNum1").attr('href', "facetime:"+document.getElementById("telNum1").innerHTML);


    //    var myApp = new Framework7();
    myApp.modal({
                title:  'Choose action',
    
                verticalButtons: true,
                buttons: [
                          {
                          text: 'Facetime',
                          onClick: function() {
//                            alert($(this).attr('id'));
//                          alert($(event.target).attr('id'));
//                            alert("clicked num = " + clickedId);
                            if(clickedId == "callTelNum1")
                          {
                          console.log("callTelnum1 clicked : " + document.getElementById("telNum1").innerHTML);
//                                $("#callTelNum1").attr('href', "facetime:+12123231313");
//                          $("#callTelNum1").attr('href', "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from TCW ServicePro User&body=");
//                          window.location.href='mailto:gss.mobile@globalsoft-solutions.com?subject= GSS Mobile Diagnosis Checks';
//                          window.open('tel:900300400');
//                          $('#callPhone1').append('<a href="mailto:gss.mobile@globalsoft-solutions.com?subject= GSS Mobile Diagnosis Checks" class="external link"></a>');
                          
//                          $("#callTelNum1").attr('href', "facetime:"+document.getElementById("telNum1").innerHTML);
                          
//                          openFacetimeForTelNum1();
                          window.location.href="facetime:"+document.getElementById("telNum1").innerHTML;
//                            window.location.href='facetime:+12123231313';

                          }
                            else
                          {
                          console.log("callTelnum2 clicked");
//                                $("#callTelNum2").attr('href', "facetime:"+document.getElementById("telNum2").innerHTML);
                          window.location.href="facetime:"+document.getElementById("telNum2").innerHTML;
                          }
                          }
                          },

                          {
                          text: 'Phone call',
                          onClick: function() {
//                            alert("clicked num = " + clickedId);
                            if(clickedId == "callTelNum1")
                            {
//                                $("#callTelNum1").attr('href', "tel:"+document.getElementById("telNum1").innerHTML);
                                window.location.href="tel:"+document.getElementById("telNum1").innerHTML;
                            }
                            else
                            {
//                                $("#callTelNum2").attr('href', "tel:"+document.getElementById("telNum2").innerHTML);
                                window.location.href="tel:"+document.getElementById("telNum2").innerHTML;
                            }
                          }
                          }
                          ]
                })

}

/*
function openFacetimeForTelNum1()
{
//    $("#callTelNum1").attr('href', "facetime:"+document.getElementById("telNum1").innerHTML);
    window.location.href='mailto:gss.mobile@globalsoft-solutions.com?subject= GSS Mobile Diagnosis Checks';

}
*/

function onQuerySuccess(tx, results) {
    
//    alert("onQuerySuccess func; results.rows.length = " + results.rows.length);
    
    document.getElementById('telNum1callButton').style.visibility='hidden';
    document.getElementById('telNum2callButton').style.visibility='visible';
    
    if(results.rows.length > 0)
    {
//        msg1 = msg1 + results.rows.item(i).OBJECT_ID + "     " + results.rows.item(i).NAME_ORG1 + "\n";
        document.getElementById("nextCustomerName").innerHTML = results.rows.item(0).NAME_ORG1;
        document.getElementById("address1").innerHTML = results.rows.item(0).STRAS;
        document.getElementById("address2").innerHTML = results.rows.item(0).ORT01 + ", " + results.rows.item(0).REGIO;
        document.getElementById("address3").innerHTML = results.rows.item(0).PSTLZ + ", " + results.rows.item(0).LAND1;
        document.getElementById("contactName").innerHTML = results.rows.item(0).CP1_NAME1_TEXT;
        if(results.rows.item(0).CP1_TEL_NO.length > 0)
        {
            document.getElementById("telNum1").innerHTML = results.rows.item(0).CP1_TEL_NO;
            
/*            var img = document.createElement("img");
            img.src = "img/CallButton.png";
            
            var src = document.getElementById("telNum1callButton");
//            src.style.width = 15px;
//            src.height = 15px;
            src.appendChild(img);
            
//            $('#telNum1callButton').append('<img style="width:15px;height:15px;" src="img/CallButton.png" />');

//        $("#telNum1").append("<a href='tel:" + results.rows.item(0).CP1_TEL_NO + "'>");
//        document.getElementById("telNum1").append("<a href='sms:" + results.rows.item(0).CP1_TEL_NO + "'>");
*/
            
            document.getElementById('telNum1callButton').style.visibility='visible';

        }
        if(results.rows.item(0).CP1_TEL_NO.length > 0)
        {
            document.getElementById("telNum2").innerHTML = results.rows.item(0).CP1_TEL_NO2;
            document.getElementById('telNum2callButton').style.visibility='visible';
        }
//        document.getElementById("totalTasksNum").innerHTML = results.rows.length;
    }
    document.getElementById("totalTasksNum").innerHTML = results.rows.length;
}

function qurySuccess(tx, results) {

    nextCustomerResults = results;
//    setTimeout(function(){showMap(results,"map_canvas1")}, 3000);
    mapNextCustomerButtonClicked();
}


function qrySuccess(tx, results) {
    
        document.getElementById("tasksForTheDayNum").innerHTML = results.rows.length;
    tasksForTodayResults = results;
//    setTimeout(function(){showMap(results)}, 3000);
}

function queryError(tx, results) {
                alert("Query error");
}

function mapNextCustomerButtonClicked()
{
//    alert("totalTasksResults = " +  nextCustomerResults);
    setTimeout(function(){showMap(nextCustomerResults,"map_canvas1")}, 3000);
}

function itineraryButtonClicked()
{
//    alert("tasksForTodayResults = " +  tasksForTodayResults);
    setTimeout(function(){showMap(tasksForTodayResults,"map_canvas2")}, 3000);
}


// onSuccess Geolocation
//
function onSuccess(position) {
    
//    currentLocationLatitude = position.coords.latitude;
//    currentLocationLongitude = position.coords.longitude;
    
    alert("current location coordinates : " + position.coords.latitude + "\n" + position.coords.longitude );
    
    alert("Current location found successfully");
    
//    window.localStorage.setItem('Latitude',position.coords.latitude);
//    window.localStorage.setItem('Longitude',position.coords.longitude);
    
    window.sessionStorage.setItem('Latitude',position.coords.latitude);
    window.sessionStorage.setItem('Longitude',position.coords.longitude);
    
//    var map = new GoogleMap();
//    map.initialize();
    
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

/*
function GoogleMap(){
    
    this.initialize = function(){
        var map = showmap();
        addMarkersToMap(map);
    }
    
    var addMarkersToMap = function(map){
        var mapBounds = new google.maps.LatLngBounds();
        
        //        var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
        //
        //        var markerOne = new google.maps.Marker({
        //                                               position: latitudeAndLongitudeOne,
        //                                               map: map
        //                                               });
        
        var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
        
        var markerOne = new google.maps.Marker({
                                               position: latitudeAndLongitudeTwo,
                                               map: map
                                               });
        
        //        var latitudeAndLongitudeThree = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latitudeAndLongitudeThree = new google.maps.LatLng(currentLocationLatitude, currentLocationLongitude);
        
        var markerOne = new google.maps.Marker({
                                               position: latitudeAndLongitudeThree,
                                               map: map
                                               });
        
        //        mapBounds.extend(latitudeAndLongitudeOne);
        mapBounds.extend(latitudeAndLongitudeTwo);
        mapBounds.extend(latitudeAndLongitudeThree);
        
        map.fitBounds(mapBounds);
    }
    
    
    
    var showmap = function(){
        var mapOptions = {
			     zoom: 4,
			     center: new google.maps.LatLng(-33, 151),
			     mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        var map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);
        
        return map;
    }
}
*/

function showMap(results,mapId)
{
//    alert("showMap");
    //var iframe = document.getElementById("iframeId");
    //iframe.contentWindow.loadMap(results);
    loadMap(results,mapId);
    
}

function totalTasksTileClicked()
{
    window.localStorage.setItem('ActiveScreen',"TotalTasksOverview");
//    window.localStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    window.localStorage.setItem('NavigatedFromOverview',"TotalTasksOverview");

}

function tasksForTodayTileClicked()
{
    window.localStorage.setItem('ActiveScreen',"TasksForTodayOverview");
//    window.localStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    window.localStorage.setItem('NavigatedFromOverview',"TasksForTodayOverview");

}

/*
function serviceTasksApiCall()
{
    myApp.showPreloader('Fetching Service Tasks');

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
//                alert(Result);
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
           }
           });
}
*/

function serviceTasksApiCall()
{
    myApp.showPreloader('Fetching Service Tasks');
    
    restype = responseTypeDecider(WEBSERVICE_SERVICE_TASK);
    var items = new Array();
    var deviceid = localStorage.getItem("deviceid");
    var altdeviceid = localStorage.getItem("altdeviceid");
    //	var servicelistlistflag = window.localStorage.getItem(SERVICETASKS_LIST_PREF);
    items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
    items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
    //alert(resptype);
    items.push("EVENT[.]SERVICE-DOX-FOR-EMPLY-BP-GET[.]VERSION[.]0"+restype);
//    items.push("ZGSEVDST_MTRLSRCH01[.]*");
//    soapRequest(getServiceOrderListResponse,items);
    soapRequest(quryDb,items);
}

//function quryDb()
function quryDb(xmlHttpRequest, status)
{
    
    console.log("Soap Response ::" + xmlHttpRequest.responseText);
    
//    if(callContextApi == true)
    if(window.sessionStorage.getItem("callContextApiFlag") == null)
    {
        
//        contextServiceOrderList();
        contextServiceOrderList(querySrvcDcmntDB);
        
//        callContextApi = false;
        window.sessionStorage.setItem('callContextApiFlag',"No");
    }
    
//    alert("hhii");
    else
    {
        db.transaction(querySrvcDcmntDB, queryErrorCB);
    }
    
}

/*
function onComplete(xmlHttpRequest, status)
{
//    alert("on complete func");
    
    myApp.hidePreloader();
    
//                         alert("Reponse text :\n"+xmlHttpRequest.responseText);
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
          
          db.transaction(function(transaction){ createDB(transaction, result);}, errorCB, dbSuccessCB);
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
          
          db.transaction(function(transaction){ populateDB(transaction, result);}, errorCB, successCB);
          }
          });
    
    db.transaction(querySrvcDcmntDB, queryErrorCB);

}


function createDB(tx,result) {
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

function errorCB(err) {
    //            alert("Error processing SQL: "+err.code);
    console.log("Error processing SQL: "+err.code);
}

function dbSuccessCB(err) {
    console.log("DB creation Success");
}

function populateDB(tx,result) {
    
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

function successCB() {    
}

*/