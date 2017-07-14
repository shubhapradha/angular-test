(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo','ApiPath'];

function MyInfoController(userInfo,ApiPath){
  var $ctrl = this;

  $ctrl.basePath = ApiPath;
  $ctrl.userInfo = userInfo;

  if(userInfo == null)
    $ctrl.isUserSubscribed = false;
  else {
    $ctrl.isUserSubscribed = true;
  }

}

})();
