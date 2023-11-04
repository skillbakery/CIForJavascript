const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./main');

chai.use(chaiHttp);

describe('Express app', () => {
  // Test the "/" endpoint
  describe('GET /', () => {
    it('should return all data', async () => {
      const res = await chai.request(app).get('/');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  // Test the "//:guid" endpoint
  describe('GET /:guid', () => {
    it('should return a single item of data', async () => {
      const res =
        await chai.request(app).get('d9687f41-e2e4-4a59-8ad3-6c29d925e12b');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.guid).to.equal('d9687f41-e2e4-4a59-8ad3-6c29d925e12b');
    });

    it('should return a 404 status code for an invalid GUID', async () => {
      const res = await chai.request(app).get('/invalid-guid');
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('Item not found');
    });
  });
});

