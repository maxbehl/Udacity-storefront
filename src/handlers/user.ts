import express, {Request, Response } from 'express'
// @ts-ignore
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { User, UserDB } from '../models/user'

dotenv.config();

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

const store = new UserDB;

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
        const users = await store.index()
        res.json(users)
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
        const user = await store.show(_req.params.id)
        res.json(user)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (_req: Request, res: Response) => {
    const user: User = {
        firstname: _req.body.firstname,
        lastname: _req.body.lastname,
        password: _req.body.password,
    }
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(((err as unknown) as string) + user)
    }
}

export default userRoutes