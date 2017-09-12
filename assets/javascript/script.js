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
	  a.addClass("car");
	  // Added a data-attribute
	  a.attr("data-name", cars[i]);
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
	var movie = $("#car-input").val().trim();

	// The movie from the textbox is then added to our array
	cars.push(movie);

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();

});

function displayCarGifs() {

	$("#carDisplay").empty();

	var car = $(this).attr("data-name");
	console.log(car);
	// var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=e5beba6b105b4b1dab5168b116166278&tag=" + car +'"';
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

		var imageUrl = response.data[i].images.original.url;
		console.log("var imageUrl = " + imageUrl);

		var carImage = $("<img>");
		carImage.attr("src", imageUrl);
		carImage.attr("alt", "car image");
		console.log("carImage is " + carImage);

		carDiv.append(carImage);

		$("#carDisplay").prepend(carDiv);
	}
	  // $("#movie-rating").html("<p> Movie Rating: " + response.Rated + "</p>");
	  // $("#movie-actors").html("<p> Movie Actors: " + response.Actors + "</p>");
	  // $("#movie-plot").html("<p> Movie Plot: " + response.Plot + "</p>");
	  // $("#movie-poster").html("<img src=" + response.Poster + ">");                        
	  // YOUR CODE GOES HERE!!!

	});

}

// Adding click event listeners to all elements with a class of "car"
$(document).on("click", ".car", displayCarGifs);
console.log(displayCarGifs + "clicked");

// Call the initial Function
renderButtons();