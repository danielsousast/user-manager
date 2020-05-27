import { Router } from 'express';
import UserController from './core/controllers/UserController';
import SessionController from './core/controllers/SessionController';
import RecoveryController from './core/controllers/RecoveryController';
import {
    storeValidation,
    updateValidation,
} from './core/validations/UserValidation';
import sessionValidation from './core/validations/SessionValitaion';
import auth from './core/middlewares/auth';

const routes = new Router();

routes.post('/recovery', RecoveryController.store);
routes.put('/recovery', RecoveryController.update);
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
