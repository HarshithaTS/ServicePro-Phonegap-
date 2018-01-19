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


//var myApp = new Framework7();
/*
var myApp = new Framework7({
        modalStack: true,
    });
*/
//var $$ = Dom7;

var db;
var colleagueList;
var query;
//var colleague_uname;
var colleagueTaskResults;

db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);

//var NavigationOrBackButtonClickedFlag = window.localStorage.getItem("NavigationOrBackButtonClicked");
var NavigationOrBackButtonClickedFlag = window.sessionStorage.getItem("NavigationOrBackButtonClicked");
//            alert("NavigationOrBackButtonClickedFlag2 : " + NavigationOrBackButtonClickedFlag);


function getColleagueList(colleagueListViewId,searchInColleagueTitleId,colleagueFunctionality)
{
//    db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    
    myApp.closeModal();
    
    db.transaction(function (tx) {
        
        tx.executeSql('SELECT * FROM SERVICE_DOX_CONTEXT_DATA_GET_ZGSXCAST_EMPLY01', [], function (tx, results) {
                      
                      var len = results.rows.length;
                      colleagueList = results;
//                      alert("len = " + len);
                      createColleagueListView(colleagueListViewId,searchInColleagueTitleId,colleagueFunctionality);
        }, null);
    });
}

function createColleagueListView(colleagueListViewId,searchInColleagueTitleId,colleagueFunctionality)
{
//    $('#colleagueListView').text('');
    $('#'+colleagueListViewId).text('');

    query = "<ul>";
    for(var i = 0; i < colleagueList.rows.length; i++)
    {
//        query = query + '<li class="item-content"><div class="item-inner"><div class="item-title">' + colleagueList.rows.item(i).MC_NAME1 +'</div></div></li>';
        
//        query = query + '<li class="item-link item-content" id="' + colleagueList.rows.item(i).UNAME + '"><div class="item-inner"><div class="colleagueItem-title">';
        query = query + '<li class="item-link item-content colleagueId" id="' + colleagueList.rows.item(i).UNAME + '"><div class="item-inner"><div class="' + searchInColleagueTitleId + '">';
//        query = query + '<li class="item-link item-content ' + searchInColleagueTitleId + '" id="' + colleagueList.rows.item(i).UNAME + '"><div class="item-inner">';
 
/*
        query = query + '<li class="item-link item-content" id="' + colleagueList.rows.item(i).UNAME + '">';
        
        if(colleagueFunctionality == "TaskTransfer")
            query = query + '<a href="#" class="confirm-title-ok">';
        
        query = query + '<div class="item-inner"><div class="' + searchInColleagueTitleId + '">';
*/

//        if(colleagueFunctionality == "TaskTransfer")
//            query = query + '<a href="#" class="confirm-title-ok">';

        
        if(colleagueList.rows.item(i).MC_NAME1.length > 0)
            query = query + colleagueList.rows.item(i).MC_NAME1;
        if(colleagueList.rows.item(i).MC_NAME2.length > 0)
            query = query + " " + colleagueList.rows.item(i).MC_NAME2;
        
        
//        if(colleagueFunctionality == "TaskTransfer")
//            query = query + '</a>';
        
        query = query +'</div></div></li>';
//        query = query +'</div></li>';
/*
        query = query + '</div></div>';
        if(colleagueFunctionality == "TaskTransfer")
            query = query + '</a>';
        query = query + '</li>';
*/
    }
    query = query + "</ul>";
    console.log("colleagueListQuery : " + query);
    
//    $('#colleagueListView').append(query);
    $('#'+colleagueListViewId).append(query);

/*
    var $$ = Dom7;
    
    $$('.confirm-title-ok').on('click', function () {
                               myApp.confirm('Are you sure you want to transfer task to ?', 'Colleague Transfer Alert', function () {
                                             myApp.alert('You clicked Ok button');
                                             });
                               });
*/
    
    if(colleagueFunctionality == "TaskForOtherRep")
    {
//        $('li').click(function() {
//        $('.colleagueItem-title').click(function() {
        $('.colleagueId').click(function() {

            var colleague_uname = $(this).attr('id');
//            var colleague_uname = $('li').attr('id');

            console.log("clicked uname : " + colleague_uname);
//            window.location.href = 'details.html?shipid='+id;
                  
            db.transaction(function (tx) {
                                 
                tx.executeSql('DELETE FROM SERVICE_DOX_FOR_COLLEAGUE_GET_ZGSXSMST_SRVCDCMNT10', [], null, null);
            });
                  
            colleagueServiceTasksApiCall(colleague_uname);
        });
    }
    else if(colleagueFunctionality == "TaskTransfer")
    {
//        $('li').click(function() {
//        $('.colleagueItem-titleForTransfer').click(function() {
        $('.colleagueId').click(function() {

//        var $$ = Dom7;
                      
            var colleague_uname = $(this).attr('id');
//            var colleague_uname = $('li').attr('id');
                              
                                
            db.transaction(function (tx) {
                                               
                tx.executeSql('SELECT * FROM SERVICE_DOX_CONTEXT_DATA_GET_ZGSXCAST_EMPLY01 WHERE UNAME=?', [colleague_uname], function (tx, results) {
                                                             
                        var len = results.rows.length;
                        colleagueList = results;
                              
                        var colleagueName = "";
                        if(results.rows.length > 0)
                        {
                            if(colleagueList.rows.item(0).MC_NAME1.length > 0)
                              colleagueName = colleagueList.rows.item(0).MC_NAME1;
                            if(colleagueList.rows.item(0).MC_NAME2.length > 0)
                              colleagueName = colleagueName + " " + colleagueList.rows.item(0).MC_NAME2;
                              
                            myApp.confirm('Are you sure you want to transfer task to ' + colleagueName + '?', 'Colleague Transfer Alert', function () {
                                    transferServiceTaskToColleagueApiCall(colleague_uname);
                            });
                        }
                              
                              
                }, null);
            });
                                
                                
/*
//        $$('.confirm-title-ok').on('click', function () {
            myApp.confirm('Are you sure you want to transfer task to ' + colleagueName + '?', 'Colleague Transfer Alert', function () {
//                myApp.alert('You clicked Ok button');
                transferServiceTaskToColleagueApiCall(colleague_uname);
            });
//        });
*/
                                
        });
    }
    
}


