import app from '../../server';
import supertest from 'supertest';
import { OrderDB, Order, ProdInOrder } from '../../models/order';
import { UserDB, User } from '../../models/user';
import { ProductDB, Product } from '../../models/product';


const request = supertest(app);

describe('Order endpoint: ', () => {
  const userData = new UserDB();
  const orderData = new OrderDB();
  const productData = new ProductDB();

  let token: string;

  beforeAll(async () => {
    const testuser1: User = {
      id: '1',
      firstname: 'Max',
      lastname: 'Mustermann',
      password: 'password123'
    };

    const testuser2: User = {
      id: '1',
      firstname: 'Michael',
      lastname: 'Mustermann',
      password: 'password456'
    };

    await userData.create(testuser1);

    const order: Order = {
      user_id: '1',
      status: 'active'
    };

    await orderData.create(order);

    const product1: Product = {
      name: 'shirt',
      price: 10
    };

    const product2: Product = {
      name: 'trouser',
      price: 50
    };

      await productData.create(product1);
      await productData.create(product2);
      
      const productInOrder1: ProdInOrder = {
          quantity: 2,
          orderId: '1',
          productId: '2'
      }
      const productInOrder2: ProdInOrder = {
          quantity: 1,
          orderId: '1',
          productId: '1'
      }
      
      await orderData.addProduct(productInOrder1);
      await orderData.addProduct(productInOrder1);
      
    const userRequest = await request
      .post('/users')
      .send(testuser1)
      .set('Accept', 'application/json');

    token = userRequest.body;
  });
    
    it('Testing GET order by user /orders/user/:user_id', async () => {
        const response = await request
        .get('/orders/user/1')
        .set(`Authorization`, `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    



  afterAll(async () => {
      await userData.clearTableUsers();
      await productData.clearTableProducts();
      await orderData.clearTableOrders();
  });
});