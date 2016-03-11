//$(document).ready();

$(document).one('pagecreate', function(){

	// If there is data on localstorage, calls the function that displays the data on the homepage
	showRuns();

	// An event handler for adding a run
	$('#submit-run').on('click', addRun); //when the add runs page button is clicked, do this

	// An event handler for editing a run
	$('#submit-edit').on('click', editRun);

	// A handler for getting CURRENT data when editing a run. Need to be able to get the data of only 
	// the clicked runs' data
	$('#stats').on('click', '#edit-link', setCurrent);

	//A handler for deleting data when the specific delete link is clicked
	$('#stats').on('click', '#delete-run', runDeletor); 

	//Handler for when "Clear Run Milage" button is pushed
	$('#clear-runs').on('click', clearAllRuns);


	/*
	 * showRuns - 
	 * a function that grabs data from localstorage and shows all the runs on the homepage
	 */
	 function showRuns(){

	 	//grab the string of data off localstorage
	 	var dataToDisplay = getRunsObject();

	 	//Check if empty
	 	if(dataToDisplay!='' && dataToDisplay!=null){

	 		// a loop to look at each piece of data in dataToDisplay
	 		for(var i=0;i<dataToDisplay.length;i++){
	 			$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong> '+dataToDisplay[i]["date"]+
	 				'<br><strong>Miles:</strong> '+dataToDisplay[i]["miles"]+'<div class="controls"><a href="#edit" id="edit-link" data-miles="'+dataToDisplay[i]["miles"]+'" data-date="'+dataToDisplay[i]["date"]+'">Edit</a> | <a href="#" id="delete-run" data-miles="'+dataToDisplay[i]["miles"]+'" data-date="'+dataToDisplay[i]["date"]+'" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>');
	 		}

	 		// in order for the list to update, need attach an event handler and specific a function to run when that event occurs
	 		// so on pagecreate
	 		$('#home').on('pagecreate', function() {
	 			$('#stats').listview('refresh');
	 		});

	 	} else {
	 		$('#stats').html('<p>You have no logged data.</p>');
	 	}
	 }


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


	 /* 
	  * editRun-
	  * The function for editing a run
	  */
	 function editRun(){

	 	//Grab current data
	 	currentMiles = localStorage.getItem('currentMiles');
	 	currentDate = localStorage.getItem('currentDate');

	 	// a function that grabs the current runs off of the localstorage
	 	var localstorageRuns = getRunsObject(); // now have sorted objects in this variable

	 	// Loop through all run objects
	 	for(var i = 0;i < localstorageRuns.length;i++){
			if(localstorageRuns[i].miles == currentMiles && localstorageRuns[i].date == currentDate){ //if the date and miles found exactly match what is found...
				localstorageRuns.splice(i,1);//put back into localStorage as a string
			}
			localStorage.setItem('localstorageRuns',JSON.stringify(localstorageRuns));
		}

	 	// Get values from the form. In this case, the variable miles and the date.
	 	var miles = $('#edit-miles').val();
	 	var date = $('#edit-date').val();

	 	// Create the 'run' object to be put into localstorage
	 	var updateRun = {
	 		date: date,
	 		miles: parseFloat(miles) //parseFloat is used here because natively it will save miles as a string. I want it as a decimal number.
	 	};

	 	// Add new values (runs) to the object
	 	localstorageRuns.push(updateRun);
	 	alert("Run Updated!");

	 	// Put the run you just added into localstorage, need to make a string first
	 	localStorage.setItem('localstorageRuns', JSON.stringify(localstorageRuns));

	 	// when a run is added to localstorage, return user to the homepage
	 	window.location.href="index.html";

	 	return false;

	};


	/* 
	  * runDeletor-
	  * The function for deleteing a run
	  */
	 function runDeletor(){

	 	//Set localstorage items into a variable
	  	localStorage.setItem('currentMiles', $(this).data('miles'));
	  	localStorage.setItem('currentDate', $(this).data('date'));

	 	//Get current data
	 	currentMiles = localStorage.getItem('currentMiles');
	 	currentDate = localStorage.getItem('currentDate');

	 	// a function that grabs the current runs off of the localstorage
	 	var localstorageRuns = getRunsObject(); // now have sorted objects in this variable

	 	// Loop through all run objects
	 	for(var i = 0;i < localstorageRuns.length;i++){
			if(localstorageRuns[i].miles == currentMiles && localstorageRuns[i].date == currentDate){ //if the date and miles found exactly match what is found...
				localstorageRuns.splice(i,1);//put back into localStorage as a string
			}
			localStorage.setItem('localstorageRuns',JSON.stringify(localstorageRuns));
		}

		alert("Run deleted.");

	 	// when a run is added to localstorage, return user to the homepage
	 	window.location.href="index.html";

	 	return false;

	};

	 /* clearAllRuns -
	  * clears all runs on localstorage
	  *
	  */
	 function clearAllRuns (){

	 	localStorage.removeItem('localstorageRuns');
	 	$('#stats').html('<p>You have no logged data.</p>');

	 };


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
	  		localstorageRuns.sort(function(a, b){return new Date(b.date) - new Date(a.date)}); //Sort by newest run first
	  	}

	  	// Return the localstorageRuns object
	  	return localstorageRuns;
	 };


	 /*
	  * setCurrent -
	  * function that grabs current data for a particular logged item in the ul
	  */
	  function setCurrent(){

	  	//Set localstorage items into a variable
	  	localStorage.setItem('currentMiles', $(this).data('miles'));
	  	localStorage.setItem('currentDate', $(this).data('date'));

	  	//Insert this values into the form fields for edit page
	  	$('#edit-miles').val(localStorage.getItem('currentMiles'));
	  	$('#edit-date').val(localStorage.getItem('currentDate'));


	  };



});