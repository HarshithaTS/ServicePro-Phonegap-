var start_date;
var end_date;
var interval_function;
var soapRequestItems;
var diagnosisPopup;

var isSuccessFlag = "No";
var successMsg = "";


//var webServiceURL = 'http://75.99.152.10:8050/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/110/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';

//var webServiceURL = 'http://gsswd.globalsoftsolutions.net:8051/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/111/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';

var webServiceURL = 'http://gsswd.globalsoftsolutions.net:7500/sap/bc/srt/rfc/sap/z_gssmwfm_hndl_evntrqst00/110/z_gssmwfm_hndl_evntrqst00/z_gssmwfm_hndl_evntrqst00';

var disgnostics_response_parser = "";
function soapRequest(endSaveProduct,items) {
  		// build SOAP request
    
    soapRequestItems = items;
    
//    alert("callContextApiFlag1 : " + window.sessionStorage.getItem("callContextApiFlag"));
//    alert("refreshAppFlag1 : " + window.localStorage.getItem("refreshAppFlag"));
    
    var callContextApiFlagValue = window.sessionStorage.getItem("callContextApiFlag");
    var refreshAppFlagValue = window.localStorage.getItem("refreshAppFlag");
/*
    if (!(window.sessionStorage.getItem("callContextApiFlag") == null) && (window.localStorage.getItem("refreshAppFlag") == "Yes"))
    {
        disgnostics_response_parser = "";
    }
    if(window.sessionStorage.getItem("appEnteredForeground") == "Yes")
    {
        disgnostics_response_parser = "";
    }
*/
    var substring = "SERVICE-DOX-CONTEXT-DATA-GET";
    if(!(soapRequestItems[2].indexOf(substring) !== -1))
        {
            disgnostics_response_parser = "";
        }
    
    disgnostics_response_parser = disgnostics_response_parser + "<p style='font-size:15px;color:black !important;'>EVENT:" + items[2].split("[.]")[1] + "</br>" ;
//    alert("disgnostics_response_parser1 : " + disgnostics_response_parser);
    
	disgnostics_response_parser = disgnostics_response_parser + "API-BEGIN-TIME DEVICE:" + diagnosicsDate() + "</br>";
    
//    alert("disgnostics_response_parser2 : " + disgnostics_response_parser);

	start_date = new Date(); 
	
	if(localStorage.getItem("api_timer_"+items[2].split("[.]")[1]) != "null" && localStorage.getItem("api_timer_"+items[2].split("[.]")[1]) != null && localStorage.getItem("api_timer_"+items[2].split("[.]")[1]) != "")
	{
//		showWaitMeProgress(localStorage.getItem("api_timer_"+items[2].split("[.]")[1]));
	}
	else
	{
//		showWaitMe("Contacting Server");
	}
    
	onCompleteteFunction = endSaveProduct;
    
    //$.mobile.showPageLoadingMsg("b", "Contacting Server....");
	
	//showWaitMe("Contacting Server");
	//showWaitMeProgress("");
  		var soapMessage = soapMessageBuilder(items);
  		console.log("webServiceURL ::" +webServiceURL);
  		console.log("soapMessage::" +soapMessage);
  		//alert(soapMessage);
  		
  		$.ajax({
    	url: webServiceURL,
    	type: "POST",
    	dataType: "xml",
    	timeout: 10000000,
    	data: soapMessage,
    	contentType: "text/xml; charset=\"utf-8\"",
    	complete: onComplete,
    	success:function(Result, textStatus, XMLHttpRequest) { 
    	//alert(Result);
            //navigator.notification.activityStop();
    		 //$.mobile.loading("hide");
             //$("body").removeClass('ui-disabled');
        },
    	error: function(XMLHttpRequest, textStatus, errorThrown) { 
            //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            //navigator.notification.activityStop();
//    		 $.mobile.loading("hide");
             //$("body").removeClass('ui-disabled');
        }    
  		});
}


function soapMessageBuilder(items)
{
	
	var soapMessage = '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><n0:ZGssmwfmHndlEvntrqst00 id="o0" c:root="1" xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style"><DpistInpt i:type="c:Array" c:arrayType="d:anyType[4]">'+
	message(items) + '</DpistInpt></n0:ZGssmwfmHndlEvntrqst00></v:Body></v:Envelope>';
	return soapMessage;
}

function message(items)
{
var message = "";

if(window.localStorage.getItem("diagnostics") != null && window.localStorage.getItem("diagnostics") != "" && window.localStorage.getItem("diagnostics") == "yes")
	items[0] = items[0]+":MODE:D"
        	
for(var i = 0; i < items.length; i++)
{
	message = message + '<item i:type="d:anyType"><Cdata i:type="d:string">' + 	items[i] + '</Cdata></item>';
}
return message;	
}

