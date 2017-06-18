(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuyItems = this;

    toBuyItems.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyItems.checkOffShoppingItem = function(itemIndex){
      ShoppingListCheckOffService.checkOffShoppingItem(itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtItems = this;

    boughtItems.items = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [
                      { name: "yogurt", quantity: 10 },
                      { name: "cookies", quantity: 5 },
                      { name: "eggs", quantity: 6 },
                      { name: "icecreams", quantity: 2 },
                      { name: "chocolates", quantity: 5}
                     ];

    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.checkOffShoppingItem = function(itemIndex){

      // copy the item to Already Bought Item List
      boughtItems.push(toBuyItems[itemIndex]);

      // remove item for To Buy list
      toBuyItems.splice(itemIndex, 1);
    }

  }

})();
