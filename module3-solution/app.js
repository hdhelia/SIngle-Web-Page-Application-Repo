(function (){

    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems', FoundItems);

    function FoundItems(){
        var ddo = {
            templateUrl: "show-found-items.html",
            scope: {
                foundItem: "<",
                onRemove : "&"
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['$q','MenuSearchService'];
    function NarrowItDownController($q,MenuSearchService){
        var ctrl = this;

        ctrl.inputTerm = "";
        ctrl.displayMessage = false;
        ctrl.getSearchResultFiltered = function(){
            // console.log("Get search Called");
            if(!ctrl.inputTerm){
                ctrl.foundItems = "";
                ctrl.displayMessage = true;
            }else{
                var promiseObj = MenuSearchService.getMatchedMenuItems(ctrl.inputTerm);
                promiseObj.then(function(result){
                    ctrl.foundItems = result;
                    ctrl.displayMessage = (result.length === 0);
                });
            }
        }
        ctrl.removeThisItem = function(index){
            ctrl.foundItems.splice(index,1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
        var thisService = this;

        thisService.getMatchedMenuItems = function (searchTerm){

            var filteredItems = [];

            return $http({
                url : "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (response){
                var itemsList = response.data["menu_items"];
                var lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
                var filteredItems = [];

                for(var i=0;i<itemsList.length;i = i+1){
                    if(itemsList[i]["description"].trim().toLowerCase().indexOf(lowerCaseSearchTerm) !== -1){
                        filteredItems.push(itemsList[i]);
                    }
                }
                // thisService.returnFilteredList = filteredItems;
                // console.log('Service Inside then()' + filteredItems);
                return filteredItems;
                
            },
            function (error){
                console.log("Problem fetching the data from the server.");
            });
            // console.log('Service outside then()' + filteredItems);
            
        };
    }

})();