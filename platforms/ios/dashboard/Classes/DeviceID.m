//
//  DeviceID.m
//  CordovaTests
//
//  Created by BalaMurugan on 16/03/15.
//
//

#import "DeviceID.h"
#import "UIDevice+IdentifierAddition.h"

@implementation DeviceID

- (void) getDeviceId:(CDVInvokedUrlCommand *)command{
    NSString *fileContents = [[[UIDevice currentDevice] uniqueGlobalDeviceIdentifier] uppercaseString];
    NSString *altDeviceId = [[[UIDevice currentDevice] uniqueDeviceIdentifier] uppercaseString];
//    NSString *deviceId = @"100000000000000";
    NSString *versionName = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    
    NSString *webServiceURL = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"ServiceURL"];
    
    NSString *buildName = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"BuildName"];
    
    NSString *iOSVersion = [[UIDevice currentDevice]systemVersion];
    
//    NSString *jsonObj = [NSString stringWithFormat: @"{\"deviceid\":\"%@\",\"versionname\":\"%@\"}", deviceId,versionName];
    
//    NSString *jsonObj = [NSString stringWithFormat: @"{\"deviceid\":\"%@\",\"altdeviceid\":\"%@\",\"versionname\":\"%@\"}", fileContents,altDeviceId,versionName];
    
//    NSString *jsonObj = [NSString stringWithFormat: @"{\"deviceid\":\"%@\",\"altdeviceid\":\"%@\",\"versionname\":\"%@\",\"iOSversion\":\"%@\"}", fileContents,altDeviceId,versionName,iOSVersion];
    
    NSString *jsonObj = [NSString stringWithFormat: @"{\"deviceid\":\"%@\",\"altdeviceid\":\"%@\",\"versionname\":\"%@\",\"iOSversion\":\"%@\",\"webServiceUrl\":\"%@\",\"buildname\":\"%@\"}", fileContents,altDeviceId,versionName,iOSVersion,webServiceURL,buildName];
    
    //NSString *jsonObj = @"";
    
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsString:  jsonObj
                                     ];

// Return the file contents String to the caller (cordovaGetFileContents)
[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
