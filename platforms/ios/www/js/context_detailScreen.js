var tname = TABLE_SERVICE_CONTEXT_EMPLOYEE_DETAILS;
var viewHtmlTag = "";
var subViewHtmlTag = "";
var labelResults;
var tableNameList;

function queryContextForDetailScreen()
{
/*
    db.transaction(function (tx)
        {
            tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table"', [], function(tx,tableNameResults)
//            tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table" and tbl_name like "%ZGSXSMST_SRVCDCMNT10%"', [], function(tx,tableNameResults)
                {
                    console.log("No. of tables : " + tableNameResults.rows.length);
                    tableNameList = tableNameResults;
                                 
                },null);
        });
*/
	if(tname != "")
	{
		var query = 'SELECT * FROM ' + tname + ' WHERE CNTXT2 = "SV-TASK-EDIT-W" ORDER BY SEQNR ASC';
        
//		selectTableValues(query, formScreenSkeleton);
        
//        db.transaction(function (tx) { tx.executeSql(query, [], function (tx, results) { formScreenSkeleton(results,"SO_DetailHtmlBody"); }, null); });
        
        db.transaction(function (tx)
            {
                tx.executeSql(query, [], function (tx, results)
                    {

                        $('#SO_DetailHtmlBody').html("");
                              
                        (function() {
                         
//                         mySearchbar.destroy();
                         
                         var myApp = new Framework7();
                         var $$ = Dom7;
                         myApp.closeModal();
                         
                         
                            formScreenSkeleton(results,"SO_DetailHtmlBody");
                         
                         })();
                              
//                        modifyDetailScreenUI();

                    }, null);
            });
        
/*
        db.transaction(function (tx)
            {
                tx.executeSql(query, [], function (tx, results)
                    {
                                     
                        modifyDetailScreenUI();
                                     
                    }, null);
            });
*/
        
	}		
}