function colleagueServiceTasksApiCall(colleague_uname)
{
    myApp.showPreloader("Fetching colleague's service tasks");
    
//    restype = responseTypeDecider(WEBSERVICE_SERVICE_TASK);
    var items = new Array();
    var deviceid = localStorage.getItem("deviceid");
    var altdeviceid = localStorage.getItem("altdeviceid");
    //	var servicelistlistflag = window.localStorage.getItem(SERVICETASKS_LIST_PREF);
    items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
    items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
    //alert(resptype);
    items.push("EVENT[.]SERVICE-DOX-FOR-COLLEAGUE-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]FULL-SETS");
    items.push("SWDTUSER[.]"+colleague_uname);
//    soapRequest(colleagueQryDb,items);
    soapRequest(colleagueTaskApiSoapCallBack,items);
}

function colleagueTaskApiSoapCallBack()
{
    window.location='colleagueTasksOverview.html';
}

function colleagueQryDb()
{
//    db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    
    checkContextServiceTaskdatabase();

    
    window.localStorage.setItem('ActiveScreen',"ColleagueTasksOverview");
    
    db.transaction(function (tx) {
                   
        tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_COLLEAGUE_GET_ZGSXSMST_SRVCDCMNT10', [], function (tx, results) {
                      colleagueTaskResults = results;
//                      window.location='colleagueTasksOverview.html';
//                      var len = results.rows.length;
//                      alert("colleagueQryDb len = " + len);
                dynamicViewTable(results, svfieldAttr, svfieldLabel, "colleagueTable","OBJECT_ID");
                      
            }, null);
    });

}

function loadColleagueTable()
{
//    dynamicViewTable(results, svfieldAttr, svfieldLabel, "colleagueTable","OBJECT_ID");
    dynamicViewTable(colleagueTaskResults, svfieldAttr, svfieldLabel, "colleagueTable","OBJECT_ID");
}


