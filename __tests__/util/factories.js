import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../../src/models/User';

factory.define('User', User, {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

export default factory;
