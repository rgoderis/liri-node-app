require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
 
 
var whatToDo = process.argv[2];
var userInput = process.argv[3];

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
        // console.log(response.data[0].offers)
        // display name of venue
        console.log(response.data[0].venue.name)
        // venue location
        console.log(response.data[0].venue.city + ", "+ response.data[0].venue.region + ". " + response.data[0].venue.country)
        // date of event
        console.log(response.data[0].datetime)
    })
    // check for error
    .catch(function(err){
        if(err){
            console.log(err)
        }
    })
}

function movieThis(){

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
        movieThis();
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}


// { offers:
//    [ { type: 'Tickets',
//        url:
//         'https://www.bandsintown.com/t/1016572846?app_id=codingbootcamp&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket',
//        status: 'available' } ],
//   venue:
//    { name: 'North Island Credit Union Ampitheatre',
//      country: 'United States',
//      region: 'CA',
//      city: 'Chula Vista',
//      latitude: '32.589367',
//      longitude: '-117.00653' },
//   datetime: '2019-10-10T19:00:00',
//   on_sale_datetime: '2019-08-09T10:00:00',
//   description:
//    'Rain or shine. Every ticket includes parking in the unpaved lots. Upgrades are available for premier parking in the paved lots and closer to the venue entrance. Parking Gates open at 4PM on day of show.',
//   lineup: [ 'Bush' ],
//   id: '1016572846',
//   artist_id: '680',
//   url:
//    'https://www.bandsintown.com/e/1016572846?app_id=codingbootcamp&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event' }
