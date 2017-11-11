var MovieDB = require('moviedb')('6733df4b76abb7884b0195f630afb642');
var inquirer = require('inquirer');


function userPrompt(cb) {
    inquirer.prompt([{
       
        type: 'input',
        message: 'Please type in ONLY the first name of your favorite Actor please.',
        name: 'actor'
    }]).then(function(user) {
        var actor = user.actor;
        getActorId(actor, function(actorID) {
            getMovies(actorID, function() {
                cb();
            });
        });
    });
}




function getMovies(actorID, cb) {
    var moviesArr = [];
    MovieDB.discoverMovie({ with_cast: actorID }, function(err, res) {
        if (err) {
            console.log('I apologize, but we are having some type of problem at this time!');
            return;
        }
        var results = res.results;
        for (var i = 0; i < results.length; i++) {
            var title = results[i].title;
           
            if (/^[a-zA-Z ]*$/g.test(title)) {
                moviesArr.push(title);
            }
        }
        var randomNumber = Math.floor(Math.random() * moviesArr.length);
        randomNumber -= 1;
        var chosenWord = moviesArr[randomNumber];
        module.exports.chosenWord = chosenWord;
        cb();
    });
}


function getActorId(actor, cb) {
    MovieDB.searchPerson({ query: actor }, function(err, res) {
        if (err) {
             
            console.log('I apologize, but we are having some type of problem at this time!');
            return;
        }
        if (res.results.length > 0) {
            var actorID = res.results[0].id;
            cb(actorID);
        } else {
            console.log('That actor is either not in our database or you are messing with me. Which one is it?');
        }
    });
}

 
module.exports = {
    userPrompt
};