//  FOLLOWING 2 FUNCTIONS MAKE SURE THE RECIPES ON RECIPE PAGES FLY IN FROM THE RIGHT
//JQUERY
$(function () {
    var $blocks = $('.animBlock.notViewed');
    var $window = $(window);

    $window.on('scroll', function (e) {
        $blocks.each(function (i, elem) {
            if ($(this).hasClass('viewed'))
                return;

            isScrolledIntoView($(this));
        });
    });
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemOffset = 0;

    if (elem.data('offset') != undefined) {
        elemOffset = elem.data('offset');
    }
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    if (elemOffset != 0) { // custom offset is updated based on scrolling direction
        if (docViewTop - elemTop >= 0) {
            // scrolling up from bottom
            elemTop = $(elem).offset().top + elemOffset;
        } else {
            // scrolling down from top
            elemBottom = elemTop + $(elem).height() - elemOffset
        }
    }

    if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
        // once an element is visible exchange the classes
        $(elem).removeClass('notViewed').addClass('viewed');

        var animElemsLeft = $('.animBlock.notViewed').length;
        if (animElemsLeft == 0) {
            // with no animated elements left debind the scroll event
            $(window).off('scroll');
        }
    }
}

// FOLLOWING FUNCTION GIVES THE USER THE OPTION TO ADD ANOTHER INGREDIENT WITH A UNIQUE ID

var ingredientObject = [];
var ingredientId = 0;

function addIngredient () {
    ingredientId++; // increase id by 1unitsOfVolume
    let uVolume = document.querySelector('#unitsOfVolume').value; //take measuring volume
    let mUnit = document.querySelector('#measuringUnit').value; // take measuring unit
    let iName= document.querySelector('#ingredientName').value; // take ingredient name
    let x = document.querySelector('.ingredientList'); // selects the div where the ingredients will be added to

    let z = `${uVolume} ${mUnit} ${iName}`;
    ingredientObject.push(z);

    // inserts ingredient field
    x.insertAdjacentHTML("beforeend",                     
    `<div id="ingredient${ingredientId}">
        <input type="number" id="unitsOfVolume${ingredientId}" name="unitsOfVolume" min="1" required>
        <select name="measuringUnit" id="measuringUnit${ingredientId}" required>
            <option class="unitsValue" value="gram">gram</option>
            <option class="unitsValue" value="kg">kg</option>
            <option class="unitsValue" value="tsp">tsp</option>
            <option class="unitsValue" value="tbsp">tbsp</option>
            <option class="unitsValue" value="pinch">pinch</option>
            <option class="unitsValue" value="liter">liter</option>
            <option class="unitsValue" value="ml">ml</option>
        </select>
        <input type="text" id="ingredientName${ingredientId}" name="ingredientName" required><button onclick="deleteIngredient(${ingredientId})">X</button><br>
        </div>`)
    // pastes entered values into created ingredient field
    document.querySelector(`#unitsOfVolume${ingredientId}`).value = uVolume;
    document.querySelector(`#measuringUnit${ingredientId}`).value = mUnit;
    document.querySelector(`#ingredientName${ingredientId}`).value = iName;
    // clears input fields
    uVolume = document.querySelector('#unitsOfVolume').value = "";
    iName= document.querySelector('#ingredientName').value = "";

}

// DELETES SELECTED INGREDIENT DIV BASED ON GLOBAL VAR ingredientId
function deleteIngredient (x) {
    let selectRemove = document.querySelector(`#ingredient${x}`);
    selectRemove.remove();
}

