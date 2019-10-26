require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
 
const whatToDo = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

// function to retrieve information from spotify
spotifyThis = input=>{ spotify
    .search({ type: 'track', query: input })
    .then(response=> {
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
            fs.appendFile("log.txt", input + ": "+ "Song Name: "+ response.tracks.items[i].name + " Artist Name: "+response.tracks.items[i].artists[0].name+" Preview Link: "+response.tracks.items[i].external_urls.spotify+ " Album: "+response.tracks.items[i].album.name + "\n", err=>{
                if(err){
                    console.log(err);
                }
            });
        }
    })
    .catch(err=> console.log(err));
}

// function to retrieve information from bandsintown
concertThis = input=>{
    // axios call to bandsintown
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(response =>{
        if(response.data.length === 0){
            console.log("No results were found, please try a different band");
        } else {
            for(var i = 0; i < response.data.length; i++){
                // display name of venue
                console.log("Venue Name: " + JSON.stringify(response.data[i].venue.name));
                // venue location
                console.log("Venue Location: " + JSON.stringify(response.data[i].venue.city + ", "+ response.data[i].venue.region + ". " + response.data[i].venue.country));
                // date of event
                let momentDate = moment(response.data[i].datetime).format('LLL');
                console.log("Date: "+ momentDate);
                fs.appendFile("log.txt",input + ": "+  "Venue Name: " + response.data[i].venue.name + " Venue Location: " + response.data[i].venue.city + ", "+ response.data[i].venue.region + ". " + response.data[i].venue.country + " Date: "+ momentDate + "\n", err=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
        }
    })
    // check for error
    .catch(err=>{
        if(err){
            console.log(err);
        }
    });
}

// function for movie this
movieThis = input=>{
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(response=>{
        if(response.data.Response === "False"){
            console.log(response.data.Error);
            fs.appendFile("log.txt", response.data.Error, err=>{
                if(err){
                    console.log(err);
                }
            });
        } else {
            // * Title of the movie.
            console.log("Movie Title: " + response.data.Title);
            // * Year the movie came out.
            console.log("Release Date: " + response.data.Released);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log("Produced In: " + response.data.Country);
            // * Language of the movie.
            console.log("Language: " + response.data.Language);
            // * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            // * Actors in the movie.
            console.log("Staring: " + response.data.Actors);
            fs.appendFile("log.txt",input + ": "+ "Movie Title: " +  response.data.Title + " Release Date: " + response.data.Released + " IMDB Rating: " + response.data.Ratings[0].Value +" Rotten Tomato Rating: " +  response.data.Ratings[1].Value +" Produced In: " +  response.data.Country +" Language: " +  response.data.Language + " Plot: " + response.data.Plot + " Staring: " + response.data.Actors + "\n", err=>{
                if(err){
                    console.log(err);
                }
            });
        }
    })
    // check for error
    .catch(function(err){
        if(err){
            console.log(err);
        }
    })
}
doWhatItSays= ()=>{
    fs.readFile("random.txt", "utf8", (err, data)=>{
        if(err){
            console.log(err);
        } else {
            var dataArr = data.split(",");
            spotifyThis(dataArr[1]);
        }
    });
}

switch(whatToDo){
    case "spotify-this-song":
        // checks to see if the user enters a song name
        if(process.argv.length === 3){
            fs.appendFile("log.txt", "spotify-this-song 'The Sign': ", err=>{
                if(err){
                    console.log(err);
                }
            });
            spotify
            // displays default song info of The Sign by Ace of Base
            .search({type: 'track', query: 'The Sign'})
            .then(response=> {
                // name of song
                let song = response.tracks.items[5].name;
                console.log("Song Name: "+ song);
                // artist name
                let artist = response.tracks.items[5].artists[0].name;
                console.log("Artist Name: "+artist);
                // A preview link of the song from Spotify
                let preview = response.tracks.items[5].external_urls.spotify;
                console.log("Preview Link: "+ preview);
                // The album that the song is from
                let album = response.tracks.items[5].album.name;
                console.log("Album: "+ album);
                fs.appendFile("log.txt", "Song Name: "+ song + " Artist Name: "+ artist + " Preview Link: "+ preview + " Album: "+ album + "\n", err=>{
                    if(err){
                        console.log(err);
                    }
                });
            })
            .catch(err=> {
              console.log(err);
            });
        }else{
            fs.appendFile("log.txt", "spotify-this-song: " + userInput + ": \n", err=>{
                if(err){
                    console.log(err);
                }
            })
            spotifyThis(userInput);
        }
        break;
    case "movie-this":
        if(process.argv.length === 3){
            fs.appendFile("log.txt", "movie-this: Mr. Nobody: ", err=>{
                if(err){
                    console.log(err);
                }
            })
            movieThis("Mr. Nobody");
        } else {
            fs.appendFile("log.txt", "movie-this: ", err=>{
                if(err){
                    console.log(err);
                }
            })
            movieThis(userInput);
        }
        break;
    case "concert-this":
        fs.appendFile("log.txt", "concert-this: \n", err=>{
            if(err){
                console.log(err);
            }
        })
        concertThis(userInput);
        break;
    case "do-what-it-says":
        fs.appendFile("log.txt", "do-what-it-says: \n", err=>{
            if(err){
                console.log(err);
            }
        });
        doWhatItSays();
        break;
}