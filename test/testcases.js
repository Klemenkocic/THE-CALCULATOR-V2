import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server.js';  // Ensure the correct path and .js extension

chai.should();
chai.use(chaiHttp);

describe('Exercises and Correlations', () => {
  describe('/GET getCorrelations', () => {
    it('it should GET the correlation between Bench Press and Squat', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Bench Press&exercise2=Squat')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Bench Press');
          res.body.should.have.property('exercise2').eql('Squat');
          res.body.should.have.property('correlation');
          done();
        });
    });

    it('it should GET the correlation between Squat and Deadlift', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Squat&exercise2=Deadlift')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Squat');
          res.body.should.have.property('exercise2').eql('Deadlift');
          res.body.should.have.property('correlation');
          done();
        });
    });

    it('it should GET the correlation between Deadlift and Overhead Press', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Deadlift&exercise2=Overhead Press')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Deadlift');
          res.body.should.have.property('exercise2').eql('Overhead Press');
          res.body.should.have.property('correlation');
          done();
        });
    });

    it('it should GET the correlation between Pull Up and Bicep Curl', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Pull Up&exercise2=Bicep Curl')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Pull Up');
          res.body.should.have.property('exercise2').eql('Bicep Curl');
          res.body.should.have.property('correlation');
          done();
        });
    });

    it('it should return 404 if one of the exercises is not found', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Nonexistent&exercise2=Bench Press')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').eql('Exercises not found');
          done();
        });
    });

    it('it should return 400 if exercise1 or exercise2 is not provided', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Bench Press')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').eql('Exercise1 and Exercise2 are required');
          done();
        });
    });

    it('it should GET the correlation between Leg Press and Calf Raise', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Leg Press&exercise2=Calf Raise')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Leg Press');
          res.body.should.have.property('exercise2').eql('Calf Raise');
          res.body.should.have.property('correlation');
          done();
        });
    });

    it('it should GET the correlation between Lat Pulldown and Seated Row', (done) => {
      chai.request(app)
        .get('/getCorrelations?exercise1=Lat Pulldown&exercise2=Seated Row')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exercise1').eql('Lat Pulldown');
          res.body.should.have.property('exercise2').eql('Seated Row');
          res.body.should.have.property('correlation');
          done();
        });
    });
  });
});