function onComplete(xmlHttpRequest, status)
{
//    alert("soapRequestItems : " + soapRequestItems[2]);
//    alert("index : " + soapRequestItems[2].indexOf("DIAGNOSIS-AND-CHECKS"));
    var substring = "DIAGNOSIS-AND-CHECKS";
  if(soapRequestItems[2].indexOf(substring) !== -1)
    {
        setTimeout(function(){onCompleteteFunction(xmlHttpRequest,status);}, 4000);
    }

  else
   {
       
    var i = 0;
    
//    alert("xmlHttpRequest : " + xmlHttpRequest.responseText);
    
//    $.mobile.hidePageLoadingMsg();
//    hideWaitMe();
//    showWaitMe("Compiling Data");
    //$.mobile.showPageLoadingMsg("b", "Compiling Data....");
    
//    myApp.hidePreloader();

    
    if(xmlHttpRequest.responseText == null || xmlHttpRequest.responseText == "")
    {
        alert("Connecting Server Failed... Please Check Connection...");
//        hideWaitMe();
    }
    
    
    $(xmlHttpRequest.responseXML)
    .find('DpostMssg').find('item')
    .each(function()
    {
          //alert($(this).find('Type').text() );
         
        if(($(this).find('Type').text() == "E" || $(this).find('Type').text() == "A" || $(this).find('Type').text() == "X") && i == 0)
        {
          alert($(this).find('Message').text());
          i++;
          
//          myApp.hidePreloader();
          
//          hideWaitMe();
          //return;
        }
          
          
        else if($(this).find('Type').text() == "S" && i == 0)
        {
          alert($(this).find('Message').text());
          i++;
          
//          myApp.hidePreloader();

/*
          isSuccessFlag = "Yes";
          successMsg = $(this).find('Message').text();
*/
          
        }
          
          
    });
    
    
   
   
    
    $(xmlHttpRequest.responseXML)
    .find('DpostOtpt').find('item')
    .each(function()
    {
          //alert($(this).find('Type').text() );
          
          var name = $(this).find('Cdata').text();
          
          if(window.localStorage.getItem("diagnostics") != null && window.localStorage.getItem("diagnostics") != "" && window.localStorage.getItem("diagnostics") == "yes")
          {
          	var result = name.split("[.]");
          	if(result[0] == "ZGSSMWST_DIAGNOSYSINFO01")
          	disgnostics_response_parser = disgnostics_response_parser + result[1] + "</br>"
          }
          
        
    });
    disgnostics_response_parser = disgnostics_response_parser + "API-END-TIME DEVICE:" + diagnosicsDate() + "</br>";
    if(i == 0)
    {
    	
    	disgnostics_response_parser = disgnostics_response_parser + "START DATA PARSING DEVICE:" + diagnosicsDate() + "</br>" ;
    	
        
        console.log("xmlHttpRequest.responseText : " + xmlHttpRequest.responseXML);
        
        
    	var ii = 0;
    	var webservice_name;
    	var table_name = "";


    	$(xmlHttpRequest.responseXML)
        .find('item')
        .each(function()

/*
        $(xmlHttpRequest.responseXML)
        .find('Cdata')
        .each(function()
*/
     	{
       		var name = $(this).find('Cdata').text();

              

       		if(ii == 1)
    		{
    			var result = name.split("[.]");
    			
    			webservice_name = result[1];
    			window.localStorage.setItem(webservice_name,webservice_name);
    		}
       		else if(ii>=2)
       		{
       			//alert(name);
       			var result = name.split("[.]");
       			
       			if(result[0] == "DATA-TYPE")
       			{
       				result[1] = replaceAll("-","_",webservice_name) + "_" + result[1];
       				createDynamicTable(result);
       			}
       			else
       			{
       				if(table_name != result[0])
       				{
       				 truncateDynamicTable(replaceAll("-","_",webservice_name) + "_" + result[0]);
       				}
       				table_name = result[0];
       				
       				result[0] = replaceAll("-","_",webservice_name) + "_" + result[0];
       				insertTableValues(result);
       			}
       			
       		}
       		ii++;

              

/*
        var result = name.split("[.]");
              
//        if(result[0] == "EVENT-RESPONSE")
        if(result[0].indexOf("EVENT-RESPONSE") !== -1)
        {
            webservice_name = result[1];
            window.localStorage.setItem(webservice_name,webservice_name);
        }
//        else if(result[0] == "DATA-TYPE")
        else if(result[0].indexOf("DATA-TYPE") !== -1)
        {
            result[1] = replaceAll("-","_",webservice_name) + "_" + result[1];
            createDynamicTable(result);
        }
        else if(!(result[0].indexOf("NOTATION") !== -1) && !(result[0].indexOf("EVENT-RESPONSE") !== -1) && !(result[0].indexOf("DATA-TYPE") !== -1))
        {
            if(table_name != result[0])
              {
              truncateDynamicTable(replaceAll("-","_",webservice_name) + "_" + result[0]);
              }
              table_name = result[0];
              
              result[0] = replaceAll("-","_",webservice_name) + "_" + result[0];
              insertTableValues(result);
        }
*/
              
              
              
              
       				//alert(name);
    	});

    }
       
        myApp.hidePreloader();

/*
        if(isSuccessFlag == "Yes")
            alert(successMsg);
*/        
        
    	disgnostics_response_parser = disgnostics_response_parser + "STOP DATA PARSING DEVICE:" + diagnosicsDate() + "</br></p>" ;
    	
//        alert("disgnostics_response_parser : " + disgnostics_response_parser);
    	
        
        console.log("disgnostics_response_parser : " + disgnostics_response_parser);

//        document.getElementById("diagnosisResponseParser").append(disgnostics_response_parser);
        document.getElementById("diagnosisResponseParser").innerHTML = disgnostics_response_parser;
        
/*
        diagnosisPopup = '<div class="popup diagPopup"><div class="content-block"><p><a href="#" class="close-popup">Close popup</a></p><p>'+ disgnostics_response_parser +'</p><a id="diagnosisEmail" href="#" class="external link"><img style="width:60px;height:60px;margin-top:15%;" src="img/Email.png" onclick="sendDiagnosisMail();" /></a></div></div>';
//        diagnosisPopup = '<div class="popup diagPopup"><div class="content-block"><div><a href="#" class="close-popup">Close</a></div><p>'+ disgnostics_response_parser +'</p><a id="diagnosisEmail" href="#" class="external link"><img style="width:60px;height:60px;margin-top:15%;" src="img/Email.png" onclick="sendDiagnosisMail();" /></a></div></div>';

        
        console.log("diagnosisPopup : " + diagnosisPopup);
        
//        document.getElementsByTagName('body')[0].appendChild(diagnosisPopup);
//        document.getElementsByTagName('body')[0].append(diagnosisPopup);
//        document.getElementsByTagName('body')[0].append('<div class="popup diagPopup"><div class="content-block"><p>About</p><p><a href="#" class="close-popup">Close popup</a></p><p>Lorem ipsum dolor ...</p></div></div>');
//        $('body').append('<div class="popup diagPopup"><div class="content-block"><p>About</p><p><a href="#" class="close-popup">Close popup</a></p><p>Lorem ipsum dolor ...</p></div></div>');
        
        $('body').append(diagnosisPopup);
*/
        
//        alert("callContextApiFlag2 : " + window.sessionStorage.getItem("callContextApiFlag"));
//        alert("refreshAppFlag2 : " + window.localStorage.getItem("refreshAppFlag"));
        
        
        if(window.localStorage.getItem("diagnosisButtonStatus") == "Yes")
        {
            if (!(window.sessionStorage.getItem("callContextApiFlag") == null) && (window.localStorage.getItem("refreshAppFlag") == "No"))
                myApp.popup('.diagPopup');
        }
        if(window.sessionStorage.getItem("appEnteredForeground") == "Yes")
        {
            window.sessionStorage.setItem('appEnteredForeground',"No");
        }
        
        
        
    	end_date = new Date();
    	var dif = end_date.getTime() - start_date.getTime();

    	//var seconds = dif / 1000;
    	localStorage.setItem("api_timer_"+webservice_name, dif);
    	clearInterval(interval_function);
    	
    	
//    	setTimeout(function(){onCompleteteFunction(xmlHttpRequest,status);}, 4000);
        setTimeout(function(){onCompleteteFunction(xmlHttpRequest,status);}, 2000);
        
        
//    }
        
	 
 }
  
}

