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


var db;
//var callContextApi = true;

var NavigationOrBackButtonClickedFlag = window.sessionStorage.getItem("NavigationOrBackButtonClicked");


var clickedServiceOrderValue;
var clickedServiceOrderID;
var clickedServceOrderItemNum;

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var myApp = new Framework7();
var $$ = Dom7;

function SO_Details()
{
    queryContextForDetailScreen();
}


function backButtonClicked()
{
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    var activeScreen = window.localStorage.getItem("ActiveScreen");
    
//    myApp.closeModal();
    
    if(activeScreen == "TotalTasksDetail")
    {
        window.localStorage.setItem('ActiveScreen',"TotalTasksOverview");
        $("#openOverviewOnBackNavigaiton").attr('href', "overview.html");
    }
    else if(activeScreen == "TasksForTodayDetail")
    {
        window.localStorage.setItem('ActiveScreen',"TasksForTodayOverview");
        $("#openOverviewOnBackNavigaiton").attr('href', "overview.html");
    }
    else if(activeScreen == "ColleagueTaskDetail")
    {
        $("#openOverviewOnBackNavigaiton").attr('href', "colleagueTasksOverview.html");
    }
}


function modifyDetailScreenUI(labelId,parentAttrID,parentDivID)
{
    
    clickedServiceOrderValue = window.localStorage.getItem('clickedServiceOrder');
    clickedServiceOrderID = clickedServiceOrderValue.substring(0,clickedServiceOrderValue.indexOf('/'));
    clickedServceOrderItemNum = clickedServiceOrderValue.substring(clickedServiceOrderValue.indexOf('/')+1);

//    if(document.getElementById("ATTACHMENTS") != null)
    if(parentDivID == "ATTACHMENTS")
    {
        console.log("Before adding wrapper");

//        $('#ATTACHMENTS').wrapInner($('<div class="accordion-item"></div>'));
//        $('#ATTACHMENTS').wrapInner($('<a href="#" class="item-content item-link" />'));
//        $('#ATTACHMENTS').wrapInner($('<a href="#" class="item-content item-link"></a>'));


        $('#ATTACHMENTS').wrap($('<div class="accordion-item"></div>'));
        $('#ATTACHMENTS').wrap($('<a href="#" class="item-content item-link"></a>'));
        
//        $('#ATTACHMENTS').append('<div class="accordion-item-content"><div class="content-block"><p>Item 1 content. Lorem ipsum dolor sit amet...</p></div></div>');
        $('#ATTACHMENTS').append('<div class="accordion-item-content"><div class="content-block"><div class="list-block media-list"><ul id="AttachmentsListID"></div></div>');

        
//        var fetchAttachmentsQuery = 'SELECT * from SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXCAST_ATTCHMNT01 where OBJECT_ID="' + clickedServiceOrderID + '" and NUMBER_EXT="' + clickedServceOrderItemNum + '"';
        
        var fetchAttachmentsQuery = 'SELECT * from SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXCAST_ATTCHMNT01 where OBJECT_ID="' + clickedServiceOrderID + '" and (NUMBER_EXT="' + clickedServceOrderItemNum + '" or NUMBER_EXT="")';
        
        createAttchmentList(fetchAttachmentsQuery,"AttachmentsListID");
        
        console.log("After adding wrapper");
        
        console.log("SO_DetailHtmlBody tag after adding attachments : " + $('#SO_DetailHtmlBody').html());

    }
    else if(parentDivID == "ADDITIONAL-PARTNERS")
    {
        console.log("Before adding wrapper");
        
        //        $('#ATTACHMENTS').wrapInner($('<div class="accordion-item"></div>'));
        //        $('#ATTACHMENTS').wrapInner($('<a href="#" class="item-content item-link" />'));
        //        $('#ATTACHMENTS').wrapInner($('<a href="#" class="item-content item-link"></a>'));
        
        
        $('#ADDITIONAL-PARTNERS').wrap($('<div class="accordion-item"></div>'));
        $('#ADDITIONAL-PARTNERS').wrap($('<a href="#" class="item-content item-link"></a>'));
        
        $('#ADDITIONAL-PARTNERS').append('<div class="accordion-item-content"><div class="content-block"><div class="list-block media-list"><ul id="AdditionalPartnersListID"></div></div>');
        
        
        var fetchAdditionalPartnersQuery = 'SELECT * from SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXCAST_DCMNTPRTNR10EC where OBJECT_ID="' + clickedServiceOrderID + '" and (NUMBER_EXT="' + clickedServceOrderItemNum + '" or NUMBER_EXT="")';
        
        createAdditionalPartnersList(fetchAdditionalPartnersQuery,"AdditionalPartnersListID");
        
        console.log("After adding wrapper");
        
        console.log("SO_DetailHtmlBody tag after adding additioanl partners : " + $('#SO_DetailHtmlBody').html());
        
    }

    else if(parentDivID == "MAP")
    {
        $("#MAP").click(function() {
                        
//            var detailSceenMapPopup = '<div class="popup detailScreenMapPopup"><div class="content-block"><div id="detailSceen_mapCanvas" style="border: 1px solid #ddd;"></div></div></div>';
                        
//            var myApp = new Framework7();
//            var $$ = Dom7;
                        
            myApp.popup('.detailScreenMapPopup');
//            myApp.popup('.detailScreenMapPopup',YES,YES);
                        
                    
                        
            db.transaction(function (tx)
            {
                (function() {
                    tx.executeSql('SELECT * FROM SERVICE_DOX_FOR_EMPLY_BP_GET_ZGSXSMST_SRVCDCMNT10 WHERE OBJECT_ID = ? AND ZZSERVICEITEM = ?', [clickedServiceOrderID,clickedServceOrderItemNum], function(tx,serviceOrderResults)
                        {
                            console.log("detailScreenMap query success");
                            setTimeout(function(){loadMap(serviceOrderResults,"detailSceen_mapCanvas")}, 3000);
                        },console.log("detailScreenMap query error"));
                })();
            });
        });
    }
    

    else if(parentDivID == "TRANSFER")
    {
        $("#TRANSFER").click(function() {
/*
            var myApp = new Framework7();
            var $$ = Dom7;
                             
            $$('#TRANSFER').on('click', function () {
                myApp.confirm('Are you sure you want to transfer task to ?', 'Colleague Transfer Alert', function () {
                    myApp.alert('You clicked Ok button');
                });
            });
*/

//            mySearchbar.clear();
                             
            getColleagueList("colleagueListViewForTransfer","colleagueItem-titleForTransfer","TaskTransfer");
//            myApp.popup('.popup-colleagueList');
            myApp.popup('.popup-colleagueListForTransfer');

                             
        });
    }
    
    else if(parentDivID == "VIEW-IMAGE")
    {
        $("#VIEW-IMAGE").click(function() {
                               
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
                               
            myApp.modal({
                        
                title:  'Choose Action',
        
                verticalButtons: true,
                buttons: [
                    {
                        text: 'Camera',
                        onClick: function() {
                            capturePhoto();
                        }
                    },
        
                    {
                        text: 'Photo Gallery',
                        onClick: function() {
                            getPhoto(pictureSource.PHOTOLIBRARY);
                        }
                    }
                ]
            })
                             
        });
    }

    
}


