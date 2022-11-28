import express, {Request, Response } from 'express'

import { Order, OrderDB, ProdInOrder } from '../models/order'
// @ts-ignore
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    
    app.post('orders/:id/products', addProduct)
    app.get('/orders/user/:user_id',orderByUser)
}

const store = new OrderDB;

const index = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = (_req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const orders = await store.index()
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = (_req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const order = await store.show(_req.params.id)
        res.json(order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = (_req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const order: Order = {
        user_id: _req.body.userId,
        status: 'active',
    }
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = (_req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const prodInOrder: ProdInOrder = {
        orderId: _req.params.id,
        productId: _req.body.productId,
        quantity: parseInt(_req.body.quantity)
    }
    try {
        const addedProduct = await store.addProduct(prodInOrder)
        res.json(addedProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const orderByUser = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = (req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
  try {
    const user_id: number = parseInt(req.params.user_id);
    const orders = await store.orderByUser(user_id);
    res.json(orders);
  } catch (error) {
    res.send(400);
    res.json(error);
  }
};

export default orderRoutes