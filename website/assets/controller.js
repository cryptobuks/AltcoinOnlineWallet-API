


'use strict';

/* Controllers */
var altcoinwallet = angular.module('altcoinwallet', ["ngClipboard"]);

altcoinwallet.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
}]);

altcoinwallet.controller('wallet', function($scope, $http) {
    
    $http.get('http://127.0.0.1:1337/').success(function(data) {
        $scope.phones = data;
    });

    $scope.show = function($event){

        console.log()

        return "xxx";
    };

    $scope.getcp = function(x,y,z){

        console.log(x,y,z)
    };

});