function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
    // Retrieve image file location from specified source

    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source });

/*
    var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source,
                                popoverOptions  : popover });
*/
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    
    
/*    smallImage.src - file:///private/var/mobile/Containers/Bundle/Application/BBA1BF73-A14E-4CC3-8D2C-7FCCD87972FC/dashboard.app/www/SO_detail.html"
*/
    
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
    
    
    
    
    var date = new Date();
    var myFolderApp = "CapturedImages";
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
        //The folder is created if doesn't exist
        fileSys.root.getDirectory( myFolderApp, {
            create:true, exclusive: false}, function(directory) {
                                                       
//                entry.moveTo(directory, newFileName,  successMove, resOnError);
                                                       
            clickedServiceOrderValue = window.localStorage.getItem('clickedServiceOrder');
            clickedServiceOrderID = clickedServiceOrderValue.substring(0,clickedServiceOrderValue.indexOf('/'));
                                                       
            var newFileName = clickedServiceOrderID + "_" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours()  + "-" + date.getMinutes() + "-" + date.getSeconds() + "_img"  + ".png";
                                                       
                                                       
            directory.getDirectory( clickedServiceOrderID, {
                create:true, exclusive: false}, function(dir) {
                                   
//                    entry.moveTo(dir, newFileName,  successMove, resOnError);
                                   
                                   
                dir.getFile(newFileName, { create: true, exclusive: false }, function (fileEntry) {
                                                   
                    console.log("fileEntry is file?" + fileEntry.isFile.toString());
                            
                    console.log("dir name : " + dir.nativeURL);
                    var dirPathName = dir.nativeURL + newFileName;
                    console.log("dir path name : " + dirPathName);
                            
                    window.localStorage.setItem('dirPathName',dirPathName);
                           
                            
                            
                // fileEntry.name == 'someFile.txt'
                // fileEntry.fullPath == '/someFile.txt'
                    writeFile(fileEntry, null);
                                                   
                    }, onErrorCreateFile);
                                                                              
                },
                resOnError);
                                                       
                                                       
            },
        resOnError);
        },
    resOnError);

    
    
    
}


