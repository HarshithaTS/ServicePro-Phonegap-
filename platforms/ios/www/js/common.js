
 function getURLParameter(name) {
    		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
		}

/*
// For IN CASE SENSITIVE CONTAINS CUSTOM
$.extend($.expr[":"], {
	"containsIN": function(elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
	});
*/


function checkConnection() {
//    alert("checkConnection func");
    var networkState = navigator.connection.type;
//    alert(networkState);
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL]  = 'Cell 2G connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    
    return networkState;
    
}



function addToRecentActivity(url,title,desc)
{
	if($("#screenTitle").text() != "Recent Activities" && $("#screenTitle").text() != "Favorite Activities")
	{
		var dynamicColumnValues = [];
		dynamicColumnValues[0] = "";
		dynamicColumnValues[1] = "TABLE_RECENT_ACTIVITIES";
		dynamicColumnValues[2] = "";
		dynamicColumnValues[3] = "SCREEN_TITLE";
		dynamicColumnValues[4] = "SCREEN_URL";
		dynamicColumnValues[5] = "SCREEN_TIME";
		
		createDynamicTable(dynamicColumnValues);
		//alert(title);
		//alert(desc);
		var dynamicTableValues = [];
		dynamicTableValues[0] = "TABLE_RECENT_ACTIVITIES";
		dynamicTableValues[1] = title + ", " + desc;
		dynamicTableValues[2] = url;
		dynamicTableValues[3] = new Date();
		
		insertTableValues(dynamicTableValues);
	}
}

/*function addToRecentActivity()
{
	if($("#screenTitle").text() != "Recent Activities" && $("#screenTitle").text() != "Favorite Activities")
	{
		var dynamicColumnValues = [];
		dynamicColumnValues[0] = "";
		dynamicColumnValues[1] = "TABLE_RECENT_ACTIVITIES";
		dynamicColumnValues[2] = "";
		dynamicColumnValues[3] = "SCREEN_TITLE";
		dynamicColumnValues[4] = "SCREEN_URL";
		dynamicColumnValues[5] = "SCREEN_TIME";
		
		createDynamicTable(dynamicColumnValues);
		
		var dynamicTableValues = [];
		dynamicTableValues[0] = "TABLE_RECENT_ACTIVITIES";
		dynamicTableValues[1] = $("#screenTitle").text();
		dynamicTableValues[2] = document.URL;
		dynamicTableValues[3] = new Date();
		
		insertTableValues(dynamicTableValues);
	}
}*/


/*function addToRecentActivityContact(scrtitle,url)
{
	//alert("hi");
	if($("#screenTitle").text() != "Recent Activities" && $("#screenTitle").text() != "Favorite Activities")
	{
		var dynamicColumnValues = [];
		dynamicColumnValues[0] = "";
		dynamicColumnValues[1] = "TABLE_RECENT_ACTIVITIES";
		dynamicColumnValues[2] = "";
		dynamicColumnValues[3] = "SCREEN_TITLE";
		dynamicColumnValues[4] = "SCREEN_URL";
		dynamicColumnValues[5] = "SCREEN_TIME";
		
		createDynamicTable(dynamicColumnValues);
		
		var dynamicTableValues = [];
		dynamicTableValues[0] = "TABLE_RECENT_ACTIVITIES";
		dynamicTableValues[1] = scrtitle;
		dynamicTableValues[2] = url;
		dynamicTableValues[3] = new Date();
		
		insertTableValues(dynamicTableValues);
	}
}*/


function addToFavorites(url,title,desc)
{
	
	var dynamicColumnValues = [];
	dynamicColumnValues[0] = "";
	dynamicColumnValues[1] = "TABLE_FAVORITE_ACTIVITIES";
	dynamicColumnValues[2] = "";
	dynamicColumnValues[3] = "SCREEN_TITLE";
	dynamicColumnValues[4] = "SCREEN_URL";
	dynamicColumnValues[5] = "SCREEN_TIME";
	
	createDynamicTable(dynamicColumnValues);
	
	var dynamicTableValues = [];
	dynamicTableValues[0] = "TABLE_FAVORITE_ACTIVITIES";
	dynamicTableValues[1] = title + ", " + desc;
	dynamicTableValues[2] = url;
	dynamicTableValues[3] = new Date();
	
	insertTableValues(dynamicTableValues);
	alert("Added to Favorites");
}

