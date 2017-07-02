(function () {
'use strict';

angular.module('MenuApp')
.component('menu', {
  templateUrl: 'src/menuapp/templates/menu.template.html',
  bindings: {
    items: '<'
  }
});

})();
