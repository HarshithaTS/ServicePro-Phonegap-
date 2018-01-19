"use strict";
function DeviceID() {
}


DeviceID.prototype.getDeviceId = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "DeviceID", "getDeviceId", []);
};





DeviceID.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.deviceID = new DeviceID();
  return window.plugins.deviceID;
};

cordova.addConstructor(DeviceID.install);
