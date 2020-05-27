import User from '../models/User';
import RecoveryMail from '../jobs/RecoveryMail';

class RecoveryController {
    async store(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ email });

        // Checks if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User does not found' });
        }

        const recovery = user.generateRecoveryToken();

        await user.save();

        RecoveryMail.handle({
            name: user.name,
            email: user.email,
            token: recovery.token,
        });

        return res.json({ message: 'Email sended' });
    }

    async update(req, res) {
        const { token } = req.body || req.query;
        const { password } = req.body;
        const user = await User.findOne({ 'recovery.token': token });

        // Checks if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User does not found' });
        }

        user.password = password;

        await user.save();

        return res.json({ message: 'Paswword changed' });
    }
}

export default new RecoveryController();
