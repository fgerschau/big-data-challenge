var bigDataApp = angular.module('bigDataApp', ['ui.bootstrap']);

// Custom placeholder, height and loadingdata (ng-model) fields are required
bigDataApp.directive('placeholder', function ($parse) {
  function compile(element, attrs) {
    element.children().attr('ng-show', attrs.loadingdata);
    element.hide();
    var height = attrs.height;
    var placeholderHtml = "<div class='jumbotron' id='jumbotron-placeholder' style='width: 100%; height:" + height + "' ></div>'";
    var placeholder = $(placeholderHtml);
    placeholder.insertAfter(element);

    return function (scope, element, attrs) {
      scope.$watch('loadingdata', function () {
        if (scope.loadingdata && scope.loadingdata.length) {
          placeholder.remove();
          element.show();
        } else {
          element.hide();
          placeholder.insertAfter(element);
        }
      }, true);
    };
  }

  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    scope: {
      loadingdata: '=',
    },
    compile: compile,
  };
});
