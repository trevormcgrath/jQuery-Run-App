//$(document).ready();

$(document).one('pagecreate', function(){

	// Adding a run handler
	$('#submit-run').on('click', addRun); //when the add runs page button is clicked, do this function

	/* addRun -
	 * The function for adding a run object
	 */
	 function addRun(){
	 	// Get values from the form. In this case, the variable miles and the date.
	 	var miles = $('#add-miles').val();
	 	var date = $('#add-date').val();

	 	// Create the 'run' object to be put into localstorage
	 	var run = {
	 		date: date,
	 		miles: parseFloat(miles) //parseFloat is used here because natively it will save miles as a string. I want it as a decimal number.
	 	};

	 	// a function that grabs the current runs off of the localstorage
	 	var localstorageRuns = getRunsObject(); // now have sorted objects in this variable

	 	// Add new values (runs) to the object
	 	localstorageRuns.push(run);
	 	alert("Run Added!");

	 	// Put the run you just added into localstorage, need to make a string first
	 	localStorage.setItem('localstorageRuns', JSON.stringify(localstorageRuns));

	 	// when a run is added to localstorage, return user to the homepage
	 	window.location.href="index.html";

	 	return false;

	 }

	 /* getRunsObject -
	  * Logic for above function that grabs current runs off of the localstorage
	  *
	  */
	 function getRunsObject (){

	  	// Set localstorageRuns array
	  	var localstorageRuns = new Array();

	  	// Get current runs off of local storage
	  	var currentRuns = localStorage.getItem('localstorageRuns');

	  	// Check to see if what currentRuns pulls off of localstorage is empty or not
	  	if(currentRuns!=null){ // So, if what is pulled off IS NOT empty, then...
	  		var localstorageRuns = JSON.parse(currentRuns); //turn what is grabbed into JSON data
	  	}

	  	// Return the localstorageRuns object
	  	// Sort by newest date first
	  	return localstorageRuns.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
	 }

});