import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: String,
        hash: String,
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Mongoose virtual attribute
UserSchema.virtual('password');

// Hash password
UserSchema.pre('save', function () {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
});

// Check if the password is correct
UserSchema.methods.checkPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return hash === this.hash;
};

// Returns user data
UserSchema.methods.getData = function () {
    return {
        _id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        active: this.active,
    };
};

// Generates a JWT token
UserSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            expiresIn: jwtConfig.expiresIn,
        },
        jwtConfig.secret
    );
};

// Returns a JSON with the user data and the JWT token
UserSchema.methods.getAuthJson = function () {
    return {
        _id: this.id,
        username: this.username,
        name: this.name,
        email: this.email,
        active: this.active,
        token: this.generateToken(),
    };
};

export default mongoose.model('User', UserSchema);
