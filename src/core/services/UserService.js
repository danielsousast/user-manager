import User from '../models/User';

export async function emailExists(email) {
    const userExists = await User.findOne({ email });

    if (userExists) return true;
    return false;
}

export async function nameExists(username) {
    const userExists = await User.findOne({ username });

    if (userExists) return true;
    return false;
}
