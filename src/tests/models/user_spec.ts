import { User, UserDB } from '../../models/user';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
const store = new UserDB()

dotenv.config();


describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
      const result = await store.create({
      id:'1',
      firstname: 'Max',
      lastname: 'Mustermann',
      password: 'password123'
    });
    expect(result.lastname).toEqual('Mustermann');
  });

  it('index method should return a list of users', async () => {
      const result = await store.index();
    /*expect(result).toEqual([{
      id: 1,
      firstname: 'Max',
      lastname: 'Mustermann',
      password: 'password123'
    }]);*/
    expect(result[0].lastname).toEqual('Mustermann');
  });

  it('show method should return the correct user', async () => {
      const result = await store.show("1");
   /* expect(result).toEqual({
      id: 1,
      firstname: 'Max',
      lastname: 'Mustermann',
      password: 'password123'
    });*/
      expect(result.lastname).toEqual('Mustermann');
  });

      afterAll(async () => {
      await store.clearTableUsers();
  });
});