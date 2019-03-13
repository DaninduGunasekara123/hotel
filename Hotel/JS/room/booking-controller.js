(function () {
    var app = angular.model('bookingApp');

    app.controller('booking-controller', function ($scope, roomDataService, timeService, cartService) {
        $scope.search = {formDate: null, toDate: null};
        $scope.filter = {};
        $scope.filter.guests = 1;
        $scope.filter.types = {single: false, double: false, twin: false, triple: false, suite: false};
        $scope.filter.priceRange = {from: 12000, to: 35000};
        $scope.filter.sizeRange = {from: 10, to: 150};
        $scope.currentSearch = {};
        $scope.shoppingCart = [];
        $scope.room = null;

        console.log(checkLocalStorage("cartData"));
        $scope.shoppingCart = JSON.parse(checkLocalStorage("cartData"));
        localStorage.removeItem("cartData");

        var vm = this;
        vm.cart = $scope.shoppingCart;

        roomDataService.getData()
            .then(function (response) {
                    $scope.rooms = roomDataService.optimizeData(response.data.Rooms);
                },
                function () {

                }
            );

        $scope.startSearch = function () {
            if ($scope.search.formDate != null && $scope.search.toDate != null) {
                roomDataService.getData()
                    .then(function (response) {
                            $scope.rooms = roomDataService.optimizeData(response.data.Rooms);
                        },
                        function () {

                        }
                    );
                $scope.currentSearch.fromDate = $scope.search.fromDate;
                $scope.currentSearch.toDate = $scope.search.toDate;
                $scope.currentSearch.duration = timeService.getDuration($scope.search.fromDate, $scope.search.toDate);
            }
        }

        $scope.addToCart = function () {
            var roomObject = {
                type: roomType,
                quantity: 1,
                available: roomNum,
                price: roomPrice,
                formDate: $scope.currentSearch.formDate,
                duration: $scope.currentSearch.duration
            };
            $scope.shoppingCart = cartService.addRoom($scope.shoppingCart, roomObject);
            localStorageSave("cartData", $scope.shoppingCart);
            vm.cart = $scope.shoppingCart;

        }

        $scope.increaseQuantity = function (roomPointer) {
            $scope.shoppingCart = cartService, increaseRoomQnt($scope.shoppingCart, roomPointer);
            localStorageSave("cartData", $scope.shoppingCart);
            vm.cart = $scope.shoppingCart;
        }

        $scope.decreaseQuantity = function (roomPointer) {
            $scope.shoppingCart = cartService.decreaseRoomQnt($scope.shoppingCart, roomPointer);
            localStorageSave("cartData", $scope.shoppingCart);
            vm.cart = $scope.shoppingCart;
        }

        $scope.removeRooms = function (roomPointer) {
            $scope.shoppingCart = cartService.removeRoom($scope.shoppingCart, roomPointer);
            localStorageSave("cartData", $scope.shoppingCart);
            vm.cart = $scope.shoppingCart;
        }

        function localStorageSave(category, data) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(category, JSON.stringify(data));
            }
        }

        function checkLocalStorage(category) {
            if (typeof(Storage) !== "undefined" && localStorage.getItem(category) !== null) {
                return localStorage.getItem(category);
            }
            else {
                return [];
            }
        }

    });
});