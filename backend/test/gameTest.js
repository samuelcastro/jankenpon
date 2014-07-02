/**
 * Created by Samuel Castro on 7/2/14.
 */

if ( process.env.NODE_ENV !== 'test' ) {
    console.warn('NODE_ENV=' + process.env.NODE_ENV + ' which might cause problems.');
    process.exit(1);
}

if ( process.env.DB_URI !== 'localhost' ) {
    console.warn('DB_URI=' + process.env.DB_URI + ' which might cause problems.');
    process.exit(1);
}

var should = require('should'),
    expect = require('expect'),
    request = require('superagent'),
    db = require('../connection/connectionFactory');

after(function(done) {
    db.connection.db.dropDatabase(function() {
        db.connection.close(function () {
            console.info('Removing collections...');
            done();
        });
    });
});

describe('Game Test', function() {
    describe('/', function() {
        it('should return status 200, app is running', function(done) {
            request.get('http://localhost:3000/').end(function(err, res) {
                res.should.have.property('status').with.equal(200);
                res.req.should.have.property('path').with.equal('/');
                console.info('App is running');
                done();
            });
        });
    });

    describe('/save', function() {
        it('should to start new game', function(done) {
            var game = {
                "playerName": 'Samuel Castro',
                "playerOption": '2'
            };
            request.post('http://localhost:3000/save').send(game).set('Accept','application/json').end(function(err, res) {
                console.log(res);
                res.should.have.property('status').with.equal(200);
                res.req.should.have.property('path').with.equal('/save');
                console.info('start game');
                done();
            });
        });
     });
});