function responseTypeDecider(id)
{
 if(window.localStorage.getItem(id) != null && window.localStorage.getItem(id) != "null"  && window.localStorage.getItem(id) != "")
 {
  
  return "";
 }
 else
 {
  
  return "[.]RESPONSE-TYPE[.]FULL-SETS";
 }
}

function refreshScreen(values)
{
	for(var i = 0; i < values.length; i++)
	{
		dropDynamicTable(window.localStorage.getItem(values[i]));
		window.localStorage.removeItem(values[i]);
	}
	
	app.initialize();
	
}



function disableDiagnostics()
{
	window.localStorage.setItem("diagnostics","no");
	goBack();
}

var disgnostics_response_parser = "" ;
/*
function runtimePopup(message, popupafterclose) {
  var template = "<div data-role='popup' data-overlay-theme='a' class='ui-content messagePopup' style='min-width:480px'><div data-role='header' class='ui-corner-top ui-header ui-bar-a' role='banner'><h1 class='ui-title' role='heading' aria-level='1'>Dignostics Information</h1></div>" 
      + "<div data-role='content' data-theme='d' class='ui-corner-bottom ui-content ui-body-d' role='main' id='dignosticsContent'>" 
      + message + "<div><a class='ui-btn-right' ><img src='../img/emailicon.png' onclick='sendMail();' /><img style='background:#dddddd;'src='../img/diagnose.jpeg' onclick='disableDiagnostics();' /></a></div>";
  
  popupafterclose = popupafterclose ? popupafterclose : function () {};
 
  $.mobile.activePage.append(template).trigger("create");
 
  $.mobile.activePage.find(".closePopup").bind("tap", function (e) {
    $.mobile.activePage.find(".messagePopup").popup("close");
  });
 
  $.mobile.activePage.find(".messagePopup").popup().popup("open").bind({
    popupafterclose: function () {
      $(this).unbind("popupafterclose").remove();
      popupafterclose();
    }
  });
  
  disgnostics_response_parser = "";
  
}

function sendMail()
{
var data = "%0D%0AMOBILE DIAGNOSIS AND CHECKS DETAILS%0D%0A%0D%0A";
    $("#dignosticsContent p").each(function(index, element) {   // note that the .each() handler has two parameters that can be used also
        data = data + $(this).text() + "%0D%0A";              // "this" inside the .each() handler function is the current DOM element in the iteration
    });
    alert("diagnostics data : " + data);
    
    location.href="mailto:gss.mobile@globalsoft-solutions.com?subject= GSS Mobile Diagnosis Checks&body="+deviceInformation() + data;
    
    
}
*/


function onResumeFunc()
{
    window.sessionStorage.setItem('appDidEnterForeground',"Yes");
}


function sendMailRegistration()
{
 
    var webServiceURL = window.localStorage.getItem("webServiceUrl");
    var server = webServiceURL.substring(webServiceURL.indexOf("/") + 2).substring(0, webServiceURL.substring(webServiceURL.indexOf("/") + 2).indexOf(':'));
    
    var body = "My device information:%0D%0A%0D%0ABuild Name: " + window.localStorage.getItem("buildName") + "%0D%0A%0D%0AEdition: " + device.platform + "%0D%0ADevice Type: " + device.model + "%0D%0AVersion: " + window.localStorage.getItem("versionName") + "%0D%0AGDID: " + window.localStorage.getItem("deviceid") + "%0D%0AAlt.GDID: " + window.localStorage.getItem("altdeviceid") + "%0D%0AiOS Version: " + window.localStorage.getItem("iOSVersion") + "%0D%0AServer: "+ server;
//    return body;
//    alert("mail body : " + body);
//    var details = "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from ShipPro User&body="+body;
//    window.location.href = details;
    
    $("#emailLink").attr('href', "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from TCW ServicePro User&body="+body);
//    $("#emailLink").attr('href', "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from TCW ServicePro User");

}


