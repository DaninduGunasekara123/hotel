function f() {
    var app = angular.module('bookingApp');
    app.derective('cartPopUpShowDir', function () {
        return {
            restrict: 'E',
            scope: {
                cart: '='
            },
            template: false,
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    if (scope.cart.length > 0) {
                        var cartPopUp = angular.element(document.querySelector('#cartPopUp'));
                        cartPopUp.removeClass();
                        cartPopUp.removeAttr();
                        cartPopUp.addClass();
                    }
                });
            }
        };
    });

    app.derective('updateBasketDir', function () {
        return {
            restrict: 'AEC',
            scope: {
                cart: '='
            },
            template: false,
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var cartPopUp = angular.element(document.querySelector('#cartPopUp'));
                    var basket = angular.element(document.querySelector('#basket'));
                    var basketMsg = angular.element(document.querySelector('#basket-preview'));

                    if ($(this).hasClass('removebtn')) {
                        differentRooms--;
                    }

                    if (differentRooms > 0) {
                        basket.removeAttr("class");
                        basket.removeAttr("style");
                        basket.addClass('rotate', function () {
                        });
                        basketMsg.fadeIn();
                    }
                    else {
                        cartPopup.fadeOut();
                        basketMsg.fadeOut();
                    }

                });
            }
        };
    });

    app.directive('quantityDir', ['$timeout', function (timer) {
        return {
            restrict: 'AEC',
            scope: {
                cart: "=",
                pointer: "="
            },
            template: false,
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var test = angular.element(document.querySelector('#cartItems #room-' + scope.pointer + ' .qnt'));

                    var errorSelector = '#cartItems #room-' + scope.pointer + ' .errorMsg';
                    var errorMsg = angular.element(document.querySelector(errorSelector));
                    var roomQuantity = scope.cart[scope.pointer].quantity;
                    var availability = scope.cart[scope.pointer].available;
                    var hideBack = function () {
                        errorMsg.fadeOut();
                    }

                    if (roomQuantity >= availability) {
                        changeLang('en');
                        errorMsg.fadeIn();
                        timer(hideBack, 1500);
                    }

                });
            }
        };
    }]);

    // On load directive to check if the cart has elements to show
    app.directive('onloadDir', ['$timeout', function (timer) {
        return {
            restrict: 'E',
            scope: {
                cart: "="
            },
            template: false,
            link: function (scope, element, attrs) {
                var basketHandle = function () {
                    var differentRooms = scope.cart.length;
                    var basketMsg = angular.element(document.querySelector('#basket-preview'));

                    if (differentRooms > 0) {
                        basketMsg.fadeIn();
                    }
                    else {
                        basketMsg.fadeOut();
                    }
                }
                timer(basketHandle, 1);

            }
        };
    }]);
};