function sendDiagnosisMail()
{
    var body = "API Diagnosis Report:%0D%0A%0D%0A " + disgnostics_response_parser;
    //    return body;
    //    alert("mail body : " + body);
    //    var details = "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from ShipPro User&body="+body;
    //    window.location.href = details;
    
    $("#diagnosisEmail").attr('href', "mailto:gss.mobile@globalsoft-solutions.com?subject=A Message from TCW ServicePro User&body="+body);
}

function disableDiagnosis()
{
    window.localStorage.setItem('diagnosisButtonStatus',"No");
    myApp.closeModal();
}


function showWaitMeProgress(messsage){
    $('body').waitMe({
                     effect: "win8_linear",
                     text: '<progress max="100" value="0"></progress>',
                     bg: 'rgba(255,255,255,0.7)',
                     color:'#000000',
                     sizeW:'',
                     sizeH:''
                     });
    
    //alert(messsage);
    
    var value = 0;
    interval_function = setInterval(function(){value = value + 10; $('progress').val(value); if(value == 100){clearInterval(interval_function);}}, (messsage/10));
}




function showWaitMe(messsage){
    $('body').waitMe({
                     effect: "win8_linear",
                     text: messsage+'...',
                     bg: 'rgba(255,255,255,0.7)',
                     color:'#000000',
                     sizeW:'',
                     sizeH:''
                     });
}

function hideWaitMe()
{
	$('body').waitMe('hide');
}