var fileName = "DM-QA-SalesPro-20141217.apk";
var serverName = "http://mobilesap.drivemedical.com:8000/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/001/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00_binding";


function readConfig()
{
	$.ajax({
    	url: "../app-config.xml",
    	type: "POST",
    	dataType: "xml",
    	contentType: "text/xml; charset=\"utf-8\"",
    	success:function(Result, textStatus, XMLHttpRequest) { 
            //alert(XMLHttpRequest);
        }
  		});
}



function deviceInformation()
{
	var data = "FileName :" + fileName + "%0D%0A"; 
    data = data + "Edition : "  + device.platform + "%0D%0A";  
    data = data + "Device Type : "  + device.model + "%0D%0A";   
    data = data + "Android Version : "  + device.version + "%0D%0A";
    data = data + "Cordova Version : "  + device.cordova + "%0D%0A";    
    data = data + "GDID : "  + window.localStorage.getItem("deviceid") + "%0D%0A"; 
    data = data + "SERVER : "  + serverName + "%0D%0A";  
    
    return data;
}


Date.prototype.yyyymmdd = function() {
//    alert("yyyymmdd func");
   var yyyy = this.getFullYear().toString();
//    alert("yyyy : " + yyyy);
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
//    alert("mm : " + mm);
   var dd  = this.getDate().toString();
//    alert("dd : " + dd);
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };

Date.prototype.hhmmss = function() {
   var hh = (this.getHours()).toString();
   var mm = (this.getMinutes()).toString(); 
   var ss  = (this.getSeconds()).toString(); 
   return (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]); // padding
  };


function diagnosicsDate()
{
//    alert("diagnosicsDate func");
    
	var d = new Date();
//	alert("d = " + d);
//    alert("d.yyyymmdd() = " + d.yyyymmdd());
//	alert("d.hhmmss() = " + d.hhmmss());
    
//    var yyyymmdd = d.yyyymmdd();
//    alert("yyyymmdd = " + yyyymmdd);
    
	return d.yyyymmdd()+' '+d.hhmmss();
    
}


var dateFormat;
var currentTimeZone;
function getDateFormat() {

     navigator.globalization.getDatePattern(
    	function (date) {dateFormat = (date.pattern).toLowerCase();currentTimeZone=date.timezone;},
    	function () {alert('Error getting pattern\n');},
    	{formatLength:'short', selector:'date'}
  	);
}


function replaceAll(find, replace, str) {
	
	/*alert(find);
	alert(replace);
	alert(str);*/
	
	//alert(str.replace(new RegExp(find, 'g'), replace));
	
    return str.replace(new RegExp(find, 'g'), replace);
}



function replaceDeltaSets(find, replace, str) {
	
	/*alert(find);
	alert(replace);
	alert(str);*/
	
	
	
    return str.replace(find, replace);
}



function checkOffline()
{
	if(checkConnection() == "none")
	{
//        alert("if block");
        
        offlineBorder();
        
//        alert("screentitle : " + document.getElementById("ScreenTitle").textContent);
        
        var screentitle = window.localStorage.getItem("ScreenTitle");
        document.getElementById("ScreenTitle").innerHTML = screentitle + " (Offline)";

//        document.getElementById("ScreenTitle").innerHTML = document.getElementById("ScreenTitle").textContent + " (Offline)";
//        alert("screentitle : " + document.getElementById("ScreenTitle").textContent);
        
//        document.getElementById("ScreenTitle").after( "<span id='offlinetxt'>(Offline)</span>" );
        
//        $('<span id='offlinetxt'>(Offline)</span>').appendTo('#ScreenTitle');

        
/*		if ($('#offlinetxt').length)
        {
            alert("nested if block");
			$( "#offlinetxt" ).text( "(Offline)" );
        }
		else
        {
            alert("nested else block");
//			$( "#ScreenTitle" ).after( "<span id='offlinetxt'>(Offline)</span>" );
		offlineBorder();
        }
*/
	}
	else
	{
//        alert("else block");
        
        var screentitle = window.localStorage.getItem("ScreenTitle");
        document.getElementById("ScreenTitle").innerHTML = screentitle;
        
//		$( "#offlinetxt" ).text( "" );
//		$( "[data-role=header]" ).removeClass('offline-border-header');
//		$( "[data-role=footer]" ).removeClass('offline-border-footer');
//		$( "[data-role=page]" ).removeClass('offline-border-page');
        
//        $( "#body" ).removeClass('offline-border-page');
        
        document.getElementById("body").style.border = null;

	}
}