function formScreenSkeleton(results,parentTag)
{
    var len = results.rows.length;
    console.log("Initial viewHtmlTag = " + viewHtmlTag);
    
    for(var i = 0; i < len; i++)
    {
      (function() {
        console.log("parentTag = " + parentTag + " context2 = " + results.rows.item(i).CNTXT2 + " context4 = " + results.rows.item(i).CNTXT4 + " name = " + results.rows.item(i).NAME);

        if (results.rows.item(i).CNTXT4 == "SCRN-TITLE")
        {
            document.getElementById("ScreenTitle").innerHTML = results.rows.item(i).VALUE;
        }
        else if (results.rows.item(i).CNTXT4 == "SUBVIEW")
        {
            var query = 'SELECT * FROM ' + tname + ' WHERE CNTXT2 = "' + results.rows.item(i).NAME + '" ORDER BY SEQNR ASC';
       
//            query = 'SELECT * FROM ' + tname + ' WHERE CNTXT2 = "SV-TASK-EDIT-W-RIGHT-BLOCK-MAIN" ORDER BY SEQNR ASC';
            
            console.log("subview query : " + query);
            
/*            viewHtmlTag = viewHtmlTag + "<div id='" + results.rows.item(i).NAME + "'>" + subViewHtmlTag + "</div>";
            
            selectTableValues(query, createSubViews);
*/
            
//            viewHtmlTag = viewHtmlTag + "<div id='" + results.rows.item(i).NAME + "'>" + selectTableValues(query, createSubViews) + "</div>";
            
//            viewHtmlTag = viewHtmlTag + "<div id='" + results.rows.item(i).NAME + "'>" + formScreenSkeleton(query, createSubViews) + "</div>";
            
//            viewHtmlTag = viewHtmlTag + "<div id='" + results.rows.item(i).NAME + "'>" + selectTableValues(query, formScreenSkeleton) + "</div>";
            
//            viewHtmlTag = viewHtmlTag + "<div id='" + results.rows.item(i).NAME + "'>" + db.transaction(function (tx) { tx.executeSql(query, [], function (tx, results1) { formScreenSkeleton(results1); }, null); }) + "</div>";
       
//            viewHtmlTag = "<div id='" + results.rows.item(i).NAME + "' style='border: 1px solid #ddd;height:150px;width:800px;'>"+i+","+len+"</div>";
       
       
//   ***  Working code  ***
//            viewHtmlTag = "<div id='" + results.rows.item(i).NAME + "' style='border: 1px solid #ddd;height:400px;width:800px;'>"+i+","+len+"</div>";
//            viewHtmlTag = "<div id='" + results.rows.item(i).NAME + "SUBVIEW' style='border: 1px solid #ddd;height:400px;width:800px;'></div>";
       viewHtmlTag = "<div id='" + results.rows.item(i).NAME + "SUBVIEW' style='border: 1px solid #ddd;'></div>";

       
       

//            $('#'+parentTag).append(viewHtmlTag);
  
       
//            if (parentTag != "SO_DetailHtmlBody" && !$.trim( $('#'+parentTag+'SUBVIEW').html()))
            if (parentTag != "SO_DetailHtmlBody")
            {
                $('#'+parentTag+'SUBVIEW').append(viewHtmlTag)
            }
            else
            {
                $('#'+parentTag).append(viewHtmlTag);
            }
       
       
       
            createSubViews(query,results,i);
       
/*
            db.transaction(function (tx)
                {
                    tx.executeSql (query, [], function (tx, results1)
                        {
                            if(results1.rows.length > 0)
                                {
//                                   formScreenSkeleton(results1,results.rows.item(i).NAME);
                                   formScreenSkeleton(results1,results.rows.item(i-1).NAME);
                                }
                        }, null);
                });
*/
       

    
       
//            $('#'+results.rows.item(i).NAME).append(db.transaction(function (tx) { tx.executeSql(query, [], function (tx, results1) { formScreenSkeleton(results1,results.rows.item(i).NAME); }, null); }));


        }

        else if (results.rows.item(i).CNTXT4 == "FIELD-ATTR")
        {
       
       
          if (!$.trim( $('#'+parentTag+'SUBVIEW').html()))
//          if ($('#'+parentTag+'SUBVIEW').is(':empty'))
//         if(document.getElementById(parentTag+'SUBVIEW').innerHTML == "" || null)
          {
                if (results.rows.item(i).CNTXT3.indexOf("LISTVW") !== -1)
                    $('#'+parentTag+'SUBVIEW').append('<div class="list-block"><ul id="'+parentTag+'"></ul></div>');
          }
       
//          else
          {
            labelCheckQuery = 'SELECT * FROM ' + tname + ' WHERE CNTXT2 = "' + results.rows.item(i).CNTXT2 + '" AND NAME = "' + results.rows.item(i).NAME + '" AND CNTXT4 = "FIELD-LABE"';

            (function() {
                var labelId = results.rows.item(i).NAME + "Label";
                checkLabelsForAttribute(labelCheckQuery,labelId);
             })();

       
            if (results.rows.item(i).TYPE == "ACFI" || results.rows.item(i).TYPE == "ICAC")
            {
                console.log ("Value field : " + results.rows.item(i).VALUE);
                console.log ("Type of icon : " + results.rows.item(i).TYPE);
       
/*
                viewHtmlTag = "<span id='" + results.rows.item(i).VALUE + "'>"+i+","+len+","+results.rows.item(i).VALUE+"</span>";
                $('#'+parentTag).append(viewHtmlTag);
*/
       
                var imageName;
       
/*
                if (results.rows.item(i).TYPE == "ACFI")
                    {
//To fetch icon name from VALUE field; Eg: To fetch "PREVIOUS_TASK" from "ACTION_FIELD_ICON:ICON_PREVIOUS_TASK"
                        imageName = results.rows.item(i).VALUE.substr(23);
                    }
                else if (results.rows.item(i).TYPE == "ICAC")
                    {
//To fetch icon name from VALUE field; Eg: To fetch "PHONE" from "ACTION-ICON:ICON_PHONE"
                        imageName = results.rows.item(i).VALUE.substr(17);
                    }
*/
       
       
       imageName = results.rows.item(i).VALUE.split(":")[1];
       imageName = imageName.substring(imageName.indexOf('_')+1);
       
       

//                viewHtmlTag = '<span style="float:left;"><a id="' + results.rows.item(i).NAME + 'Attr" href="#" class="item-link item-content external link"><img style="width:35px;height:35px;" src="img/' + imageName + '.png" /><div id="' + results.rows.item(i).NAME + 'Label"></div></a></span>';
                viewHtmlTag = '<div style="float:left;" id="' + results.rows.item(i).NAME + '"><a id="' + results.rows.item(i).NAME + 'Attr" href="#" class="item-link item-content external link"><img style="width:35px;height:35px;" src="img/' + imageName + '.png" /><div id="' + results.rows.item(i).NAME + 'Label"></div></a></div>';


                $('#'+parentTag).append(viewHtmlTag);
       
            }
//            else if (results.rows.item(i).TYPE == "" || results.rows.item(i).TYPE == "DSAC" || results.rows.item(i).TYPE == "ACFL" || results.rows.item(i).TYPE == "DSLK")
            else if (results.rows.item(i).TYPE == "" || results.rows.item(i).TYPE == "DSAC" || results.rows.item(i).TYPE == "ACFL"  )
            {
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
                console.log ("tableName : " + tableName + " fieldName : " + fieldName);
       
//                viewHtmlTag = '<span id="' +  results.rows.item(i).NAME + 'Attr"></span>';
       
//   ***  Working code  ***
//                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"></span></div>';
       
                viewHtmlTag = '<li><div class="item-content"><div class="item-inner" id="' + results.rows.item(i).NAME + '"><div class="item-title label" id="' +  results.rows.item(i).NAME + 'Label"></div><div class="item-input" id="' +  results.rows.item(i).NAME + 'Attr"></div></div></div></li>';
       
       
                $('#'+parentTag).append(viewHtmlTag);
       
                console.log(results.rows.item(i).TYPE + ' html tag : ' + viewHtmlTag);
       
//                var clickedServiceOrder = window.localStorage.getItem('clickedServiceOrder');
//                fetchAttrValueQuery = 'SELECT ' + fieldName + ' FROM ' + tableName + ' WHERE OBJECT_ID ="' + clickedServiceOrder + '"';
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                var attrType = results.rows.item(i).TYPE;
                var datatype = results.rows.item(i).DATATYPE;
       
                fetchTableName("",fieldName,tableName,parentAttrID,parentDivID,attrType,datatype);
            }
            else if (results.rows.item(i).TYPE == "DSLK")
            {
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
                console.log ("tableName : " + tableName + " fieldName : " + fieldName);
       
//                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"><input type="text" value="" style="text-align:center;" readonly id="' +  results.rows.item(i).NAME + 'AttrPicker-device"></span></div>';
       
//   ***  Working code  ***
//                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"></span></div>';
       
                viewHtmlTag = '<li><div class="item-content"><div class="item-inner" id="' + results.rows.item(i).NAME + '"><div class="item-title label" id="' +  results.rows.item(i).NAME + 'Label"></div><div class="item-input" id="' +  results.rows.item(i).NAME + 'Attr"></div></div></div></li>';
       
       
                $('#'+parentTag).append(viewHtmlTag);
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                var attrType = results.rows.item(i).TYPE;
                var datatype = results.rows.item(i).DATATYPE;
       
                fetchTableName("",fieldName,tableName,parentAttrID,parentDivID,attrType,datatype);
       
       
//                var myApp = new Framework7();
//                var $$ = Dom7;
       
//                var pickerValueArray = [];
                var pickerTableName = results.rows.item(i).VALUE.substring(0,results.rows.item(i).VALUE.indexOf('-'));
                var pickerFieldName = results.rows.item(i).VALUE.substring(results.rows.item(i).VALUE.indexOf('-')+1);
//                var pickerID = results.rows.item(i).NAME + 'AttrPicker-device';
                var pickerID = results.rows.item(i).NAME + 'Attr';

                console.log ("LookupTableName : " + pickerTableName + " LookupFieldName : " + pickerFieldName);
       
                fetchPickerValues(pickerFieldName,pickerTableName,pickerID);

/*
//                function fetchPickerValues()
                {
                    db.transaction(function (tx)
                    {
                      pickerValueFetchQuery = 'SELECT ' + pickerFieldName + ' from ' + pickerTableName;
                      
                      tx.executeSql(pickerValueFetchQuery, [], function(tx,pickerValueResults)
                        {
                            if(pickerValueResults.rows.length > 0)
                            {
                                for (var i=0 ; i<pickerValueResults.rows.length ; i++)
                                {
                                    pickerValueArray.push(pickerValueResults.rows.item(i)[VALUE]);
                                    console.log("picker value : " + pickerValueResults.rows.item(i)[VALUE]);
                                }
                                    
                                var pickerDevice = myApp.picker({
                                    input: $('#'+pickerID),
                                    cols: [
                                        {
                                            textAlign: 'center',
                                            values: pickerValueArray
                                        }
                                    ]
                                });
                                    
                            }
                        },null);
                    });
//                    return pickerValueArray;
                }
*/
       
/*
                var pickerDevice = myApp.picker({
                    input: $('#'+pickerID),
                    cols: [
                        {
                            textAlign: 'center',
                            values: fetchPickerValues()
                        }
                    ]
                });
*/
       
            }
            else if (results.rows.item(i).TYPE == "EDTB")
            {
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
       
//                viewHtmlTag = '<div class="item-input"><textarea>Editable text</textarea></div>';
//                viewHtmlTag = '<div class="item-input"><span id="' +  results.rows.item(i).NAME + 'Label"></span><textarea id="' +  results.rows.item(i).NAME + 'Attr"></textarea></div>';
       
       
//   ***  Working code  ***
//       viewHtmlTag = '<div class="item-input"><span class="item-title label" id="' +  results.rows.item(i).NAME + 'Label"></span><textarea id="' +  results.rows.item(i).NAME + 'Attr"></textarea></div>';
       
                viewHtmlTag = '<li class="align-top"><div class="item-content"><div class="item-inner"><div class="item-title label" id="' +  results.rows.item(i).NAME + 'Label"></div><div class="item-input"><textarea id="' +  results.rows.item(i).NAME + 'Attr"></textarea></div></div></div></li>';
       
       
//       <div class="item-title label">Textarea</div>
       
       
                $('#'+parentTag).append(viewHtmlTag);
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                var attrType = results.rows.item(i).TYPE;
                var datatype = results.rows.item(i).DATATYPE;
       
                console.log("editable div attrID : " + parentAttrID);
       
                fetchTableName("",fieldName,tableName,parentAttrID,parentDivID,attrType,datatype);
            }
            else if (results.rows.item(i).TYPE == "DSCR")
            {
/*
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
                console.log ("tableName : " + tableName + " fieldName : " + fieldName);
       
                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"></span></div>';
                $('#'+parentTag).append(viewHtmlTag);
       
                console.log(results.rows.item(i).TYPE + ' html tag : ' + viewHtmlTag);
    
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                var attrType = results.rows.item(i).TYPE;
                var datatype = results.rows.item(i).DATATYPE;
       
                fetchTableName(fieldName,tableName,parentAttrID,parentDivID,attrType,datatype);
*/
       
//   ***  Working code  ***
//                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"></span></div>';
       
                viewHtmlTag = '<li><div class="item-content"><div class="item-inner" id="' + results.rows.item(i).NAME + '"><div class="item-title label" id="' +  results.rows.item(i).NAME + 'Label"></div><div class="item-input" id="' +  results.rows.item(i).NAME + 'Attr"></div></div></div></li>';
       
                $('#'+parentTag).append(viewHtmlTag);
       
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                var attrType = results.rows.item(i).TYPE;
                var datatype = results.rows.item(i).DATATYPE;
       
       
                var attrValueString = results.rows.item(i).VALUE;
       
                while(attrValueString.length > 0)
                {
                    descriptionSubString = attrValueString.substring(0,attrValueString.indexOf('#'));
                    tableNameStartIndex = attrValueString.indexOf('#')+1;
       
                    attrValueString = attrValueString.substring(tableNameStartIndex);
       
                    tableAndFieldNameString = attrValueString.substring(0,attrValueString.indexOf('#'));
       
                    tableName = tableAndFieldNameString.substring(0,tableAndFieldNameString.indexOf('-'));
                    fieldName = tableAndFieldNameString.substring(tableAndFieldNameString.indexOf('-')+1);
       
                    attrValueString = attrValueString.substring(attrValueString.indexOf('#')+1);
       
                    fetchTableName(descriptionSubString,fieldName,tableName,parentAttrID,parentDivID,attrType,datatype);

                }
       
       
            }
       
       
            if(results.rows.item(i).DATATYPE.length > 0)
            {
                if (results.rows.item(i).DATATYPE == "ZPHN")
                {
//   ***  Working code  ***
//                    $("#"+results.rows.item(i).NAME).append('<img style="width:30px;height:30px;" src="img/PHONE.png" />');
                    $("#"+results.rows.item(i).NAME).append('<div class="item-after"><img style="width:30px;height:30px;" src="img/PHONE.png" /></div>');       
                }
                else if (results.rows.item(i).DATATYPE == "ZGRF")
                {
       
//   ***  Working code  ***
//                    $("#"+results.rows.item(i).NAME).append('<div style="height:190px;width:320px;border: 1px solid #ddd;"><div class="row" id="SOsignature" style="height:130px;"></div><div class="row" id="signHereLabel" style="height:10px;margin-top:-10px;">Sign here</div><div class="row" style="border: 1px solid #ddd;margin-top:-8px;"></div><div class="row no-gutter" style="height:40px;margin-top:-15px;"><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="ClearSignature" style="width:30px;height:30px;" src="img/ClearSignature.png" /></div><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="SaveSignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div><div class="col-20" style="height:35px;"><img id="DisplySignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div></div></div>');
       
//                    $("#"+results.rows.item(i).NAME+"Attr").append('<div style="height:190px;width:320px;border: 1px solid #ddd;"><div class="row" id="SOsignature" style="height:130px;"></div><div class="row" id="signHereLabel" style="height:10px;margin-top:-10px;">Sign here</div><div class="row" style="border: 1px solid #ddd;margin-top:-8px;"></div><div class="row no-gutter" style="height:40px;margin-top:-15px;"><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="ClearSignature" style="width:30px;height:30px;" src="img/ClearSignature.png" /></div><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="SaveSignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div><div class="col-20" style="height:35px;"><img id="DisplySignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div></div></div>');
       
                    document.getElementById(results.rows.item(i).NAME+"Attr").innerHTML = '<div style="height:190px;width:320px;border: 1px solid #ddd;"><div class="row" id="SOsignature" style="height:130px;"></div><div class="row" id="signHereLabel" style="height:10px;margin-top:-10px;">Sign here</div><div class="row" style="border: 1px solid #ddd;margin-top:-8px;"></div><div class="row no-gutter" style="height:40px;margin-top:-15px;"><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="ClearSignature" style="width:30px;height:30px;" src="img/ClearSignature.png" /></div><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="SaveSignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div><div class="col-20" style="height:35px;"><img id="DisplySignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div></div></div>';

       
                    $("#SOsignature").jSignature({height:130,width:320,'decor-color':'transparent'});
       
       
//  ***  On change to the Signature capture canvas (on drawing a stroke) ,this event triggers and removes "SignHere" label  ***
                    $("#SOsignature").bind('change', function(e){
//                        $("#signHereLabel").hide();
                        document.getElementById("signHereLabel").innerHTML = "";
                    });
       
                    $( "#ClearSignature" ).click(function() {
//                        $("#SOsignature").jSignature("clear");
                        $("#SOsignature").jSignature("reset");
                    });
       
                    var signatureData;
                    $( "#SaveSignature" ).click(function() {
//                        signatureData = $("#SOsignature").jSignature("getData", "base30");
                        signatureData = $("#SOsignature").jSignature("getData");    //  Captures data in Base64 format
                                   
                        console.log("Signature data(base30) : " + $("#SOsignature").jSignature("getData","base30"));
                        console.log("Signature data(base64) : " + signatureData);
                                   
                    });
       
                    $( "#DisplySignature" ).click(function() {
//                        $("#SOsignature").jSignature("setData", "data:" + signatureData); // Reproduce Base30's signature dataURL
//                        $("#SOsignature").jSignature("importData", "data:" + signatureData);
                        document.getElementById("SOsignature").innerHTML = '<img src="' + signatureData + '"/>';
                    });
       
                }
       
/*
                else if (results.rows.item(i).DATATYPE == "DATS")
                {
                    console.log("DATS elementID : " + results.rows.item(i).NAME + 'Attr');
       
       
                    document.getElementById(results.rows.item(i).NAME + 'Attr').innerHTML = "Calendar picker";

//                    document.getElementById(results.rows.item(i).NAME + 'Attr').appendChild('<input type="text" placeholder="Select date" readonly id="calendar-date-format">');
       
       
                    var myApp = new Framework7();
                    var $$ = Dom7;
       
                    var calendarDateFormat = myApp.calendar({
                                               input: '#calendar-date-format',
                                               dateFormat: 'DD, MM dd, yyyy'
                                               });
                }
*/
       
            }
       
        }
       }
       
       else if (results.rows.item(i).CNTXT4 == "FIELD-LABE")
       {
       
       parentID = parentTag+'SUBVIEW';
//       alert(parentTag+"SUBVIEW html : " + document.getElementById(parentID).html());
//       alert(parentTag+"SUBVIEW html : " + document.getElementById(parentID).innerHTML);
       
         if (!$.trim( $('#'+parentTag+'SUBVIEW').html()))
//         if ($('#'+parentTag+'SUBVIEW').is(':empty'))
//         if(document.getElementById(parentID).innerHTML == "" || null)
         {
            if (results.rows.item(i).CNTXT3.indexOf("LISTVW") !== -1)
                $('#'+parentTag+'SUBVIEW').append('<div class="list-block"><ul id="'+parentTag+'"></ul></div>');
         }
       
//         else
         {
       
       
//       Query to select labels without a corresponding attribute field
//       SELECT * FROM  SERVICE_DOX_CONTEXT_DATA_GET_ZGSSMWST_UICNFG01 WHERE CNTXT4='FIELD-LABE' AND NAME NOT IN (SELECT NAME FROM SERVICE_DOX_CONTEXT_DATA_GET_ZGSSMWST_UICNFG01 WHERE CNTXT4='FIELD-ATTR')

       
/*
            (function() {
                var labelId = results.rows.item(i).NAME + "Label";
//                if ($('#'+results.rows.item(i).NAME).length == 0)
                if (document.getElementById(labelId) == null)
                    {
                        console.log("div id '" + results.rows.item(i).NAME + "' doesn't exist");
//                        $('#'+labelId).append(results.rows.item(i).VALUE);
                        viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label1">' + results.rows.item(i).VALUE + '</span></div>';
                        $('#'+parentTag).append(viewHtmlTag);
                    }
                else
                    {
                        console.log("div id '" + results.rows.item(i).NAME + "' exists");
                    }
            })();
*/
       
            attrCheckQuery = 'SELECT * FROM ' + tname + ' WHERE CNTXT2 = "' + results.rows.item(i).CNTXT2 + '" AND NAME = "' + results.rows.item(i).NAME + '" AND CNTXT4 = "FIELD-ATTR"';
       
       
            (function() {
                var labelId = results.rows.item(i).NAME + "Label";
                var parentDivID = results.rows.item(i).NAME;
                var labelValue = results.rows.item(i).VALUE;
                checkAttrForLabel(attrCheckQuery,labelId,parentTag,parentDivID,labelValue);
             })();
       
         }
       
       }
     
       
       
  })();
    }
    console.log("Final viewHtmlTag : " + viewHtmlTag);
    console.log("SO_DetailHtmlBody tag : " + $('#SO_DetailHtmlBody').html());

/*
    db.transaction(function (tx)
    {
        tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table"', [], function(tx,tableNameResults)
        {
            console.log("No. of tables : " + tableNameResults.rows.length);
                
        },null);
    });
    console.log("active screen : " + window.localStorage.getItem('ActiveScreen'));
*/ 

}


