/**
 * Created by samuel on 7/2/14.
 */

module.exports = function(app) {

    app.get('/stats', app.controllers.game.findAll);

    app.post('/save', app.controllers.game.save);

};





