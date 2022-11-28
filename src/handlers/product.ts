import express, {Request, Response } from 'express'
// @ts-ignore
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Product, ProductDB } from '../models/product'

dotenv.config();

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

const store = new ProductDB;

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const product = await store.show(_req.params.id)
        res.json(product)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (_req: Request, res: Response) => {
    const product: Product = {
        name: _req.body.name,
        price: _req.body.price,
    }
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
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

export default productRoutes