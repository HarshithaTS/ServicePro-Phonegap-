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
                        formScreenSkeleton(results,"SO_DetailHtmlBody");

                    }, null);
            });
        
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
            viewHtmlTag = "<div id='" + results.rows.item(i).NAME + "' style='border: 1px solid #ddd;height:400px;width:800px;'>"+i+","+len+"</div>";

            $('#'+parentTag).append(viewHtmlTag);
  
       
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
                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"></span></div>';
                $('#'+parentTag).append(viewHtmlTag);
       
//                var clickedServiceOrder = window.localStorage.getItem('clickedServiceOrder');
//                fetchAttrValueQuery = 'SELECT ' + fieldName + ' FROM ' + tableName + ' WHERE OBJECT_ID ="' + clickedServiceOrder + '"';
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                fetchTableName(fieldName,tableName,parentAttrID,parentDivID);
            }
            else if (results.rows.item(i).TYPE == "DSLK")
            {
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
                console.log ("tableName : " + tableName + " fieldName : " + fieldName);
       
                viewHtmlTag = '<div id="' + results.rows.item(i).NAME + '"><span id="' +  results.rows.item(i).NAME + 'Label"></span><span id="' +  results.rows.item(i).NAME + 'Attr"><input type="text" placeholder="Other" readonly id="picker-device"></span></div>';    // *** implement fetching placeholder and id dynamically ***
       
                $('#'+parentTag).append(viewHtmlTag);
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
                fetchTableName(fieldName,tableName,parentAttrID,parentDivID);
            }
            else if (results.rows.item(i).TYPE == "EDTB")
            {
                tableName = results.rows.item(i).NAME.substring(0,results.rows.item(i).NAME.indexOf('-'));
                fieldName = results.rows.item(i).NAME.substring(results.rows.item(i).NAME.indexOf('-')+1);
       
//                viewHtmlTag = '<div class="item-input"><textarea>Editable text</textarea></div>';
                viewHtmlTag = '<div class="item-input"><textarea id="' +  results.rows.item(i).NAME + 'Attr"></textarea></div>';
                $('#'+parentTag).append(viewHtmlTag);
       
                var parentAttrID = results.rows.item(i).NAME + 'Attr';
                var parentDivID = results.rows.item(i).NAME;
       
                console.log("editable div attrID : " + parentAttrID);
       
                fetchTableName(fieldName,tableName,parentAttrID,parentDivID);
            }
       
       
            if(results.rows.item(i).DATATYPE.length > 0)
            {
                if (results.rows.item(i).DATATYPE == "ZPHN")
                {
                    $("#"+results.rows.item(i).NAME).append('<img style="width:30px;height:30px;" src="img/PHONE.png" />');
                }
                else if (results.rows.item(i).DATATYPE == "ZGRF")
                {
       
                    $("#"+results.rows.item(i).NAME).append('<div style="height:190px;width:320px;border: 1px solid #ddd;"><div class="row" id="SOsignature" style="height:130px;"></div><div class="row" id="signHereLabel" style="height:10px;margin-top:-10px;">Sign here</div><div class="row" style="border: 1px solid #ddd;margin-top:-8px;"></div><div class="row no-gutter" style="height:40px;margin-top:-15px;"><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="ClearSignature" style="width:30px;height:30px;" src="img/ClearSignature.png" /></div><div class="col-20" style="height:35px;"></div><div class="col-20" style="height:35px;"><img id="SaveSignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div><div class="col-20" style="height:35px;"><img id="DisplySignature" style="width:30px;height:30px;" src="img/Done_Signature.png" /></div></div></div>');

       
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
            }
       
        }
       
       
       else if (results.rows.item(i).CNTXT4 == "FIELD-LABE")
       {
       
            (function() {
                var labelId = results.rows.item(i).NAME + "Label";
             if ($('#'+results.rows.item(i).NAME).length == 0)
                {
                    console.log("div id '" + results.rows.item(i).NAME + "' doesn't exist");
                }
             else
                {
                    $('#'+labelId).append(results.rows.item(i).VALUE);
                }
             
             })();
       }
       
       
  })();
    }
    console.log("Final viewHtmlTag : " + viewHtmlTag);

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

function fetchTableName(fieldName,tableName,parentAttrID,parentDivID)
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
                                        fetchAttrValue(fieldName,tableNameResults.rows.item(i).tbl_name,parentAttrID,parentDivID);
                                        break;
                                    }
                                else if((ActiveScreen.indexOf("Colleague") === -1) && (tableNameResults.rows.item(i).tbl_name.indexOf("COLLEAGUE") === -1))
                                    {
//                                        console.log("not colleague table");
                                        fetchAttrValue(fieldName,tableNameResults.rows.item(i).tbl_name,parentAttrID,parentDivID);
                                        break;
                                    }
                            }
                          
                        }
                    else
                        {
                          tableName = tableNameResults.rows.item(0).tbl_name;
                          fetchAttrValue(fieldName,tableNameResults.rows.item(0).tbl_name,parentAttrID,parentDivID);
                        }
                },null);
        });
}

function fetchAttrValue(fieldName,tableName,parentAttrID,parentDivID)
{
    db.transaction(function (tx)
        {
//            attrValueQuery = 'SELECT ' + fieldName + ' from ' + tableName + ' WHERE OBJECT_ID="' + window.localStorage.getItem('clickedServiceOrder') + '"';
            attrValueQuery = 'SELECT * from ' + tableName + ' WHERE OBJECT_ID="' + window.localStorage.getItem('clickedServiceOrder') + '"';
                   
            tx.executeSql(attrValueQuery, [], function(tx,attrValueResults)
                {
                    if(attrValueResults.rows.length > 0)
                        {
                          var attrRow = attrValueResults.rows.item(0);
//                          console.log("attrValue = " + attrRow[fieldName]);
                          
                          
                          if(attrRow[fieldName].length > 0)
                            document.getElementById(parentAttrID).innerHTML = attrRow[fieldName];
                          else
                            document.getElementById(parentDivID).hidden = "hidden";

                        }
                },null);
        });
}

function checkLabelsForAttribute(query,labelId)
{
    delete labelResults;
/*
    (function() {
        db.transaction(function (tx)
            {
                tx.executeSql (query, [], function (tx, labelResults)
                    {
                        if(labelResults.rows.length > 0)
                            {
                               return labelResults;
                            }
                    }, null);
            });
     })();
*/
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
                    }, null);
            })();
     });
}