function offlineBorder()
{
//	$( "[data-role=header]" ).addClass('offline-border-header');
//	$( "[data-role=footer]" ).addClass('offline-border-footer');
//	$( "[data-role=page]" ).addClass('offline-border-page');
    
//    alert("offlineBorder func");
    
//    $( "#body" ).addClass('offline-border-page');
    
//    document.getElementById("body").style.box-sizing = "border-box";
    document.getElementById("body").style.border = "10px solid #FF0000";
    document.getElementById("body").style.height = "100%";


}


function fail() {
    console.log("failed to get filesystem");
}

//**********************//local directory in sdcard//************//
function gotLocalFS(fileSystem) {
    window.FS = fileSystem;
    
    if(localpathGallery != null)
    openGallery(localpathGallery);

    var printLocalDirPath = function(entry){
        console.log("Dir path - " + entry.fullPath);
    }

    createLocalDirectory(window.localStorage.getItem("SVLocalAttchmntpath"), printLocalDirPath);
}

function createLocalDirectory(path, success){
    var dirs = path.split("/").reverse();
    var root = window.FS.root;

    var createDir = function(dir){
        console.log("create dir " + dir);
        root.getDirectory(dir, {
            create : true,
            exclusive : false
        }, successCB, failCB);
    };

    var successCB = function(entry){
        console.log("dir created " + entry.fullPath);
        root = entry;
        if(dirs.length > 0){
            createDir(dirs.pop());
        }else{
            console.log("all dir created");
            success(entry);
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, createLocalFS, fail);           
        }
    };

    var failCB = function(){
        console.log("failed to create dir " + dir);
    };

    createDir(dirs.pop());
}

//creating file
function createLocalFS(fileSystem) {
    fileSystem.root.getFile(window.localStorage.getItem("SVLocalAttchmntpath") +"/readme.txt", {create: true, exclusive: false}, gotLocalFileEntry, fail);
}

function gotLocalFileEntry(fileEntry) {
    fileEntry.createWriter(gotLocalFileWriter, fail);
}

function gotFile(file){
    readDataUrl(file);  
}//

function readDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
    console.log("Read as data URL");
    console.log(evt.target.result);
    document.getElementById("smallImage").style.display='block'; 
    document.getElementById("smallImage").src = evt.target.result;   
 }; 
 reader.readAsDataURL(file);
}//
function gotLocalFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);  
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

function fail(error) {
    console.log(error.code);
}
//***************************************************//


function gotFS(fileSystem) {
    window.FS = fileSystem;
    
    if(pathGallery != null)
    openGallery(pathGallery);

    var printDirPath = function(entry){
        console.log("Dir path - " + entry.fullPath);
    }

    createDirectory(window.localStorage.getItem("SVgallerypath"), printDirPath);
}

function createDirectory(path, success){
    var dirs = path.split("/").reverse();
    var root = window.FS.root;

    var createDir = function(dir){
        console.log("create dir " + dir);
        root.getDirectory(dir, {
            create : true,
            exclusive : false
        }, successCB, failCB);
    };

    var successCB = function(entry){
        console.log("dir created " + entry.fullPath);
        root = entry;
        if(dirs.length > 0){
            createDir(dirs.pop());
        }else{
            console.log("all dir created");
            success(entry);
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, createFS, fail);           
        }
    };

    var failCB = function(){
        console.log("failed to create dir " + dir);
    };

    createDir(dirs.pop());
}

