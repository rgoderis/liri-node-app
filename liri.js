require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
 
 
var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

// function to retrieve information from spotify
function spotifyThis(input){
    spotify
        .search({ type: 'track', query: input })
        .then(function(response) {
            // loops through spotify songs to display information
            for(var i = 0; i < response.tracks.items.length; i++){
                // name of song
                console.log("Song Name: "+JSON.stringify(response.tracks.items[i].name, null, 2));
                // artist name
                console.log("Artist Name: "+JSON.stringify(response.tracks.items[i].artists[0].name, null, 2));
                // A preview link of the song from Spotify
                console.log("Preview Link: "+JSON.stringify(response.tracks.items[i].external_urls.spotify, null, 2));
                // The album that the song is from
                console.log("Album: "+JSON.stringify(response.tracks.items[i].album.name, null, 2));
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

// function to retrieve information from bandsintown
function concertThis(input){
    // axios call to bandsintown
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
    function(response){
        if(response.data.length === 0){
            console.log("No results were found, please try a different band")
        } else {
            for(var i = 0; i < response.data.length; i++){
                // display name of venue
                console.log("Venue Name: " + JSON.stringify(response.data[i].venue.name))
                // venue location
                console.log("Venue Location: " + JSON.stringify(response.data[i].venue.city + ", "+ response.data[i].venue.region + ". " + response.data[i].venue.country))
                // date of event
                console.log("Date: "+ JSON.stringify(response.data[i].datetime))
            }
        }
    })
    // check for error
    .catch(function(err){
        if(err){
            console.log(err)
        }
    })
}

// function for movie this
function movieThis(input){
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(function(response){
        if(response.data.Response === "False"){
            console.log(response.data.Error)
        } else {
            // * Title of the movie.
            console.log("Movie Title: " + response.data.Title)
            // * Year the movie came out.
            console.log("Release Date: " + response.data.Released)
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value)
            // * Country where the movie was produced.
            console.log("Produced In: " + response.data.Country)
            // * Language of the movie.
            console.log("Language: " + response.data.Language)
            // * Plot of the movie.
            console.log("Plot: " + response.data.Plot)
            // * Actors in the movie.
            console.log("Staring: " + response.data.Actors)
        }
    })
    // check for error
    .catch(function(err){
        if(err){
            console.log(err)
        }
    })
}
function doWhatItSays(){

}

switch(whatToDo){
    case "spotify-this-song":
        // checks to see if the user enters a song name
        if(process.argv.length === 3){
            spotify
            // displays default song info of The Sign by Ace of Base
            .search({type: 'track', query: 'The Sign'})
            .then(function(response) {
                // name of song
                console.log("Song Name: "+JSON.stringify(response.tracks.items[5].name, null, 2));
                // artist name
                console.log("Artist Name: "+JSON.stringify(response.tracks.items[5].artists[0].name, null, 2));
                // A preview link of the song from Spotify
                console.log("Preview Link: "+JSON.stringify(response.tracks.items[5].external_urls.spotify, null, 2));
                // The album that the song is from
                console.log("Album: "+JSON.stringify(response.tracks.items[5].album.name, null, 2));
            })
            .catch(function(err) {
              console.log(err);
            });
        }else{
            spotifyThis(userInput);
        }
        break;
    case "movie-this":
        if(process.argv.length === 3){
            movieThis("Mr. Nobody")
        } else {
            movieThis(userInput);
        }
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}