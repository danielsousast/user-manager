import request from 'supertest';
import mongoose from 'mongoose';
import crypto from 'crypto';
import app from '../../src/app';
import dropAllCollections from '../util/truncate';
import factory from '../util/factories';

describe('User', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/jest',
            { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
    });

    beforeEach(async () => {
        await dropAllCollections()
    });

    it('should encrypt user password when new user created', async function(){
        const user = await factory.create('User', {
            password: '123456'
        });

        function checkPassword(password) {
            const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, "sha512").toString("hex");
            return hash === user.hash;
        }

        const comparePass = await checkPassword(user.password);

        expect(comparePass).toBe(true);
    });

    it('should be able to register', async function () {
        const user = await factory.attrs('User');

        const response = await request(app).post('/users').send(user);

        expect(response.body).toHaveProperty('_id');
    });

    it('should not be able to register with duplicated email or username', async function () {
        const user = await factory.attrs('User');

        await request(app).post('/users').send(user);

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(400);
    });

    it('should be able to login', async function () {
        const user = await factory.attrs('User');

        await request(app).post('/users').send(user);

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.body).toHaveProperty('token');
    });
});