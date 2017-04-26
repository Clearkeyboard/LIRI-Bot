
var keys = require("./keys.js");
//Grabs API keys from file
var request = require("request");
//Grabs Request node construct
var fs = require("fs");
//Grabs fs node construct

var input = process.argv[2];

//Switch case for querys
switch (input){
    case "my-tweets":
    tweeting();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    fsRandom(); 
    break;
}
//Twitter query grabbing 20 tweets from user
function tweeting(){
    var twitter = require('twitter');
//Grabs Twitter node construct
    var twitt = keys.twitterKeys;
//Grabs Twitter keys Object
    var client = new twitter(twitt);
    var params = {screen_name: 'Clearkeyboard', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
        //forEach loop that 
        console.log(' ');
        console.log('================ My Tweets ================');
        tweets.forEach(function(obj) {
          console.log('--------------------------');
          console.log('Time: ' + obj.created_at);
          console.log('Tweet: ' + obj.text);
          console.log('--------------------------');
          console.log(' ');
        });
        console.log('===========================================');
        console.log(' ');
        }else{console.log("Twitter User Not Found or No Tweets to show")}
    });
};
//Grabs spotify track info
function spotify(){
    //Spotifiy API keys
    var spot = keys.spotifyKeys;
    //Argument for song query
    var song = process.argv[3];
    //Spotify Node Construct
    var spotify = require('spotify');

    //Spotify search NPM
    spotify.search({type:'track', query: song}, function(err, data){
        if(!error){
        var artist = data.tracks.items[0].artists[0].name;
        var title = data.tracks.items[0].name;
        var album = data.tracks.items[0].album.name;
        console.log(' ');
        console.log('================ Spotify This ================');
        console.log("Artist: " + artist);
        console.log("Song: " + title);
        console.log("Album: " + album);
        console.log('===========================================');
        console.log(' ');
        }else{console.log("Spotify Error or No Track Found")}
    })
}

// OMDb API function
function movie(){
    var query = process.argv[3];
    var queryURL = "http://www.omdbapi.com/?t=" + query + "&r=json&tomatoes=true";
    request(queryURL, function (error, response, data){
         if (!error && response.statusCode === 200) {
             //Variables for storing nodes of JSON object. Not really necessary
            var title = JSON.parse(data).Title;
            var year = "Released: " + JSON.parse(data).Year;
            var imdb = "IMDB Rating: " + JSON.parse(data).imdbRating;
            var country = "Produced in " + JSON.parse(data).Country;
            var language = "Languages: " + JSON.parse(data).Language;
            var plot = "Plot Synopsis " + JSON.parse(data).Plot;
            var actors = "Starring: " + JSON.parse(data).Actors;
            var tomato = "More Info: " + JSON.parse(data).tomatoURL;
            //Prints JSON nodes
            console.log(' ');
            console.log('================ Movie This ================');
            console.log(title);
            console.log("Released: " + year);
            console.log("IMDB Rating: " + imdb);
            console.log("Produced in: " + country);
            console.log("Available in: " + language);
            console.log("Synopsis: " + plot);
            console.log("Starring: " + actors);
            console.log("More Info: " + tomato);
            console.log('===========================================');
            console.log(' ');
    }else{console.log(error)}
});
}
function fsRandom() {

    fs.readFile("random.txt", "utf8", function(err, random_txt) {

        var ran_txt = random_txt.split(',');
        var func = ran_txt[0];
        var param = ran_txt[1];

        console.log("PARAM: ", param);

        switch (func) {
            case "my-tweets":
                tweeting();
                break;
            case "spotify-this-song":
                spotify(param);
                break;
            case "movie-this":
                movie(param);
                break;
        }
    });
}