function checkAttrForLabel(query,labelId,parentTag,parentDivID,labelValue)
{
    delete attrResults;
    
    db.transaction(function (tx)
        {
            (function() {
                tx.executeSql (query, [], function (tx, attrResults)
                    {
                               
                        console.log("attrResults length for labelID : " + labelId + " is : " + attrResults.rows.length);
                        if(!(attrResults.rows.length > 0))
                            {
//                                document.getElementById(labelId).innerHTML = attrResults.rows.item(0).VALUE;
                               
//   ***  Working code  ***
//                                viewHtmlTag = '<div id="' + parentDivID + '"><span id="' +  labelId + '1">' + labelValue + '</span></div>';
                               
                                viewHtmlTag = '<li><div class="item-content"><div class="item-inner" id="' + parentDivID + '"><div class="item-title label" id="' +  labelId + '">' + labelValue + '</div></div></div></li>';
                               
                               
                                console.log("viewHtmlTag for label : " + viewHtmlTag);
                                $('#'+parentTag).append(viewHtmlTag);
                            }
                               
                        modifyDetailScreenUI(labelId,'',parentDivID);
                               
                    }, null);
            })();
        });
}
                   

function createSubViews(query,results,i)
{
    (function() {
        db.transaction(function (tx)
            {
                tx.executeSql (query, [], function (tx, results1)
                    {
                               
                        if(results1.rows.length > 0)
                            {
                               formScreenSkeleton(results1,results.rows.item(i).NAME);
//                               formScreenSkeleton(results1,results.rows.item(i-1).NAME);
                            }
                    }, null);
            });
     })();
}

