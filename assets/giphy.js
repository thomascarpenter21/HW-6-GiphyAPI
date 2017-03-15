var topics = ["Batman", "Superman", "Luke Cage", "Wolverine", "Iron Man", "Capital America", "Thor", "Hulk", "Deadpool", "Spider Man", "Daredevil", "Doctor Strange", "X Men", "Iron Fist", "Jessica Jones", "Green Lantern", "Flash"];

function alertMovieName() {
    var movieName = $(this).attr("data-name");

    alert(movieName);
}



//this function loops through the array and dynamically creates button when the page load. Currently these buttons appearing or connected to the API. 

function displayMovieButtons() {
    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#superhero-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.attr("data-state", "still")
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#superhero-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-superhero").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var superhero = $("#superhero-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(superhero);

    // Calling renderButtons which handles the processing of our movie array
    displayMovieButtons();

});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".movie", alertMovieName);

// Calling the renderButtons function to display the intial buttons
displayMovieButtons();




$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var movie = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var movieDiv = $("<div class='giphy-img'>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;


                // Creating and storing an image tag
                var movieImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                
                movieImage.attr("src", still);
                movieImage.attr("data-still", still);
                movieImage.attr("data-animate", animated);
                movieImage.attr("data-state", "still")
                movieImage.addClass("superhero-input");
                // Appending the paragraph and image tag to the animalDiv
                movieDiv.append(p);
                movieDiv.append(movieImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#superhero-giphy").prepend(movieDiv);
            }
        });
});

$("#superhero-giphy").on("click", ".superhero-input", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

    console.log($(this).children("img").attr('src'));

    //var pause = $(this).children("img").attr('src')

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





//displayMovieInfo("iron man");
//})
