import mongoose from 'mongoose';
import mongo from './config/mongo';

require('./bootstrap');

/**
 * This code connects to the MongoDB database
 */

class Database {
    constructor() {
        this.init();
    }

    init() {
        mongoose.connect(
            `mongodb://${mongo.user}:${mongo.pass}@${mongo.host}:${mongo.port}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        mongoose.set('useCreateIndex', true);
    }
}

export default new Database();
