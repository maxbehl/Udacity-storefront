import app from '../../server';
import supertest from 'supertest';
import { UserDB, User } from '../../models/user';

const request = supertest(app);

/*
- Index [token required]: '/users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: '/users' [POST]
*/
const store = new UserDB();
let token: string;

describe('Testing User endpoints', () => {
  const testuser1: User = {
    id: '1',
    firstname: 'Max',
    lastname: 'Mustermann',
    password: 'password123'
  };

  const testuser2: User = {
    id: '2',
    firstname: 'Michael',
    lastname: 'Mustermann',
    password: 'password456'
  };

  //post user to get token from response body to use in tests
  beforeAll(async () => {
    const userRequest = await request
      .post('/users')
      .send(testuser2)
      .set('Accept', 'application/json');

    token = userRequest.body;
  });

  it('CREATE endpoint: /users [POST] ', async () => {
    const response = await request.post('/users').send(testuser1);

    expect(response.status).toBe(200);
  });

  it('INDEX endpoint: /users [GET]', async () => {
    const response = await request
      .get('/users')
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('SHOW endpoint: /users/:id [GET]', async () => {
    const response = await request
      .get('/users/2')
      .set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
      await store.clearTableUsers();
  });
});