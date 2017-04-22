<<<<<<< HEAD
var keys = require("./keys.js");
//Grabs API keys from file
var request = require("request");
//Grabs Request node construct
var fs = require("fs");
//Grabs fs node construct


var spot = keys.spotifyKeys;
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
            console.log(JSON.parse(response.body));
        }
    });
};

function spotify(){
    var song = process.argv[3];
    var queryURL = 'https://api.spotify.com/v1/search
