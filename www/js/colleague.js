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

var db;
var colleagueList;
var query;
var colleague_uname;
var colleagueTaskResults;

db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);

//var NavigationOrBackButtonClickedFlag = window.localStorage.getItem("NavigationOrBackButtonClicked");
var NavigationOrBackButtonClickedFlag = window.sessionStorage.getItem("NavigationOrBackButtonClicked");
//            alert("NavigationOrBackButtonClickedFlag2 : " + NavigationOrBackButtonClickedFlag);


function getColleagueList()
{
//    db = window.openDatabase("ServiceProDB", "1.0", "serviceProDB", 200000);
    
    db.transaction(function (tx) {
        
        tx.executeSql('SELECT * FROM SERVICE_DOX_CONTEXT_DATA_GET_ZGSXCAST_EMPLY01', [], function (tx, results) {
                      
                      var len = results.rows.length;
                      colleagueList = results;
//                      alert("len = " + len);
                      createColleagueListView();
        }, null);
    });
}

function createColleagueListView()
{
    $('#colleagueListView').text('');

    query = "<ul>";
    for(var i = 0; i < colleagueList.rows.length; i++)
    {
//        query = query + '<li class="item-content"><div class="item-inner"><div class="item-title">' + colleagueList.rows.item(i).MC_NAME1 +'</div></div></li>';
        query = query + '<li class="item-link item-content" id="' + colleagueList.rows.item(i).UNAME + '"><div class="item-inner"><div class="colleagueItem-title">';
        if(colleagueList.rows.item(i).MC_NAME1.length > 0)
            query = query + colleagueList.rows.item(i).MC_NAME1;
        if(colleagueList.rows.item(i).MC_NAME2.length > 0)
            query = query + " " + colleagueList.rows.item(i).MC_NAME2;
        query = query +'</div></div></li>';
    }
    query = query + "</ul>";
    console.log("colleagueListQuery : " + query);
    $('#colleagueListView').append(query);
    
    
    $('li').click(function() {
                                  //alert($(this).attr('id'));
                                colleague_uname = $(this).attr('id');
//                                   alert(id);
                  console.log("clicked uname : " + colleague_uname);
//                                  window.location.href = 'details.html?shipid='+id;
                  
                  db.transaction(function (tx) {
                                 
                                 tx.executeSql('DELETE FROM SERVICE_DOX_FOR_COLLEAGUE_GET_ZGSXSMST_SRVCDCMNT10', [], null, null);
                                 });
                  
                  colleagueServiceTasksApiCall();
                                  });
    
}


function colleagueServiceTasksApiCall()
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
    soapRequest(soapCallBack,items);
}

function soapCallBack()
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

