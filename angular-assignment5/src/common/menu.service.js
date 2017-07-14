(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.isUserSubscribed = false;
  service.userSubscription = "";

  service.menuShortNames =[];

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItemDetail = function(shortName){
    return $http.get(ApiPath + '/menu_items/' + shortName + ".json").then(function(response){
      return response.data;
    },function(response){
      return -1;
    }
  );

  }

  service.saveSignupDetails = function(dataObj){
		service.isUserSubscribed = true;
    service.userSubscription = dataObj;
  }

  service.getUserInfo = function(){
    if (service.isUserSubscribed == true)
        return service.userSubscription;
    else {
      return null;
    }
  }

  service.getMenuShortNames = function(){

    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
        angular.forEach(response.data.menu_items,function(value,key){
          service.menuShortNames.push(value.short_name);
        });
      return service.menuShortNames;
    });
  }

}



})();
