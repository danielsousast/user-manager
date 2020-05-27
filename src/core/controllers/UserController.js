import User from '../models/User';
import { emailExists, nameExists } from '../services/UserService';

class UserController {
    /**
     * GET /
     * Returns all users registered in the database
     */
    async index(req, res) {
        const users = await User.find({}).select('-hash -salt');

        return res.json(users);
    }

    /**
     * GET /:id
     * Returns a user based on the id passed as a parameter
     */
    async show(req, res) {
        const user = await User.findById(req.params.id);

        // Checks if the user exists
        if (!user) {
            return res.status(400).json({ error: 'User does not found' });
        }

        return res.json(user.getData());
    }

    /**
     * POST /
     * Creates a new user in the database
     */
    async store(req, res) {
        const { name, username, email, password } = req.body;

        // Checks if the email already exists
        if (await emailExists(email)) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Checks if the username already exists
        if (await nameExists(username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = await User.create({ name, username, email, password });

        return res.json(user.getData());
    }

    /**
     * PUT /:id
     * Updates a user according to the parameter sent
     */
    async update(req, res) {
        const { name, username, email, password } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User does not found' });
        }

        // Checks if the email already exists
        if (email && email !== user.email) {
            if (await emailExists(email)) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            user.email = email;
        }
        // Checks if the username already exists
        if (username && username !== user.username) {
            if (await nameExists(username)) {
                return res.json({ error: 'Username already exists' });
            }
            user.username = username;
        }

        if (name) user.name = name;
        if (password) user.password = password;

        return res.json({ user: user.getData() });
    }

    /**
     * DELETE /:id
     * Changes a user's property DELETED to TRUE
     */
    async delete(req, res) {
        const user = await User.findById(req.params.id);

        // Checks if the user exists
        if (!user) {
            return res.json({ error: 'User does not found' });
        }

        user.deleted = true;
        await user.save();

        return res.json({ message: 'User Deleted' });
    }
}

export default new UserController();
