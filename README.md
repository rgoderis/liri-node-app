# liri-node-app
Liri is a Node application that allows the user to search information based on input entered to the command line.

Liri searches for song information from spotify, band information from bands in town, and move information from OMDB.  

In addition all results are displayed via logs to the consle and appended to log.txt

### Command Line Commands
- spotify-this-song (searches spotify by song title)
- movie-this (searches OMBD by movie title)
- concert-this (searches concerts by band name)
- do-what-it-says (reads random.txt and runs it's text through spotify-this-song)

### NPM Packages Used
- node-spodify-api (used to access spodify)
- axios (used for the bands in town and OMDB calls)
- moment (used to clean up date in time from bands in town)
