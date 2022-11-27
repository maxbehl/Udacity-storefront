import Client from '../database';

export type Order = {
    id?: Number;
    status: string;
    user_id: string;
}

export type ProdInOrder = {
    id?: Number;
    quantity: Number;
    productId: string;
    orderId: string;
}

export class OrderDB {
    async index(): Promise<Order[]>{
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get Orders: ${err}`)
        }
    }
    async show(id: string): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }
    
      async create(o: Order): Promise<Order> {
          try {
        const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn
            .query(sql, [o.status, o.user_id])
    
        const order = result.rows[0]
    
        conn.release()
    
        return order
          } catch (err) {
              throw new Error(`Could not add new order for user ${o.user_id}. Error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<Order> {
          try {
        const sql = 'DELETE FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
        
        const order = result.rows[0];
        conn.release()
    
        return result.rows[0];
          } catch (err) {
              throw new Error(`Could not delete order ${id}. Error: ${err}`)
          }
        }
      async addProduct(p: ProdInOrder /*quantity: number, orderId: string, productId: string*/): Promise<ProdInOrder> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [p.quantity, p.orderId, p.productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${p.productId} to order ${p.orderId}: ${err}`)
        }
      }
    async orderByUser(user_id: number): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`unable to find order by user ${user_id}: ${error}`);
        }
    }
      async clearTableOrders(): Promise<boolean> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'TRUNCATE orders RESTART IDENTITY CASCADE';
      const sql2 = 'TRUNCATE order_products RESTART IDENTITY CASCADE';
      await conn.query(sql);
      await conn.query(sql2);

      conn.release();
      return true;
    } catch (error) {
      throw new Error('unable to delete data');
    }
  }
}
    
    