//creating file
function createFS(fileSystem) {
    fileSystem.root.getFile(window.localStorage.getItem("SVgallerypath") +"/readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFile(file){
    readDataUrl(file);  
}//

function readDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
    console.log("Read as data URL");
    console.log(evt.target.result);
    document.getElementById("smallImage").style.display='block'; 
    document.getElementById("smallImage").src = evt.target.result;   
 }; 
 reader.readAsDataURL(file);
}//
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);  
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

function fail(error) {
    console.log(error.code);
}
//


var loadfunction = null;
var pathGallery = null;
var localpathGallery = null;
var backFunction = null;
var servbackflag =false;

function goBack()
{
	if(backFunction != null)
	    backFunction();

	//alert(parent.location);
	
	var s = String(parent.location);
	
	if(s.indexOf("ui-state=dialog") > -1)
		window.history.go(-2);
	else
		window.history.back();
}//
var colors = ['#E1F1FF'];

/*
$(document).delegate(".ui-page", "pagebeforeshow", function () {
    $(this).css('background', colors[0]);
});
*/

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
	    // function, we must explicity call 'app.receivedEvent(...);'
	    onDeviceReady: function() {
//	        app.receivedEvent('deviceready');

//            if(window.localStorage.getItem("deviceid") == "" || window.localStorage.getItem("deviceid") == "null" || window.localStorage.getItem("deviceid") == null)
            {
//                alert("common.js deviceready start");
                
                window.plugins.deviceID.getDeviceId(function(message){
//                                                    alert("message : " + message);
//                                                    var deviceIdDetails = message;
                    var deviceIdDetails = JSON.parse(message);
//                                                    alert("message : " + message);
                    var device_id = deviceIdDetails.deviceid;
                    var alt_device_id = deviceIdDetails.altdeviceid;
                    var versionNum = deviceIdDetails.versionname;
                    var webServiceURL = deviceIdDetails.webServiceUrl;
                    var iOS_Version = deviceIdDetails.iOSversion;
                    var build_Name = deviceIdDetails.buildname;

/*                                                    alert("webserviceURL : " + webServiceURL);
                                                    
                                                    var str = webServiceURL.substring(webServiceURL.indexOf("/") + 2);
                                                    alert("str1 : " + str);
                                                    str = str.substring(0, str.indexOf(':'));
                                                    alert("str2 : " + str);
                                                    
                                                    str = webServiceURL.substring(webServiceURL.indexOf("/") + 2).substring(0, webServiceURL.substring(webServiceURL.indexOf("/") + 2).indexOf(':'));
                                                    alert("str3 : " + str);
*/

//                                                    alert("device_id1 : " + device_id);
                    window.localStorage.setItem("deviceid",device_id);
                    window.localStorage.setItem("altdeviceid",alt_device_id);
                    window.localStorage.setItem("imeino",device_id);
                    window.localStorage.setItem("versionName",versionNum);
                    window.localStorage.setItem("webServiceUrl",webServiceURL);
                    window.localStorage.setItem("iOSVersion",iOS_Version);
                    window.localStorage.setItem("buildName",build_Name);
                                                    
                    app.receivedEvent('deviceready');
                                        
                },
                function(message){/*alert("message : " + message);*/}
                );
//                alert("common.js device ready end");
            }

/*            else
            {
                app.receivedEvent('deviceready');
            }
*/            
	    },
	    // Update DOM on a Received Event
	    receivedEvent: function(id) {
            
//                alert("common.js received event start");
            
/*
                window.plugins.deviceID.getDeviceId(function(message){
//                                                    alert("message : " + message);
//                                                    var deviceIdDetails = message;
                                                    var deviceIdDetails = JSON.parse(message);
//                                                    alert("message : " + message);
                                                    var device_id = deviceIdDetails.deviceid;
                                                    var alt_device_id = deviceIdDetails.altdeviceid;
                                                    var versionNum = deviceIdDetails.versionname;
                                                    alert("device_id2 : " + device_id);
//                                                    alert("alt_device_id : " + alt_device_id);
                                                    window.localStorage.setItem("deviceid",device_id);
                                                    window.localStorage.setItem("altdeviceid",alt_device_id);
                                                    window.localStorage.setItem("imeino",device_id);
                                                    window.localStorage.setItem("versionName",versionNum);
                                                    
                                                    
                                                    },
                                                    function(message){alert("message : " + message);}
                );
*/

            
//            alert("common.js received event mid");
            
            
	    	checkOffline();
            
	    	getDateFormat();
            
            
//	    	createDatabase();
	    	//readConfig();

/*	    	 window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotLocalFS, fail);
	    	
	    	pictureSource = navigator.camera.PictureSourceType;
        	destinationType = navigator.camera.DestinationType;
	    	
	    	console.log("init calling");
*/
	    	if(loadfunction != null)
            {
//                alert("common.js if(loadfunction)");
	    		loadfunction();
            }
/*
	    	document.addEventListener("backbutton", goBack, true);
	    	//document.addEventListener("backbutton", onBackKeyDown, false);
	    	//setTimeout(function(){addToRecentActivity();},3000);
	    	
	    	var onSettings = function() {console.log("settings");location.href='../home/settings.html';};
 
    		var onHelp = function() {console.log("help");};
    		
    		var onRefresh = function() {console.log("onRefresh");$('a[data-icon="refresh"]')[0].onclick();};
*/
    		/*var optionsmenu = new OptionsMenu({
        		id: "optionsmenu",
        		items: [ 
            		[{
                		label: "Refresh",
                		image: "../img/refresh.png",
                		action: onRefresh
            		},
            		{
                		label: "Settings",
                		image: "../img/settings.png",
                		action: onSettings
            		}]
        		]
    		});*/
	    	
	    	/*$(function(){
  				// Bind the swipeleftHandler callback function to the swipe event on div.box
  				$( "body" ).on( "swipeleft", swipeleftHandler );
  				$( "body" ).on( "swiperight", swiperightHandler );
 
  				// Callback function references the event target and adds the 'swipeleft' class to it
  				function swipeleftHandler( event ){swipeLeft();}
  				function swiperightHandler( event ){swipeRight();}
			});*/	    	
//	    	getAllTimeZone();
	        //console.log('Received Event: ' + id);
	    }
	};

