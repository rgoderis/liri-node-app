require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
 
 
var whatToDo = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input){
    spotify
        .search({ type: 'track', query: input, limit:1 })
        .then(function(response) {
            // name of song
            console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
            // artist name
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
            // A preview link of the song from Spotify
            console.log(JSON.stringify(response.tracks.items[0].external_urls.spotify, null, 2));
            // The album that the song is from
            console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
        })
        .catch(function(err) {
            console.log(err);
        });
}
function concertThis(){

}
function movieThis(){

}
function doWhatItSays(){

}

switch(whatToDo){
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}