function writeFile(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
//    writer.write(dataURL); //does not open as image
    
    var smallImage = document.getElementById('smallImage');
    writer.write = smallImage.src;
    
    
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';    
    largeImage.src = window.localStorage.getItem('dirPathName');
    
}

function fail(error) {
    console.log(error.code);
}
function onErrorCreateFile(error) {
    alert(error.code);
}




// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
  
/*
    imageURI - file:///var/mobile/Containers/Data/Application/6943528B-71BD-475C-99BD-326BE919FEC7/tmp/cdv_photo_001.jpg"
*/
    
    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');
    
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
    
    
    movePic(imageURI);
    
}

function onFail(message) {
    alert('Failed because: ' + message);
}




function movePic(file){
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){
    var date = new Date();
//    var n = d.getTime();
    //new file name
//    var newFileName = n + ".jpg";
    var myFolderApp = "AttchedImages";
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
        //The folder is created if doesn't exist
        fileSys.root.getDirectory( myFolderApp, {
            create:true, exclusive: false}, function(directory) {
                                  
//                entry.moveTo(directory, newFileName,  successMove, resOnError);
                                  
/*
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    //The folder is created if doesn't exist
                    fs.root.getDirectory( "60001630", {
                        create:true, exclusive: false}, function(directory) {
                            entry.moveTo(directory, newFileName,  successMove, resOnError);
                        },
                    resOnError);
                },
                resOnError)
*/
         
            clickedServiceOrderValue = window.localStorage.getItem('clickedServiceOrder');
            clickedServiceOrderID = clickedServiceOrderValue.substring(0,clickedServiceOrderValue.indexOf('/'));
                                              
            var newFileName = clickedServiceOrderID + "_" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours()  + "-" + date.getMinutes() + "-" + date.getSeconds() + "_img"  + ".png";

                                  
            directory.getDirectory( clickedServiceOrderID, {
                create:true, exclusive: false}, function(dir) {
                                          
                      entry.moveTo(dir, newFileName,  successMove, resOnError);
                                          
                },
            resOnError);
        
                                  
            },
            resOnError);
        },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
}

function resOnError(error) {
    alert(error.code);
}



/*
function closeDetailScreenMapPopup()
{
//    myApp.closeModal('.detailScreenMapPopup',YES);
    myApp.closeModal('.detailScreenMapPopup');
}
*/

function TaskTransferPopUpClose()
{
    myApp.closeModal();
}

