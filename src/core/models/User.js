import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';

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
        role: {
            type: Array,
            default: ['user'],
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        recovery: {
            type: {
                token: String,
                date: Date,
            },
            default: {},
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

// Generates a Recovery Token
UserSchema.methods.generateRecoveryToken = function () {
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(8).toString('hex');
    this.recovery.date = new Date(new Date().getTime() + 5 * 60 * 1000);
    return this.recovery;
};

UserSchema.methods.endRecoveryToken = function () {
    this.recovery = { token: null, date: null };
    return this.recovery;
};

export default mongoose.model('User', UserSchema);
