(function (){
    'use strict';
    
    angular.module('ShoppingListCheckOff',[])
    .controller('Controller1', ToBuyController)
    .controller('Controller2', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var thisController = this;

        thisController.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        thisController.moveToBought = function(itemIndex){
            ShoppingListCheckOffService.moveToBought(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];   
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var thisController = this;
        thisController.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService(){

        var checkOffService = this; 

        var toBuyItems = [{name: 'Pasta' ,  quantity: 2},
                          {name: 'Pizza' ,  quantity: 4},
                          {name: 'Cookies', quantity: 1},
                          {name: 'Icecream',quantity: 5}, 
                          {name: 'Flour' ,  quantity: 1},
                          {name: 'Waffles', quantity: 3}];
        var boughtItems = [];

        checkOffService.moveToBought = function (itemIndex){
            boughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex,1);
        }

        checkOffService.getToBuyItems = function(){
            return toBuyItems;
        }

        checkOffService.getBoughtItems = function(){
            return boughtItems;
        }
    }
})();