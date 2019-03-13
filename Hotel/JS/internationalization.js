// Internationalization : System supports English and Spanish language
var login_field_values;
var langPack = undefined;
var langPack_EN = {
    basket: "Basket",
    primFormLabel: "Book your room",
    arrival: "Arrival",
    depature: "Depature",
    single: "Single",
    double: "Double",
    twin: "Twin",
    triple: "Triple",
    suite: "Suite",
    alltypes: "All Types",
    multitypes: "Multiple Types",
    persons: "Persons ",
    searchBtn: "Check availability",
    search: "Search",
    results: "Results",
    filter: "Filter",
    type: "Type",
    price: "Price",
    size: "Size",
    roomType: "Room",
    roomSize: "Size",
    maxguests: "Max guests",
    book: "Book",
    rooms: "Rooms",
    overnights: "Nights",
    quantity: "Quantity",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
    noMore: "Max rooms available",
    only: "Only",
    available: "left",
    continueBook: "Continue booking",
    back: "Back"
};

var langPack_SP = {
    basket: "⁠⁠⁠Cesta",
    primFormLabel: "Reserva tu habitación",
    arrival: "Arribo",
    depature: "Salida",
    single: "Individual",
    double: "Doble",
    twin: "Doble - dos camas ",
    triple: "Triple",
    suite: "Suite",
    alltypes: "De todo tipo",
    multitypes: "Tipos múltiples",
    persons: "Personas",
    searchBtn: "Comprobación disponibilidad",
    search: "Búsqueda ",
    results: "Resultados",
    filter: "Filtro",
    type: "Tipos",
    price: "Precio",
    size: "tamaño",
    roomType: "Habitación",
    roomSize: "Tamaño ",
    maxguests: "Invitados máx ",
    book: "Reserva",
    rooms: "Habitaciones",
    overnights: "Noches",
    quantity: "Cantidad",
    total: "Total",
    checkout: "Salida",
    remove: "Borrar",
    noMore: "Disponibilidad máxima",
    only: "Solo",
    available: "queda",
    continueBook: "Continuar reserva",
    back: "Atrás"
};

function getAllElementsWithAttribute() {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute("data-inter") !== null)
            matchingElements.push(allElements[i]);
    }
    return matchingElements;
}

function changeLang(lang) {
    var data = getAllElementsWithAttribute();

    if (data.length == 0)
        return;

    if (lang == "en")				// If language is set to English
    {
        langPack = langPack_EN;
        defaultLang = 'en';
    }
    else {							// If language is set to Spanish
        langPack = langPack_SP;
        defaultLang = 'sp';
    }

    for (var i = 0; i < data.length; i++)	// Handles all elements containing the data-inner attribute
    {										// to switch language
        if (data[i].getAttribute("type") == "text" || data[i].getAttribute("type") == "checkbox") {
            if (data[i].getAttribute("class") == "roomType") 		// Special case - Types input that receives value from checkboxes
            {
                if (data[i].value == langPack_EN[data[i].getAttribute("data-inter")] || 		// If default value of the other language
                    data[i].value == langPack_SP[data[i].getAttribute("data-inter")]) {
                    data[i].value = langPack[data[i].getAttribute("data-inter")];
                }
                else if (data[i].value == langPack_EN['multitypes'] || 						// If is set to 'multiple types'
                    data[i].value == langPack_SP['multitypes']) {
                    data[i].value = langPack['multitypes'];
                }
            }
            else if (data[i].hasAttribute("placeholder")) {
                data[i].setAttribute("placeholder", langPack[data[i].getAttribute("data-inter")])
            }
            else {
                data[i].value = langPack[data[i].getAttribute("data-inter")];
            }

        }
        else {
            data[i].innerHTML = langPack[data[i].getAttribute("data-inter")];
        }
    }

}

$("#language").change(function (e) 	// Language switch
{
    var val = $(e.target).val();
    $("#langSelect select").css("background-image", "url('images/icons/" + val + ".png')");
    changeLang(val);
});

changeLang('en');