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
        .search({ type: 'track', query: input })
        .then(function(response) {
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
function concertThis(){

}
function movieThis(){

}
function doWhatItSays(){

}

switch(whatToDo){
    case "spotify-this-song":
        if(process.argv.length === 3){
            spotify
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
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

