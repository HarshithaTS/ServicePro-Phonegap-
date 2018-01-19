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


function SO_Details()
{
    queryContextForDetailScreen();
}


function backButtonClicked()
{
    window.sessionStorage.setItem('NavigationOrBackButtonClicked',"Yes");
    
    var activeScreen = window.localStorage.getItem("ActiveScreen");
    
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
