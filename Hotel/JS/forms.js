$(function () {
    // -- Checkboxes custom list -- //

    $('.checkBoxList .roomType, .checkBoxList .items').hover(function () {
        if ($('.checkBoxList').hasClass('visible')) {
            $('.checkBoxList').removeClass('visible');
        }
        else {
            $('.checkBoxList').addClass('visible');
        }
    });

    var checkedItems = 0;
    var values = [];
    $('.checkBoxList .items label input[type=checkbox]').change(function () {
        values = getCheckboxValues();
        if (this.checked) {
            checkedItems++;
        } else {
            checkedItems--;
        }

        if (checkedItems == 1) {
            var value = $(this).val();
            $(".checkBoxList .roomType").val(values[0]);
        }
        else if (checkedItems == 2) {
            var value = $(this).val();
            $(".checkBoxList .roomType").val(values[0] + ", " + values[1]);
        }
        else if (checkedItems > 2) {
            $(".checkBoxList .roomType").val(langPack['multitypes']);
        }
        else {
            $(".checkBoxList .roomType").val(langPack['alltypes']);
        }
    });

    function getCheckboxValues() {
        var vals = [];
        var cnt = 0;
        $('.checkBoxList .items li').each(function () {
            var checkbox = $(this).children('label').children('input[type=checkbox]');
            var check_class = checkbox.attr("class");
            if (checkbox.is(":checked")) {
                vals[cnt] = $(checkbox).val();
                cnt++;
            }
        });
        return vals;
    }


    // -- Guests selection field -- //

    var guests = 1;

    $('.addGuest').click(function () {
        guests++;
        var input = $(this).prevUntil('.subGuest');
        input.val(guests);
        $(input).trigger('input');
    });

    $('.subGuest').click(function () {
        if (guests > 1) {
            guests--;
            var input = $(this).nextUntil('.addGuest');
            input.val(guests);
            $(input).trigger('input');
        }
    });


    // -- Price slider -- //

    $("#priceSlider").slider(
        {
            range: true,
            min: 0,
            max: 500,
            values: [0, 500],
            slide: function (event, ui) {
                $("#priceRange").val(ui.values[0] + "€ - " + ui.values[1] + "€");
                $("#priceFrom").val(ui.values[0]);
                $("#priceTo").val(ui.values[1]);
                $("#priceFrom").trigger('input');
                $("#priceTo").trigger('input');
            }
        });

    $("#priceFrom").val($("#priceSlider").slider("values", 0));
    $("#priceTo").val($("#priceSlider").slider("values", 1));
    $("#priceFrom").trigger('input');
    $("#priceTo").trigger('input');
    $("#priceRange").val($("#priceSlider").slider("values", 0) +
        "€ - " + $("#priceSlider").slider("values", 1) + "€");


    // -- Size slider -- //

    $("#sizeSlider").slider(
        {
            range: true,
            min: 0,
            max: 150,
            values: [0, 150],
            slide: function (event, ui) {
                $("#sizeRange").val(ui.values[0] + "m2 - " + ui.values[1] + "m2");
                $("#sizeFrom").val(ui.values[0]);
                $("#sizeTo").val(ui.values[1]);
                $("#sizeFrom").trigger('input');
                $("#sizeTo").trigger('input');
            }
        });

    $("#sizeFrom").val($("#sizeSlider").slider("values", 0));
    $("#sizeTo").val($("#sizeSlider").slider("values", 1));
    $("#sizeFrom").trigger('input');
    $("#sizeTo").trigger('input');
    $("#sizeRange").val($("#sizeSlider").slider("values", 0) +
        "m2 - " + $("#sizeSlider").slider("values", 1) + "m2");


    // -- Search button click-- //

    $("#searchForm .searchBtn").click(function () {
        // If dates input is valid --> Synchronize and swap forms

        if ($('.from').val() != "" && $('.to').val() != "") {
            // Setting checked item vars to 0 because they will re-unitialize during forms sync

            checkedItems = 0;
            values = [];

            // Setting checked item vars to 0 because they will re-unitialize during forms sync

            searchFormsSync();

            // Swap forms effect

            $("#searchForm").addClass("blur-out").fadeOut(500);
            $("#results").addClass("blur-in").show();
        }
        else if ($('.from').val() == "") {
            $('.from').focus();			// If dates input is not valid, show calendar
        }
        else {
            $('.to').focus();
        }
    });


    // Syncronizes the inputs of the second search form with those of the first one

    function searchFormsSync() {
        $('.from2').val($('.from').val());
        $('.to2').val($('.to').val());
        $('#results .guests').val($('#searchForm .guests').val());
        $('.from2').trigger('input');
        $('.to2').trigger('input');
        $('#results .guests').trigger('input');

        //Checks all checkboxes on the first forms and checks the coresponding fields of the second

        $('#searchForm .checkBoxList .items li').each(function () {
            var checkbox = $(this).children('label').children('input[type=checkbox]');
            var check_class = checkbox.attr("class");
            if (checkbox.is(":checked")) {
                $('#results .checkBoxList .items li .' + check_class).trigger('click');
            }
        });
    }

    $("#cartButtons .continue").click(function () {
        $("#cartPopup").fadeOut('fast');
    });
});