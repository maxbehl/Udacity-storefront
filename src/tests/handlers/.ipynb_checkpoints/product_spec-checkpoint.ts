import app from '../../src/server';
import supertest from 'supertest';
import { ProductDB, Product } from '../../models/product';
import { User } from '../../models/user';

const request = supertest(app);

/*
- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
*/

const store = new ProductDB();
let token: string;
describe('Testing product endpoints: ', () => {
  const product: Product = {
    name: 'shirt',
    price: 10
  };

  const testuser: User = {
    id: 2,
    firstName: 'Max',
    lastName: 'Mustermann',
    password: 'password1234'
  };

  beforeAll(async () => {
    const userRequest = await request
      .post('/users')
      .send(testuser)
      .set('Accept', 'application/json');

    token = userRequest.body;
  });

  it('CREATE endpoint: /products [POST] ', async () => {
    const response = await request
      .post('/products')
      .send(product)
      .set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('INDEX endpoint: /products [GET]', async () => {
    const response = await request
      .get('/products')
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('SHOW endpoint: /products/:id [GET]', async () => {
    const response = await request
      .get('/products/1')
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await store.clearTableProducts();
  });
});