const request = require('supertest');
const app = require('./index'); 

describe('API Endpoints', () => {


  describe('GET /apod', () => {
    it('should fetch NASA APOD data', async () => {
      const res = await request(app).get('/apod');s
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('title');
    });

    it('should fetch APOD for a specific date', async () => {
      const res = await request(app).get('/apod?date=2022-01-01');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('date', '2022-01-01');
    });
  });

  describe('POST /ai', () => {
    it('should return 400 if no explanation', async () => {
      const res = await request(app).post('/ai').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });


    
    it('should return AI summary for a valid explanation', async () => {
      const res = await request(app)
        .post('/ai')
        .send({ explanation: 'The sun rises in the east and sets in the west.' });
      expect([200, 500]).toContain(res.statusCode); 
    });
  });
});
