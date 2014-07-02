/**
 * Created by samuel on 7/2/14.
 */

var mongoose = require('mongoose'),
    Game = mongoose.model('game'),
    STONE = 0,
    PAPER = 1,
    SCISSORS = 2;


/**
 * Save new Game
 * @param req
 * @param res
 */
exports.save = function(req, res) {
    console.log(req.param('playerName'));
    var serverOption = randomServer();
     var game = new Game({
        "playerName": req.param('playerName'),
        "playerOption": req.param('playerOption'),
        "serverOption": serverOption,
        "winner": playGame(req.param('playerOption'), serverOption),
        "date": new Date()
    });
    game.save(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
};

/**
 * Execute random server
 */
var randomServer = function() {
    return Math.floor((Math.random() * 3));
};

/**
 * Execute play game
 */
var playGame = function(playerOption, serverOption) {
    console.log(playerOption);
    console.log(serverOption);
    console.log('STONE ' + STONE);
    console.log('PAPER ' + PAPER);
    console.log('SCISSORS' + SCISSORS);

    var winner = 'none';

    switch (serverOption) {
        case STONE : winner = playerOption == STONE ? 'none' : playerOption == PAPER ? 'player' : playerOption == SCISSORS ? 'server' : 'none';
            break;
        case PAPER : winner = playerOption == STONE ? 'server' : playerOption == PAPER ? 'none' : playerOption == SCISSORS ? 'player' : 'none';
            break;
        case SCISSORS : winner = playerOption == STONE ? 'player' : playerOption == PAPER ? 'server' : playerOption == SCISSORS ? 'none' : 'none';
            break;
    }
    console.log(winner);
    return winner;
};


/**
 * Find all Games
 * @param req
 * @param res
 */
exports.findAll = function(req, res) {
    Game.findAll(function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);

        }
    });
};

