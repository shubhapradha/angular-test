(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController )
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath','https://davids-restaurant.herokuapp.com')
  .directive('foundItems',FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope:{
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;

    list.searchInitiated = false;
    list.items = [];

    list.searchItem= function(){
      list.searchInitiated = true;

      var promise = MenuSearchService.getAllMenuItems();

      promise.then(function (response) {
         var match = MenuSearchService.getMatchedMenuItems(response.data,list.description);
         list.items = match;
      })
      .catch(function (error) {
      console.log("Error:" + error);
    });
    }


  list.removeItem = function(itemIndex){
   list.items.splice(itemIndex.index, 1);
  }

  }

  MenuSearchService.$inject=['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){

    var service = this;

    service.getAllMenuItems = function(){
      var response = $http({
        method : "GET",
        url: (ApiBasePath + "/menu_items.json"),
      });
      return response;
    }

    service.getMatchedMenuItems = function(data,searchTerm){
      var matchingItems =[];
      var itemIndex = 0;

      if(data && (searchTerm != undefined &&  searchTerm.length != 0)){
        for(var menuItem = 0; menuItem < data.menu_items.length; menuItem++)
        {
          if(data.menu_items[menuItem].description.toLowerCase().indexOf(searchTerm) !== -1)
          {
            matchingItems[itemIndex] = data.menu_items[menuItem];
            itemIndex++;
          }
        }
        return matchingItems;
      }
      else {
        return matchingItems;
      }
    };
  }

})();
