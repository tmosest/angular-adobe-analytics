(function() {
  'use strict';
  angular
    .module('angular-adobe-analytics', [])
    .factory('_satellite', ['$window', function($window) {
      return $window._satellite;
    }])
    .directive('adobeAnalytics', ['$timeout', '_satellite', function($timeout, _satellite) {
      return {
        restrict: 'A',
        link: function(scope, el, attrs) {
          // http://stackoverflow.com/questions/28759818/angularjs-bind-click-event-to-children-of-directive-element/
          $timeout(function() {
            angular.element(el).on('click', function(evt) {
              if (evt && typeof _satellite != angular.isUndefined()) {
                var analyticTag = attrs.antmAdobeAnalytics === '' ? evt.target.innerText : attrs.antmAdobeAnalytics;
                _satellite.track(_.camelCase(analyticTag)); // eslint-disable-line
              }
            });
          });
        },
      };
    }]);
})();