function transferServiceTaskToColleagueApiCall(colleague_uname)
{
    myApp.showPreloader("Please wait while transfering task...");
    
    
    var clickedServiceOrderValue = window.localStorage.getItem('clickedServiceOrder');
    var clickedServiceOrderID = clickedServiceOrderValue.substring(0,clickedServiceOrderValue.indexOf('/'));
    var clickedServceOrderItemNum = clickedServiceOrderValue.substring(clickedServiceOrderValue.indexOf('/')+1);
    
    db.transaction(function (tx) {
                   
        tx.executeSql('SELECT * FROM SERVICE_DOX_CONTEXT_DATA_GET_ZGSXCAST_EMPLY01 WHERE UNAME=?', [colleague_uname], function (tx, colleagueDataResults) {
                                 
            if(colleagueDataResults.rows.length > 0)
                {
                      var colleaguePartnerID = colleagueDataResults.rows.item(0).PARTNER;
                      
                      tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 WHERE OBJECT_ID = ? AND ZZSERVICEITEM = ?', [clickedServiceOrderID,clickedServceOrderItemNum], function(tx,serviceOrderResults)
                        {
                            var serviceTaskProcessType = serviceOrderResults.rows.item(0).PROCESS_TYPE;
                                    
//                            restype = responseTypeDecider(WEBSERVICE_SERVICE_TASK);
                            var items = new Array();
                            var deviceid = localStorage.getItem("deviceid");
                            var altdeviceid = localStorage.getItem("altdeviceid");
                            items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
                            items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
//                            alert(resptype);
                            items.push("EVENT[.]SERVICE-DOX-TRANSFER[.]VERSION[.]0");
                            items.push("DATA-TYPE[.]ZGSXSMST_SRVCDCMNTTRNSFR20[.]OBJECT_ID[.]PROCESS_TYPE[.]NUMBER_EXT[.]SERVICE_EMPLOYEE");
                            items.push("ZGSXSMST_SRVCDCMNTTRNSFR20[.]"+clickedServiceOrderID+"[.]"+serviceTaskProcessType+"[.]"+clickedServceOrderItemNum+"[.]"+colleaguePartnerID);
                                    
                            soapRequest(transferTaskApiSoapCallBack,items);
//                            soapRequest(backButtonClicked,items);
                                    
                        }, null);
                }
        }, null);
    });
    
/*
    //    restype = responseTypeDecider(WEBSERVICE_SERVICE_TASK);
    var items = new Array();
    var deviceid = localStorage.getItem("deviceid");
    var altdeviceid = localStorage.getItem("altdeviceid");
    //	var servicelistlistflag = window.localStorage.getItem(SERVICETASKS_LIST_PREF);
    items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
    items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
    //alert(resptype);
    items.push("EVENT[.]SERVICE-DOX-TRANSFER[.]VERSION[.]0");
    items.push("DATA-TYPE[.]ZGSXSMST_SRVCDCMNTTRNSFR20[.]OBJECT_ID[.]PROCESS_TYPE[.]NUMBER_EXT[.]SERVICE_EMPLOYEE");
    items.push("ZGSXSMST_SRVCDCMNTTRNSFR20[.]"+clickedServiceOrderID+"[.]"+serviceTaskProcessType+"[.]"+clickedServceOrderItemNum+"[.]"+colleaguePartnerID);
    
    soapRequest(transferTaskApiSoapCallBack,items);
*/
}

function transferTaskApiSoapCallBack()
{
//    backButtonClicked();
    
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    var activeScreen = window.localStorage.getItem("ActiveScreen");
    
    //    myApp.closeModal();
    
    if(activeScreen == "TotalTasksDetail")
    {
        window.localStorage.setItem('ActiveScreen',"TotalTasksOverview");
        $("#openOverviewOnBackNavigaiton").attr('href', "overview.html");
        window.location='overview.html';
    }
    else if(activeScreen == "TasksForTodayDetail")
    {
        window.localStorage.setItem('ActiveScreen',"TasksForTodayOverview");
        $("#openOverviewOnBackNavigaiton").attr('href', "overview.html");
        window.location='overview.html';
    }
    else if(activeScreen == "ColleagueTaskDetail")
    {
        $("#openOverviewOnBackNavigaiton").attr('href', "colleagueTasksOverview.html");
        window.location='colleagueTasksOverview.html';
    }
}


function backButtonClicked()
{
    //    window.localStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    var navigateToOverview = window.localStorage.getItem("NavigatedFromOverview");
    if (navigateToOverview ==  "TotalTasksOverview")
    {
        window.localStorage.setItem('ActiveScreen',"TotalTasksOverview");
    }
    else if (navigateToOverview ==  "TasksForTodayOverview")
    {
        window.localStorage.setItem('ActiveScreen',"TasksForTodayOverview");
    }
}

