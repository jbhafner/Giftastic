const CAR_PARAMETER = {
	limit: 10
} 

var cars = ["Honda", "Mazda", "Range Rover", "Lexus", "Pontiac", "Saab", "Volvo", "Chrysler"];
console.log(cars);

// Function for displaying car buttons
function renderButtons() {

	// Deletes the movies prior to adding new movies
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttons-view").empty();

	// Loops through the array of movies
	for (var i = 0; i < cars.length; i++) {

	  // Then dynamicaly generates buttons for each movie in the array
	  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	  var a = $("<button>");
	  // Adds a class of movie to our button
	  a.addClass("carButton");
	  // Added a data-attribute
	  a.attr("data-name", cars[i]);
	  // // add bootstrap styling to buttons
	  // a.attr("class","btn btn-primary");
	  // Provided the initial button text
	  a.text(cars[i]);
	  // Added the button to the buttons-view div
	  $("#buttons-view").append(a);
	}
}

// This function adds car buttons
$("#add-car").on("click", function(event) {
	event.preventDefault();
	// This line of code will grab the input from the textbox
	var newCarButton = $("#car-input").val().trim();

	// The new car from the textbox is then added to our array
	cars.push(newCarButton);

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();

});

function displayCarGifs() {

	$("#carDisplay").empty();

	var car = $(this).attr("data-name");
	console.log(car);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	car + "&api_key=e5beba6b105b4b1dab5168b116166278&limit=" + CAR_PARAMETER.limit;
	console.log("queryURL = " + queryURL);
	// Creates AJAX call for the specific movie button being clicked
	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);
	  console.log("ajax request here");
	  console.log(car);
	  console.log("response.data.length = "+response.data.length);

	for (var i=0; i<response.data.length; i++)  {
		console.log("i = " + i);
		console.log(response.data[i].images.original.url);

		// create div to hold cars
		var carDiv = $("<div class='car'>")

		var rating = $("<p>").html("Rating: " + response.data[i].rating);

		carDiv.append(rating);

		var imageUrlGif = response.data[i].images.fixed_height_small.url;
		var imageUrlStill = response.data[i].images.fixed_height_small_still.url;
		console.log("var imageUrlGif = " + imageUrlGif);
		console.log("var imageUrlStill = " + imageUrlStill);

		var carImage = $("<img>");
		carImage.attr("src", imageUrlGif);
		carImage.attr("data-still", imageUrlStill);
		carImage.attr("data-animate", imageUrlGif);
		carImage.attr("alt", "car image");
		carImage.attr("data-state","animate");
		carImage.attr("class", "carGif");		
		console.log("carImage is " + carImage);

		carDiv.append(carImage);

		$("#carDisplay").prepend(carDiv);
	}

	});

}

// Adding click event listeners to all elements with a class of "carButton"
$(document).on("click", ".carButton", displayCarGifs);
console.log(displayCarGifs + "clicked");

// Event listener for click event on Gifs (still/animate)

$(document).on("click", ".carGif",function() {
  console.log("gif clicked");	
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// Call the initial Function
renderButtons();

