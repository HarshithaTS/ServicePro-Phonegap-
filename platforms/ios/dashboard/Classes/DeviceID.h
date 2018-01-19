//
//  DeviceID.h
//  CordovaTests
//
//  Created by BalaMurugan on 16/03/15.
//
//

#import "Cordova/CDV.h"

@interface DeviceID : CDVPlugin
- (void) getDeviceId:(CDVInvokedUrlCommand *)command;
@end
