
var myApp = new Framework7();
var diagnosisResponse;

 function showAlert() {
		        navigator.notification.alert(
		            'Do you want to !',  // message
		            alertDismissed,         // callback
		            'Please provide Additional data',            // title
		            'Done'                  // buttonName
		        );
		    }
 
 function alertDismissed() {
	 //window.location.href = '../contacts/index.html';
	var success = function(message) {}//alert("Success: " + JSON.stringify(message));getContactsById(message);
		var error = function(message) {};		
		window.plugins.contactsLauncher.addContactsPage(success,error);
 }//
 
function quickTest()
{

if(checkConnection() != "none")
{
    
    myApp.showPreloader('Fetching Diagnosis data');
//    alert("quick test func");
    
    var items = new Array();
    var deviceid = localStorage.getItem("deviceid");
    var altdeviceid = localStorage.getItem("altdeviceid");
    items.push("DEVICE-ID:"+deviceid+":DEVICE-TYPE:IOS:APPLICATION-ID:SERVICEPRO:DEVICE-ALTID:"+altdeviceid);
    items.push("NOTATION:ZML:VERSION:0:DELIMITER:[.]");
    items.push("EVENT[.]DIAGNOSIS-AND-CHECKS[.]VERSION[.]0");
    soapRequest(quickTestSuccess,items);
    
}
}

function quickTestSuccess(xmlHttpRequest, status)
{
    myApp.hidePreloader();
    
//console.log(xmlHttpRequest.responseText);
//	alert("quickTest xmlHttprequest : " + xmlHttpRequest.responseXML);
	var i = 0;
	var response = "";
	$(xmlHttpRequest.responseXML)
    .find('item')
    .each(function()
 	{
   		var name = $(this).find('Cdata').text();
   		
   		if(i>=2)
   		{
   			//alert(name);
   			var result = name.split("[.]");
   			response = response + "<p>" + result[1] + "</br></p>" ;
   			
   		}
   		i++;
	});
    
//    alert("quickCheck response : " + response);
    
//	hideWaitMe();
//	runtimePopup(response, null);
    
    diagnosisResponse = response;
    
    document.getElementById("quickCheckApiResult").innerHTML = "";
    document.getElementById("quickCheckApiResult").innerHTML = response;

    
//    myApp = new Framework7();
    myApp.popup('.diagnosis-popup');
	
}

function sendQuickCheckDiagnosisMail()
{
    var body = "API Diagnosis Report:%0D%0A%0D%0A " + diagnosisResponse;
    //    return body;
    //    alert("mail body : " + body);
    //    var details = "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from ShipPro User&body="+body;
    //    window.location.href = details;
    
    $("#quickCheckDiagnosisEmail").attr('href', "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from TCW ServicePro User&body="+body);
}


function settingsPopupOpen()
{
//    var storedData = myApp.formGetData('my-form');
//    
//    myApp.formFromData('#my-form', storedData);
    
    myApp.popup('.settings-popup');
}

/*
function toggleSwitchClicked()
{
    var result = document.getElementsByClassName("switchInput")[0].checked ? 'yes' : 'no'
    if (result == "yes")
        alert("swich is on");
    else
        alert("switch is off");
}
*/

function backButtonClicked()
{
    //    window.localStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
}

function infoPageLoad()
{
    
}