function createAttchmentList(fetchAttachmentsQuery,AttachmentsListID)
{
    console.log("fetchAttachmentsQuery : " + fetchAttachmentsQuery);
    
    (function() {
        db.transaction(function (tx)
        {
            tx.executeSql (fetchAttachmentsQuery, [], function (tx, attachmentResults)
            {
                console.log("attachmentResults length : " + attachmentResults.rows.length);
                           
                if(attachmentResults.rows.length > 0)
                {
                    for(var i = 0 ; i < attachmentResults.rows.length ; i++)
                    {
                         var attachmentsTag = '<li><a href="#" class="item-link item-content"><div class="item-media"><img src="img/Attachments.png" width="40"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+attachmentResults.rows.item(i).ATTCHMNT_ID+'</div></div><div class="item-subtitle">'+window.localStorage.getItem("clickedServiceOrder")+'</div></div></a></li>';
                           
                           console.log("attachmentsTag : " + attachmentsTag);
                           
//                        $('#'+AttachmentsListID).append('<li><a href="#" class="item-link item-content"><div class="item-media"><img src="img/Attachments.png" width="40"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+attachmentResults.rows.item(i).ATTCHMNT_ID+'</div></div><div class="item-subtitle">'+window.localStorage.getItem("clickedServiceOrder")+'</div></div></a></li>');
                           $('#'+AttachmentsListID).append(attachmentsTag);
                           
                           console.log("SO_DetailHtmlBody tag : " + $('#SO_DetailHtmlBody').html());

                    }
                }
//            }, null);
            }, console.log("fetchAttachmentsQuery running into error"));
        });
    })();
}


function createAdditionalPartnersList(fetchAdditionalPartnersQuery,AdditionalPartnersListID)
{
    console.log("fetchAdditionalPartnersQuery : " + fetchAdditionalPartnersQuery);
    
    (function() {
        db.transaction(function (tx)
            {
                tx.executeSql (fetchAdditionalPartnersQuery, [], function (tx, additionalPartnersResults)
                {
                    var additionalPartnersTag = '';
                               
                    console.log("additionalPartnersResults length : " + additionalPartnersResults.rows.length);
                    
                    if(additionalPartnersResults.rows.length > 0)
                    {
                        
                        additionalPartnersTag = '<div class="data-table"><table><thead><tr><th class="label-cell">Partner Type</th><th class="label-cell">Partner Name</th><th class="label-cell">Telephone Num</th></tr></thead><tbody>';
              
                        for(var i = 0 ; i < additionalPartnersResults.rows.length ; i++)
                        {
                             
                               var partnerName = '';
                               if(additionalPartnersResults.rows.item(i).NAME1.length > 0)
                                    partnerName = additionalPartnersResults.rows.item(i).NAME1;
                               if(additionalPartnersResults.rows.item(i).NAME2.length > 0)
                                    partnerName = partnerName + " " + additionalPartnersResults.rows.item(i).NAME2;
                               if(additionalPartnersResults.rows.item(i).PARTNER_NO.length > 0)
                                    partnerName = partnerName + " (" + additionalPartnersResults.rows.item(i).PARTNER_NO + ")";
                               
                               
                               var partnerTelNum1 = additionalPartnersResults.rows.item(i).TELF1 + " " + '<img style="width:20px;height:20px;" src="img/CallButton.png" />';
                               
                               additionalPartnersTag = additionalPartnersTag + '<tr><td class="label-cell">'+additionalPartnersResults.rows.item(i).PARVW+'</td><td class="label-cell">'+partnerName+'</td><td class="label-cell">'+partnerTelNum1+'</td></tr>';
                               
                        }
               
                        additionalPartnersTag = additionalPartnersTag + '</tbody></table></div>';
                              
                        $('#'+AdditionalPartnersListID).append(additionalPartnersTag);

                    }
//                }, null);
                }, console.log("fetchAdditionalPartnersQuery running into error"));
            });
    })();
}
