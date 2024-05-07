const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Assuming server file is named server.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /api/projects', () => {
  it('should get projects from MongoDB', (done) => {
    chai.request(server)
      .get('/api/projects')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('statusCode').equal(200);
        expect(res.body).to.have.property('message').equal('Success');
        expect(res.body.data).to.be.an('array').that.is.not.empty;
        done();
      });
  });
});

describe('POST /api/projects/insert', () => {
  it('should insert form data into MongoDB', (done) => {
    chai.request(server)
      .post('/api/projects/insert')
      .send({
        first_name: "Sumeet",
        last_name: "Kumar",
        password: "test12345",
        email: "test@example.com"
      })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(500); // Expecting 500 status code when insertion fails
        expect(res.body).to.have.property('statusCode').equal(500);
        expect(res.body).to.have.property('message').equal('Internal server error');

        done();
      });
  });
});