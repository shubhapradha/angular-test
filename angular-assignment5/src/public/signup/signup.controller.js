(function(){
  'use strict';

  angular.module('public')
  .controller('SignupController',SignupController);


  SignupController.$inject = ['MenuService','$scope'];
  function  SignupController(MenuService,$scope) {
    var $ctrl = this;

    $ctrl.invalidMenuItem = false;
    $ctrl.subscriptionSuccess = false;
    $ctrl.subscriptionFailed = false;
    $ctrl.menuShortNames = [];

    //Pre Fetch the menu shortnames
      $ctrl.preFetchMenu = function(){
        MenuService.getMenuShortNames().then(function(response){
         $ctrl.menuShortNames = response;
       });
      }


    $scope.isAMenuItem = function(value)
    {
      if($ctrl.menuShortNames.length == 0)
      {
        $ctrl.preFetchMenu();
      }
      if(value === undefined || value === "")
      {
        return true;

      }
      else {
        return $ctrl.menuShortNames.indexOf(value) > -1;
      }

    }

    // Save user data on clicking Submit
    $ctrl.submit = function () {
        $ctrl.completed = true;

        // Menu short_name validated afer clicking submit
        /*if($ctrl.user.favorite)
        {
          MenuService.getItemDetail($ctrl.user.favorite).then(function(response){

          if(response === -1){
            $ctrl.invalidMenuItem = true;
          }
          else {

            $ctrl.dataObj = {
        				first_name : $ctrl.user.firstname,
                last_name : $ctrl.user.lastname,
                email: $ctrl.user.email,
                phone: $ctrl.user.phone,
                menu_short_name: response.short_name,
                menu_name: response.name,
                description: response.description
        		};

            MenuService.saveSignupDetails($ctrl.dataObj);
            $ctrl.subscriptionSuccess = true;
          }

        });
      }*/

      //Menu short_name is pre-validated via ui-validate
      if($ctrl.user.favorite)
      {
        MenuService.getItemDetail($ctrl.user.favorite).then(function(response){

        if(response === -1){
        }
        else {

          $ctrl.dataObj = {
              first_name : $ctrl.user.firstname,
              last_name : $ctrl.user.lastname,
              email: $ctrl.user.email,
              phone: $ctrl.user.phone,
              menu_short_name: response.short_name,
              menu_name: response.name,
              description: response.description
          };

          MenuService.saveSignupDetails($ctrl.dataObj);
          $ctrl.subscriptionSuccess = true;
        }

      });
    }

    }

  }

})();
