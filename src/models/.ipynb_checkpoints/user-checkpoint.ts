// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config()

const {
    SALT_ROUNDS,
    BCRYPT_PASSWORD,
} = process.env

export type User = {
    id?: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserDB {
    async index(): Promise<User[]>{
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get Users: ${err}`)
        }
    }
    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }
    
      async create(u: User): Promise<User> {
          try {
        const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()
        
        const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
    
        const result = await conn
            .query(sql, [u.firstname, u.lastname,  hash])
    
        const user = result.rows[0]
    
        conn.release()
    
        return user
          } catch (err) {
              throw new Error(`Could not add new user with first Name ${u.firstname}. Error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<User> {
          try {
        const sql = 'DELETE FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])

        const user = result.rows[0];   
        conn.release()
    
        return result.rows[0]
          } catch (err) {
              throw new Error(`Could not delete user ${id}. Error: ${err}`)
          }
        }
    async clearTableUsers(): Promise<boolean> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'TRUNCATE users RESTART IDENTITY CASCADE';
            
            await conn.query(sql);
            
            conn.release();
            return true;
        } catch (error) {
            throw new Error('unable to delete data');
        }
    }
}
    
    