function fetchTableName(descriptionSubString,fieldName,tableName,parentAttrID,parentDivID,attrType,datatype)
{
    db.transaction(function (tx)
        {
            tableNameQuery = 'SELECT tbl_name from sqlite_master WHERE type = "table" and tbl_name like "%' + tableName + '%"';
                   
            tx.executeSql(tableNameQuery, [], function(tx,tableNameResults)
                {
                    console.log("No. of tables : " + tableNameResults.rows.length);
                    if(tableNameResults.rows.length > 1)
                        {
                          var ActiveScreen = window.localStorage.getItem('ActiveScreen');
                        
                          for(var i=0 ; i<tableNameResults.rows.length ; i++)
                            {
//                          console.log("colleague screen string index : " + ActiveScreen.indexOf("Colleague"));
                                if((ActiveScreen.indexOf("Colleague") !== -1) && (tableNameResults.rows.item(i).tbl_name.indexOf("COLLEAGUE") !== -1))
//                                if(~ActiveScreen.indexOf("Colleague"))
                                    {
//                                        console.log("colleague table");
                                        fetchAttrValue(descriptionSubString,fieldName,tableNameResults.rows.item(i).tbl_name,parentAttrID,parentDivID,attrType,datatype);
                                        break;
                                    }
                                else if((ActiveScreen.indexOf("Colleague") === -1) && (tableNameResults.rows.item(i).tbl_name.indexOf("COLLEAGUE") === -1))
                                    {
//                                        console.log("not colleague table");
                                        fetchAttrValue(descriptionSubString,fieldName,tableNameResults.rows.item(i).tbl_name,parentAttrID,parentDivID,attrType,datatype);
                                        break;
                                    }
                            }
                          
                        }
                    else
                        {
                          tableName = tableNameResults.rows.item(0).tbl_name;
                          fetchAttrValue(descriptionSubString,fieldName,tableNameResults.rows.item(0).tbl_name,parentAttrID,parentDivID,attrType,datatype);
                        }
                },null);
        });
}

