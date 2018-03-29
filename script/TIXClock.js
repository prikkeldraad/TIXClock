// number columns
var last_1 = 0;
var last_2 = 0;
var last_3 = 0;
var last_4 = 0;
var last_5 = 0;
var last_6 = 0;

// shortcut
function gE(id) {
	return document.getElementById(id);
}

/**
* Return random color for a column
* @return Array
*/
function getColor() {
	colors = new Array(
		'red',
		'blue',
		'green',
		'orange'
	);
	
	rnd = getRandom(0, colors.length);
	return colors[rnd];
}

/**
* Update the clock
*/
function updateClock() {
	tm = new Date();
	hours = tm.getHours().toString();
	minutes = tm.getMinutes().toString();
	secondes = tm.getSeconds().toString();

	if (hours.length > 1) {
		first = hours.substring(0, 1);
		second = hours.substring(1, 2);
	} else {
		first = 0;
		second = hours;
	}
	
	if (minutes.length > 1) {
		third = minutes.substring(0, 1);
		fourth = minutes.substring(1, 2);
	} else {
		third = 0;
		fourth = minutes;
	}

	if (secondes.length > 1) {
		fifth = secondes.substring(0, 1);
		sixt = secondes.substring(1, 2);
	} else {
		fifth = 0;
		sixt = secondes;
	}

	updateNumber(1, first, 3);
	updateNumber(2, second, 9);
	updateNumber(3, third, 6);
	updateNumber(4, fourth, 9);
	updateNumber(5, fifth, 6);
	updateNumber(6, sixt, 9);
	
	setTimeout('updateClock()', 1000);
}

/**
* Update one column and set the correct number of blocks
*
* @param String column identifier
* @param Integer number to set the number of blocks to
* @param Integer max number of blocks in the column
* @param String columncolor
*/
function updateNumber(id, cijfer, max, kl) {
	var lid = 'last_' + id.toString();

	if (eval(lid) == cijfer) {
		return;
	}

	// clear number first
	for (var i = 0; i < max; ++i) {
		var nid = id.toString() + '_' + i;
		var cel = gE(nid);		
		cel.style.backgroundColor = 'white';
	}

	// get new color
	var kl = getColor();

	var range = new Array();

	if (cijfer > 0)
		range = getRandomRange(0, max, cijfer);

	for (var i = 0; i < range.length; i++) {
		var nid = id.toString() + '_' + range[i].toString();
		var cel = gE(nid);		
		cel.style.backgroundColor = kl;

		// set and update last set number
		eval(lid + '= ' + cijfer);
	}

}

/**
* Get a random number between a lowest and highest value
* 
* @param Integer lowest number
* @param Integer highest number
*/
function getRandom(low, high) {
	var high, low;
	return Math.floor(Math.random() * high) + low;
}

/**
* Get a list of random numbers
*
* @param Integer lowest number
* @param Integer highest number
* @param Integer number of random numbers to return
*/
function getRandomRange(low, high, number) {
	var low, high, number;
	var range = new Array();

	// check
	if ((high - low) < number)
		return false;

	var i = 0;
	while (i < (number)) {
		rn = getRandom(low, high);

		if (range.in_array(rn))
			continue;

		range[i] = rn;
		++i;
	}

	return range;
}

/**
* in_array -- Checks if a value exists in an array
*
* Searches haystack for needle and returns TRUE if it is found in the array, FALSE otherwise. 
* If the third parameter strict is set to TRUE then the in_array() function will also check the types of the needle in the haystack. 
* Note: If needle is a string, the comparison is done in a case-sensitive manner. 
* 
* @param mixed needle
* @param Array haystack
* @param Boolean strict false
* @author Mick <mick@vandermostvanspijk.nl>
* @copyright LGPL
* @todo make needle so that it might be an array
* @todo make strict working
*/
function in_array(needle, haystack, strict) {
	var needle = needle;
	var haystack = haystack;
	var strict = strict || false;

	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i] == needle) {
			return true;
		}
	}

	return false;
}

// add to array class
function inArray(needle, strict) {
	return in_array(needle, this, strict);
}
Array.prototype.in_array = inArray;

// page loader
function load() {
	 updateClock();
}

// register event
window.onload = load;