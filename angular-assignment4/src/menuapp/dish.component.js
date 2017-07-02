(function () {
'use strict';

angular.module('MenuApp')
.component('dish', {
  templateUrl: 'src/menuapp/templates/dish.template.html',
  bindings: {
    items: '<'
  }
});

})();
