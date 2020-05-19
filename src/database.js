import mongoose from 'mongoose';

require('./bootstrap');

/**
 * This code connects to the MongoDB database
 */

class Database {
    constructor() {
        this.init();
    }

    init() {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.set('useCreateIndex', true);
    }
}

export default new Database();
