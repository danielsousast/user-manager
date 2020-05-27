import User from '../models/User';

class SessionController {
    /**
     * POST /
     * Generates a JWT authentication token
     */
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: 'User does not found' });
        }

        if (user.deleted === true) {
            return res.status(401).json({ error: 'Disabled user' });
        }

        if (!user.checkPassword(password)) {
            return res.json({ error: 'Invalid data' });
        }

        return res.json(user.getAuthJson());
    }
}

export default new SessionController();
