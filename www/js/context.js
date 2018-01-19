var ctxttablenameStr;
var resptype;
var svfieldAttr;
var svfieldLabel;
var rowcount;
var deltatype;
var parseCount;
var contextApiCB;

function contextServiceOrderList(reloadUI){
    
    contextApiCB = reloadUI;

//	if(checkConnection() != "none" && window.localStorage.getItem("SVLastScreenId") != "SERVICETASKDETAIL")
    if(checkConnection() != "none")
	{
//        alert("contextServiceOrderList func");
        
        myApp.showPreloader('Fetching Context Data');

		 resptype = responseTypeDecider(WEBSERVICE_CONTEXT);
		// alert(resptype);
		var items = new Array();
        var deviceid = localStorage.getItem("deviceid");
        var altdeviceid = localStorage.getItem("altdeviceid");
		//var servicecontextflag = window.localStorage.getItem(SERVICETASKS_CNTXT_LIST_PREF);
        items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
		items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
		//alert(resptype);
        if(window.localStorage.getItem("refreshAppFlag") == "Yes")
            {
                items.push("EVENT[.]SERVICE-DOX-CONTEXT-DATA-GET[.]VERSION[.]0[.]RESPONSE-TYPE[.]REFRESHED");
                window.localStorage.setItem('refreshAppFlag',"No");
            }
        else
            {
                items.push("EVENT[.]SERVICE-DOX-CONTEXT-DATA-GET[.]VERSION[.]0"+resptype);
            }
//		soapRequest(getContextServiceorderList,items);
        soapRequest(getContextDashboardList,items);
	}
	else
	{
		checkContextDashboardDatabase();
	}
}

function getContextDashboardList(xmlHttpRequest, status)
{
    console.log("Soap Response ::" + xmlHttpRequest.responseText);
    
/*
    if(window.localStorage.getItem("refreshAppFlag") == "Yes")
    {
        window.localStorage.setItem('refreshAppFlag',"No");
    }
*/
    
    contextApiCB();
    
//    checkContextDashboardDatabase();
}

function checkContextDashboardDatabase()
{
}


function getContextServiceorderList(xmlHttpRequest, status)
{
	console.log("Soap Response ::" + xmlHttpRequest.responseText);
	//$.mobile.showPageLoadingMsg("b", "Compiling Data....");
/*
	if(window.localStorage.getItem("multithread")!="CALLSERVER"){
		if(resptype=="REFRESHED")
			showWaitMe("Compiling Full Sets of Data Please wait..");
		else
			showWaitMe("Compiling Data Please wait..");
		
	}
*/
	checkContextServiceTaskdatabase();
	/*else if(window.localStorage.getItem("multithread")=="CALLSERVER"){
		//getServiceTaskList();
	}
*/

}//getContextServiceorderList  	

function checkContextServiceTaskdatabase()
{  	
	showqueryContextServiceTaskSuccess();
}//checkContextServiceTaskdatabase

function showqueryContextServiceTaskSuccess() 
{  
	var tname = TABLE_SERVICE_CONTEXT_EMPLOYEE_DETAILS;
	console.log(tname);
	if(tname != "")
	{
		var query = 'SELECT * FROM ' + tname ;
		console.log(query);
		//alert('tname ' + tname);
		selectTableValues(query,checkValues);		
		query = 'SELECT * FROM ' + tname +' WHERE CNTXT4 = "SCRN-TITLE" AND CNTXT2 = "SV-OVERVIEW-W"';
		selectTableValues(query, getScreenNameServicetask);		
		query = 'SELECT * FROM ' + tname +' WHERE CNTXT4 = "FIELD-HINT" AND CNTXT2 = "SV-OVERVIEW-W-TOP-PART" AND NAME = "SEARCHBAR"';
//        query = 'SELECT * FROM ' + tname +' WHERE CNTXT4 = "FIELD-ATTR" AND CNTXT2 = "SV-OVERVIEW-W-TOP-PART" AND NAME = "SEARCHBAR"';
        console.log("query : " + query);
		selectTableValues(query, getFieldHintServiceDocSearch);
		
		var query = 'SELECT * FROM ' + tname + ' WHERE CNTXT4 = "FIELD-ATTR" AND CNTXT2 = "SV-OVERVIEW-W-MAIN-PART" ORDER BY SEQNR ASC';
		var query1 = 'SELECT * FROM ' + tname + ' WHERE CNTXT4 = "FIELD-LABE" AND CNTXT2 = "SV-OVERVIEW-W-MAIN-PART"';
		console.log("showcontextquerySuccess ::" + query);
		selectTableValues(query, getFieldAttr);
		selectTableValues(query1, getFieldLabel);
		
	}		
//	hideWaitMe();
	
	//getServiceTaskList();
}//showqueryContextServiceTaskSuccess

function checkValues(results)
{
	var len = results.rows.length;
	//alert('len ' + len);
	console.log("Context Length ::" + len);
}

function getScreenNameServicetask(results)
{
	var len = results.rows.length;	
	for(var i = 0; i < len; i++)
	{
		var fieldLabelRow = results.rows.item(i);
//		$("#svscreenTitle").text(fieldLabelRow.VALUE);
        
        
        var activeScreen = window.localStorage.getItem("ActiveScreen");
        
        if(activeScreen == "TotalTasksOverview")
        {
//            document.getElementById("ScreenTitle").innerHTML = "My Tasks";
            document.getElementById("ScreenTitle").innerHTML = fieldLabelRow.VALUE;
//            window.localStorage.setItem('ScreenTitle',"My Tasks");
        }
        
        else if(activeScreen == "TasksForTodayOverview")
        {
            document.getElementById("ScreenTitle").innerHTML = "My Tasks For The Day";
            window.localStorage.setItem('ScreenTitle',"My Tasks For The Day");
        }
        
        
	}
}//getScreenNameServicetask

function getFieldHintServiceDocSearch(results)
{
	var len = results.rows.length;	
	for(var i = 0; i < len; i++)
	{
		var fieldLabelRow = results.rows.item(i);
		$("#txtTasksSearch").attr("placeholder", fieldLabelRow.VALUE);
	}
}//getFieldHintServiceDocSearch


function getFieldAttr(results)
{
	var len = results.rows.length;
	for (var i=0; i<len; i++)
	{		
		var rows = results.rows.item(i);
		console.log("ATTR RESULT:"  + rows.NAME);		   
	}
	svfieldAttr = results;
    
}//getFieldAttr

function getFieldLabel(results)
{
	var len = results.rows.length;
	//alert(len);
	for (var i=0; i<len; i++)
	{		
		var rows = results.rows.item(i);
		console.log("LABEL RESULT:"  + rows.NAME);		   
	}
	svfieldLabel = results;
    
/*
	if(window.localStorage.getItem("multithread")=="CALLSERVER" || window.localStorage.getItem("SVLastScreenId")!="SERVICETASKDETAIL"){
		getServiceTaskList();		
	}else if(window.localStorage.getItem("SVLastScreenId")=="SERVICETASKDETAIL"){
		checkServiceTaskListdatabase();
	}
*/
	
}//getFieldLabel