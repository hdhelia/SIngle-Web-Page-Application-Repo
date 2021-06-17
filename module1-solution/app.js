(function (){
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

    $scope.message = "";
    $scope.food_items = "";


    $scope.updateMessage = function (){
        $scope.message = chechIfTooMuchAndReturnMessage($scope);
    }

    function chechIfTooMuchAndReturnMessage(){
        let stringItems = $scope.food_items;
        if(stringItems.length === 0){
            return "Please enter data first";
        }
        let listOfItems = stringItems.split(',');

        let notEmpty = 0;
        for(let i= 0 ; i<listOfItems.length; i=i+1){
            let currItem = listOfItems[i].trim();
            if(currItem.length !== 0){
                notEmpty++;
            }
        }
        if(notEmpty <= 3){
            return "Enjoy!";
        }else{
            return "Too Much!";
        }
    }
}

})();