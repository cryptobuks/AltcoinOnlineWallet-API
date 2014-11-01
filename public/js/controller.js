


'use strict';

/* Controllers */
var altcoinwallet = angular.module('altcoinwallet', ["ngClipboard"]);

altcoinwallet.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
}]);

altcoinwallet.controller('wallet', function($scope, $http) {
    
    $http.get('http://127.0.0.1:1337/wallet').success(function(data) {
        $scope.phones = data;
    });

    $scope.send = function(address, amount, coin){

        $http.post('/send',{address:address, amount: amount, coin:coin})
            .success(function(data) {
                $scope.phones[coin].tip = data.msg;
            }
        );
        
    };

    $scope.copy = function($event){
        console.log($event)
    };



});
