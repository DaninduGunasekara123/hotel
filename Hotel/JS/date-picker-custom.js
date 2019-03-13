$(function () {
    from = $(".from")
        .datepicker({
            dateFormat: "dd-mm-yy",
            minDate: 0,
            changeMonth: false,
            numberOfMonths: 2,
            beforeShow: function () {
                arrowfix("left", 1);
            },
            onSelect: function (dateText) {
                $('.from').trigger('input');

                // Sets the min Departure date to be +1 from the arrival day

                var nextDay = new Date(getDate(this));
                nextDay.setDate(nextDay.getDate() + 1);
                to.datepicker("option", "minDate", nextDay);

                // After an Arrival date is selected, move directly to the Departure selection

                setTimeout(function () {
                    to.datepicker('show');
                }, 1);
            }
        });

    to = $(".to")
        .datepicker({
            dateFormat: "dd-mm-yy",
            minDate: "+1d",
            changeMonth: false,
            numberOfMonths: 2,
            beforeShow: function () {
                arrowfix("right", 1);
            },
            onSelect: function (dateText) {
                $('.to').trigger('input');

                // Sets the max Arrival date to be -1 from the Departure day

                var prevDay = new Date(getDate(this));
                prevDay.setDate(prevDay.getDate() - 1);
                from.datepicker("option", "maxDate", prevDay);
            }
        });

    from2 = $(".from2")
        .datepicker({
            dateFormat: "dd-mm-yy",
            minDate: 0,
            changeMonth: false,
            numberOfMonths: 2,
            beforeShow: function () {
                arrowfix("left", 2);
            },
            onSelect: function (dateText) {
                $('.from2').trigger('input');

                // Sets the min Departure date to be +1 from the arrival day

                var nextDay = new Date(getDate(this));
                nextDay.setDate(nextDay.getDate() + 1);
                to2.datepicker("option", "minDate", nextDay);

                // After an Arrival date is selected, move directly to the Departure selection

                setTimeout(function () {
                    to2.datepicker('show');
                }, 5);
            }
        });

    to2 = $(".to2")
        .datepicker({
            dateFormat: "dd-mm-yy",
            minDate: "+1d",
            changeMonth: false,
            numberOfMonths: 2,
            beforeShow: function () {
                arrowfix("right", 2);
            },
            onSelect: function (dateText) {

                $('.to2').trigger('input');

                // Sets the max Arrival date to be -1 from the Departure day

                var prevDay = new Date(getDate(this));
                prevDay.setDate(prevDay.getDate() - 1);
                from.datepicker("option", "maxDate", prevDay);
            }
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate("dd-mm-yy", element.value);
        }
        catch (error) {
            date = null;
        }

        return date;
    }


    // Creates and places the arrow on top of the calendars

    function arrowfix(position, form) {
        if (form == 1) {
            if (position == 'left') {
                setTimeout(function () {
                    $("#ui-datepicker-div").prepend("<div class='arrowFrom'></div>");
                    $(".arrowFrom").css("margin-left", "15%");
                }, 5);
            }
            else if (position == 'right') {
                setTimeout(function () {
                    $("#ui-datepicker-div").prepend("<div class='arrowFrom'></div>");
                    $(".arrowFrom").css("margin-left", "50%");
                }, 5)
            }
        }
        else {
            if (position == 'left') {
                setTimeout(function () {
                    $("#ui-datepicker-div").prepend("<div class='arrowFrom'></div>");
                    $(".arrowFrom").css("margin-left", "10%");
                }, 5);
            }
            else if (position == 'right') {
                setTimeout(function () {
                    $("#ui-datepicker-div").prepend("<div class='arrowFrom'></div>");
                    $(".arrowFrom").css("margin-left", "10%");
                }, 5)
            }
        }
    }
});
