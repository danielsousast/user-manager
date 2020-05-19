import dotenv from 'dotenv';

/*
 * This code checks the development environment
 * to read the corresponding environment variables
 */

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
