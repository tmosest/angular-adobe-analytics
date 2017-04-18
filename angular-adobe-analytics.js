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
