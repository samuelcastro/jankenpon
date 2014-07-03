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
        "winner": playGame({player: req.param('playerOption'), server: serverOption}),
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
var playGame = function(options) {
    var winner = 'none';

    switch (options.server) {
        case STONE : winner = options.player == STONE ? 'none' : options.player == PAPER ? 'player' : options.player == SCISSORS ? 'server' : 'none';
            break;
        case PAPER : winner = options.player == STONE ? 'server' : options.player == PAPER ? 'none' : options.player == SCISSORS ? 'player' : 'none';
            break;
        case SCISSORS : winner = options.player == STONE ? 'player' : options.player == PAPER ? 'server' : options.player == SCISSORS ? 'none' : 'none';
            break;
    }
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

