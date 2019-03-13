(function () {
    var app = angular.module('bookingApp');

    // Filtering results according to selected categories
    app.filter('categoriesFilter', function () {
        return function (items, types) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (types.single == false && types.double == false &&
                    types.twin == false && types.triple == false && types.suite == false) {
                    filtered.push(item);
                }
                else if (types.single == true && item.Type == 'Single') {
                    filtered.push(item);
                }
                else if (types.double == true && item.Type == 'Double') {
                    filtered.push(item);
                }
                else if (types.twin == true && item.Type == 'Twin') {
                    filtered.push(item);
                }
                else if (types.triple == true && item.Type == 'Triple') {
                    filtered.push(item);
                }
                else if (types.suite == true && item.Type == 'Suite') {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

    // Filtering results according to persons max number
    app.filter('guestsFilter', function () {
        return function (items, min) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Max_persons >= min) {
                    filtered.push(item);
                }

            });

            return filtered;
        };
    });

    // Filtering results according to room size range
    app.filter('sizeFilter', function () {
        return function (items, range) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Size >= range.from && item.Size <= range.to) {
                    filtered.push(item);
                }

            });

            return filtered;
        };
    });

    // Filtering results according to price range
    app.filter('priceFilter', function () {
        return function (items, range) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Price >= range.from && item.Price <= range.to) {
                    filtered.push(item);
                }

            });

            return filtered;
        };
    });

    // Calculating total price
    app.filter('totalPriceFilter', function () {
        return function (items, price, quantity, duration) {
            var total = 0;
            angular.forEach(items, function (item) {
                total = total + item.price * item.quantity * item.duration;

            });
            return total;
        };
    });

    // Calculating total rooms on cart
    app.filter('totalRoomsFilter', function () {
        return function (items, quantity) {
            var total = 0;
            angular.forEach(items, function (item) {
                total = total + item.quantity;
            });
            return total;
        };
    });

})();