function fetchAttrValue(descriptionSubString,fieldName,tableName,parentAttrID,parentDivID,attrType,datatype)
{
    db.transaction(function (tx)
        {
//            attrValueQuery = 'SELECT ' + fieldName + ' from ' + tableName + ' WHERE OBJECT_ID="' + window.localStorage.getItem('clickedServiceOrder') + '"';
 
//   ***  Working code  ***
//            attrValueQuery = 'SELECT * from ' + tableName + ' WHERE OBJECT_ID="' + window.localStorage.getItem('clickedServiceOrder') + '"';
             
            var clickedServiceOrderValue = window.localStorage.getItem('clickedServiceOrder');
            var clickedServiceOrderID = clickedServiceOrderValue.substring(0,clickedServiceOrderValue.indexOf('/'));
            var clickedServceOrderItemNum = clickedServiceOrderValue.substring(clickedServiceOrderValue.indexOf('/')+1);
            attrValueQuery = 'SELECT * from ' + tableName + ' WHERE OBJECT_ID="' + clickedServiceOrderID + '" and ZZSERVICEITEM="' + clickedServceOrderItemNum + '"';
                   
                   
            tx.executeSql(attrValueQuery, [], function(tx,attrValueResults)
                {
                          
                    if(attrValueResults.rows.length > 0)
                        {
                          var attrRow = attrValueResults.rows.item(0);
//                          console.log("attrValue = " + attrRow[fieldName]);
                          
                          
                          if(attrRow[fieldName].length > 0)
                          {
                          
                            if(attrType == "DSCR")
                            {
                                console.log("DSCR attr tag : " + document.getElementById(parentAttrID).innerHTML);
                                console.log("DSCR attr tag length : " + document.getElementById(parentAttrID).innerHTML.length);
                          
                                if(datatype == "DATS" ||  (datatype == "ZDTM" && (fieldName.indexOf("DATE") !== -1)))
                                {
                                    if(document.getElementById(parentAttrID).innerHTML.length > 0)
                                        document.getElementById(parentAttrID).innerHTML = document.getElementById(parentAttrID).innerHTML + descriptionSubString + convertDbDateToCustomDateFormat(attrRow[fieldName]);
                                    else
                                        document.getElementById(parentAttrID).innerHTML = descriptionSubString + convertDbDateToCustomDateFormat(attrRow[fieldName]);
                                }
                                else
                                {
                                    if(document.getElementById(parentAttrID).innerHTML.length > 0)
                                        document.getElementById(parentAttrID).innerHTML = document.getElementById(parentAttrID).innerHTML + descriptionSubString + attrRow[fieldName];
                                    else
                                        document.getElementById(parentAttrID).innerHTML = descriptionSubString + attrRow[fieldName];
                                }
                            }
                          
/*
                            if(datatype == "DATS" ||  datatype == "ZDTM")
                            {

                                document.getElementById(parentAttrID).innerHTML = convertDbDateToCustomDateFormat(attrRow[fieldName]);
                          
                                $('#' + parentAttrID).click(function() {
                                    console.log("Calendar func");
                                    
                                    if(datatype == "DATS")
                                    {
                                        var options = {
                                            date: new Date(),
                                            mode: 'date'
                                        };
                                        datePicker.show(options, function(date){
                                            document.getElementById(parentAttrID).innerHTML = convertPickedDateToCustomDateFormat(String(date),"NO");
                                        });
                                    }
                                    else if(datatype == "ZDTM")
                                    {
                                        var options = {
                                            date: new Date(),
                                            mode: 'datetime'
                                        };
                                        datePicker.show(options, function(date){
                                            document.getElementById(parentAttrID).innerHTML = convertPickedDateToCustomDateFormat(String(date),"YES");
                                        });
                                    }
                                });
                            }
*/
                          
                            else
                            {
                        
                                if(datatype == "DATS" ||  (datatype == "ZDTM" && (fieldName.indexOf("DATE") !== -1)))
                                {
                                    if(document.getElementById(parentAttrID).innerHTML.length > 0)
                                        document.getElementById(parentAttrID).innerHTML = convertDbDateToCustomDateFormat(attrRow[fieldName]);
                                    else
                                        document.getElementById(parentAttrID).innerHTML = convertDbDateToCustomDateFormat(attrRow[fieldName]);
                                }
                          
                                else
                                    document.getElementById(parentAttrID).innerHTML = attrRow[fieldName];
                          
/*
                                if(attrType == "DSLK")
                                {
                                    document.getElementById(parentAttrID+"Picker-device").value = attrRow[fieldName];
                                }
                                else
                                {
                                    document.getElementById(parentAttrID).innerHTML = attrRow[fieldName];
                                }
*/
                          
                          
                            }
                          
                          
                            if(datatype == "DATS" ||  datatype == "ZDTM")
                            {
                                $('#' + parentAttrID).click(function() {
                                    if(datatype == "DATS")
                                    {
                                        var options = {
                                            date: new Date(),
                                            mode: 'date'
                                        };
                                        datePicker.show(options, function(date){
                                            if(date != null)
                                                document.getElementById(parentAttrID).innerHTML = convertPickedDateToCustomDateFormat(String(date),"NO");
                                        });
                                    }
                                    else if(datatype == "ZDTM")
                                    {
                                        var options = {
                                            date: new Date(),
                                            mode: 'datetime'
                                        };
                                        datePicker.show(options, function(date){
                                            if(date != null)
                                                document.getElementById(parentAttrID).innerHTML = convertPickedDateToCustomDateFormat(String(date),"YES");
                                        });
                                    }
                                });
                            }
                          
                          
                          }
//    ***   Commented for testing purpose, uncomment during deployment  ***
/*                          else
                            document.getElementById(parentDivID).hidden = "hidden";
*/

                        }
                          
                          
                    modifyDetailScreenUI('',parentAttrID,parentDivID);
                          
                },null);
        });
}

