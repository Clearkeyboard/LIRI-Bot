var keys = require("./keys.js");
//Grabs API keys from file
var request = require("request");
//Grabs Request node construct
var fs = require("fs");
//Grabs fs node construct
var twitter = require('twitter');
//Grabs Twitter node construct
var spot = keys.spotifyKeys;
var twitt = keys.twitterKeys;
var input = process.argv[2];


//Switch case for querys
switch (input){
    case "my-tweets":
    twitter();
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
function twitter(){
    var client = new twitter(keys.twitterKeys);
    //stores API keys in a variable or use with function

    client.get('search/tweets', {q:'clearkeyboard'}, function(error, tweets, response) {
        if(error) throw error;
        console.log(tweets);
        console.log(response);
    });
}