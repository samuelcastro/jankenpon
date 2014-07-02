/**
 * Created by Samuel Castro on 7/2/14.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema for Games
 * @type {Schema}
 */
var GameSchema = new Schema({
    "playerName": { type: String, index: true },
    "playerOption": String,
    "serverOption": String,
    "winner": String,
    "date": Date
}, { collection: 'game'});

/**
 * Save new Game
 * @param game
 * @param cb
 */
GameSchema.statics.save = function(game, cb) {
    game.save(function(err, result) {
        if(err) {
            cb(err,{ status: "err", result: result });
        } else {
            cb(err,{ status: "OK", result: result });
        }
    });
};

/**
 * Find all Games
 * @param cb
 */
GameSchema.statics.findAll = function (cb) {
    this.find(function(err, result) {
        if(err) {
            cb(err,{ status: "err", result: result });
        } else {
            cb(err,{ status: "OK", result: result });
        }
    });
};

/**
 * Exporting Schema
 */
mongoose.model('game', GameSchema);
