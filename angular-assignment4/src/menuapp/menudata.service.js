(function () {
'use strict';

angular.module('data')
.service('MenuDataService' , MenuDataService)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http','ApiBasePath']
function MenuDataService($http,ApiBasePath){

  var service = this;
  service.menuItems = [];

  service.getAllCategories = function(){
    var promise = $http({
      method : "GET",
      url: (ApiBasePath + "/categories.json"),
    }).then(function(response){
      return response.data;
    });

    return promise;

  }

  service.getItemsForCategory = function(categoryShortName){

    var promise = $http({
      method : "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
    }).then(function(response){
      return response.data.menu_items;
    });

    return promise;
  }
}


})();
