import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import {
    storeValidation,
    updateValidation,
} from './validations/UserValidation';
import sessionValidation from './validations/SessionValitaion';
import auth from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', sessionValidation, SessionController.store);

// The POST route is out of the authentication middleware just for TESTING
routes.post('/users', storeValidation, UserController.store);

// Authentication middleware
routes.use(auth);

routes.put('/users/:id', updateValidation, UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

export default routes;