function checkLabelsForAttribute(query,labelId)
{
    delete labelResults;

    db.transaction(function (tx)
        {
            (function() {
                tx.executeSql (query, [], function (tx, labelResults)
                    {
                               
                        if(labelResults.rows.length > 0)
                            {
//                                return labelResults;
                               document.getElementById(labelId).innerHTML = labelResults.rows.item(0).VALUE;
                            }
                               
                        modifyDetailScreenUI(labelId,'','');
                               
                    }, null);
            })();
     });
}

function fetchPickerValues(pickerFieldName,pickerTableName,pickerID)
{
    db.transaction(function (tx)
        {
            (function() {
           
                tableNameFetchQuery = 'SELECT tbl_name from sqlite_master WHERE type = "table" and tbl_name like "%' + pickerTableName + '%"';
             
           
                tx.executeSql(tableNameFetchQuery, [], function(tx,tableNameFetchResults)
                {
                    console.log("No. of tables : " + tableNameFetchResults.rows.length);
                    if(tableNameFetchResults.rows.length > 0)
                    {
                        for(var i=0 ; i<tableNameFetchResults.rows.length ; i++)
                        {
                            pickerValueFetchQuery = 'SELECT ' + pickerFieldName + ' from ' + tableNameFetchResults.rows.item(i).tbl_name;

                            var pickerValueArray = [];
           
                            var myApp = new Framework7();
                            var $$ = Dom7;
           
                            tx.executeSql(pickerValueFetchQuery, [], function(tx,pickerValueResults)
                            {
                                console.log("picker query success");
                                if(pickerValueResults.rows.length > 0)
                                {
                                    for (var i=0 ; i<pickerValueResults.rows.length ; i++)
                                    {
                                        pickerValueArray.push(pickerValueResults.rows.item(i)[pickerFieldName]);
                                        console.log("picker value : " + pickerValueResults.rows.item(i)[pickerFieldName]);
//                                        pickerValueArray.push(pickerValueResults.rows.item(i)['VALUE']);
//                                        console.log("picker value : " + pickerValueResults.rows.item(i)['VALUE']);
                                    }
                                 
                                    var pickerDevice = myApp.picker({
                                    input: $('#'+pickerID),
                                    cols: [
                                        {
                                           textAlign: 'center',
                                           values: pickerValueArray,
                                           width: 500
                                        }
                                    ]
                                    });
                                 
                                }
//                            },null);
                            },console.log("picker query error"));
                        }
                    }
                },console.log("table name fetch query error"));
            })();
        });
}