//CONVERT OT PDF RELATED METHODS
function convertpdf(){
	 html2canvas(document.body, {
        useCORS: true,
        allowTaint:true,
        onrendered: function(canvas) {
           
          var img = canvas.toDataURL();
          alert(img);
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
			    fs.root.getFile(window.localStorage.getItem("SVgallerypath")+"/"+"gsimage"+".png", {create:true}, function(fileEntry) {
			        fileEntry.createWriter(function(fileWriter) {
			        	//fileWriter.write(newdata);
			        	fileWriter.write(dataURLtoBlob(img));
			        	
			        }, errorHandler);
			    }, errorHandler);
			}, errorHandler);
/*window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
       fs.root.getFile(window.localStorage.getItem("SVgallerypath")+"/"+"gsimage"+".png", {create:true}, function(fileEntry) {
           fileEntry.createWriter(function(fileWriter) {
               fileWriter.write(dataURLtoBlob(img));              
              // location.href = img;
           }, errorHandler);
       }, errorHandler);
   }, errorHandler);*/
 }
});
	 
}//convertpdf

function errorHandler(){
	alert("error");
}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}//dataURLtoBlob


function convertDbDateToCustomDateFormat(fieldValue)
{
    if(fieldValue=="")
        return fieldValue;
    var date = fieldValue.split("-");//2013-11-06
    //alert(dateFormat);
    
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//    var formattedDate = months[parseInt(date[1])] + " " + date[2] + ", " + date[0];
    var formattedDate = months[parseInt(date[1])-1] + " " + date[2] + ", " + date[0];
    return formattedDate;
}

function convertPickedDateToCustomDateFormat(fieldValue,displayTimeFlag)
{
    if(fieldValue=="")
        return fieldValue;
    
    var date = fieldValue.split(" ");
    //alert(dateFormat);
    
    var formattedDate = date[1] + " " + date[2] + ", " + date[3];
    if(displayTimeFlag == "YES")
        formattedDate = formattedDate + " " + date[4];
    return formattedDate;
}