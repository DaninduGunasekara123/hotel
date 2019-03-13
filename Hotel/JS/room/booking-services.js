(function () {
    var app = angular.module('bookingApp');

    app.factory('roomDataService', function ($http) {
        //-- Retrieving data from the json file (normally from the server)

        var data = function () {
            return $http.get('javaScript/rooms/dataset.json')
                .then(function (response) {
                    return response;
                });
        };

        //-- Optimizing data : Isolating unique room objects and including to the
        // object the available rooms number corresponding to the rooms category
        var optimizedData = function (data) {
            var unique = [],
                keys = [];

            // Filtering the results, producing a new array with unique room objects
            angular.forEach(data, function (item) {
                var key = item['Type'];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    unique.push(item);
                }
            });

            //-- Adding available rooms number to the array
            // Looping through unique items objects (5 loops in this case)
            angular.forEach(unique, function (uniqueItem) {
                var cnt = 0;

                // Looping through all the object items recieved from the server
                angular.forEach(data, function (item) {
                    if (item.Type == uniqueItem.Type) {
                        uniqueItem.RoomsNum = ++cnt;
                    }
                });
            });
            return unique;
        };

        return {
            getData: data,
            optimizeData: optimizedData
        };

    });

    // Service taking care of all the shopping cart functions
    app.factory('cartService', function () {
        var addToCart = function (cartArray, obj) {
            var pointer = null;
            angular.forEach(cartArray, function (item, key) {
                if (item.type == obj.type) {
                    pointer = key;
                }
            });

            if (pointer == null) {
                cartArray.push(obj);
            }
            else {
                if (cartArray[pointer].quantity < cartArray[pointer].available) {
                    cartArray[pointer].quantity++;
                }
            }
            return cartArray;
        };

        var removeFromCart = function (cartArray, pointer) {
            cartArray.splice(pointer, 1);
            return cartArray;
        };

        var increaseRoomNum = function (cartArray, pointer) {
            if (cartArray[pointer].quantity < cartArray[pointer].available) {
                cartArray[pointer].quantity++;
            }
            return cartArray;
        };

        var decreaseRoomNum = function (cartArray, pointer) {
            if (cartArray[pointer].quantity > 1) {
                cartArray[pointer].quantity--;
            }
            return cartArray;
        };

        return {
            addRoom: addToCart,
            removeRoom: removeFromCart,
            increaseRoomQnt: increaseRoomNum,
            decreaseRoomQnt: decreaseRoomNum
        };

    });

    // Calculates the number of days between the arrival and depature dates.
    app.service('timeService', function () {
        // Using this method to avoid timezone inconsistencies
        this.getDuration = function (startDate, endDate) {
            var dayInMillis = 1000 * 60 * 60 * 24;

            // Converting string date format to be recognizable from javaScript Date function
            startDate = startDate.substr(6, 4) + "-" + startDate.substr(3, 2) + "-" + startDate.substr(0, 2);
            endDate = endDate.substr(6, 4) + "-" + endDate.substr(3, 2) + "-" + endDate.substr(0, 2);

            // Converting to date objects
            startDate = new Date(startDate);
            endDate = new Date(endDate);

            // Converting to milliseconds
            startDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            endDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

            // Calculating duration

            return Math.floor((endDate - startDate) / dayInMillis);
        }

    });

})();
