(function (){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.itemList = null;
    $scope.displayMessage = "";
    $scope.dietWarning = {
      "color" : "black"
    };
    $scope.lunchMenuBorder = {
      "border-style": "solid",
      "border-color": "#ccc"
    };

    $scope.CheckIfTooMuch = function () {
      var NumberOfFoodItems = getNumberOfItems($scope.itemList,',');

      if( NumberOfFoodItems == 0 )
      {
        setDisplayMessage("Please enter data first");
        setMessageColors("red");
      }
      else if (NumberOfFoodItems <= 3) {
        setDisplayMessage("Enjoy!");
        setMessageColors("green");
      }
      else {
        setDisplayMessage("Too much!");
        setMessageColors("green");
      }
    };

    /* Function : setDisplayMessage
    /* Descripition : Sets the message display based on number of items in Food Menu
    */
    function setDisplayMessage(msg)
    {
      $scope.displayMessage = msg;
    }

    /* Function: setMessageColors
    /* Descripition : Sets the colour for display message and text box
    */
    function setMessageColors(color){
      $scope.dietWarning.color = color;
      $scope.lunchMenuBorder = {
        "border-style": "solid",
        "border-color": color
      };
    }

    /* Function :     getNumberOfItems
       Descripition:  Takes in a string , splits the string on the seperator
       Returns :      Number of items
       Note:          Empty string i.e., , is not counted as an item
    */

    function getNumberOfItems(list, separator){
      var arrayOfStrings = null;

      if(list != null && list.length != 0 && list.localeCompare(",") != 0)
      {
        /* Removing empty strings between commas and extra white
           space before and after the item name. Removes leading and
           trailing commas from the list.
           */
        list = list.replace(/,+/g, ',')
                    .replace(/[,\s,]+/g,',')
                    .replace(/\s*,\s*/g, ',')
                    .replace(/(^,)|(,$)/g, "");

        // Store in array is the string is not an empty string
        if(list != "")
        {
          arrayOfStrings = list.split(separator);
          return arrayOfStrings.length;
        }
        else
        {
          return 0;
        }
      }
      else
      {
        return 0;
      }
    }

  }

})();
