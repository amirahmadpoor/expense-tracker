import {
    getByIndex,
    getCurrentUser,
    hashPassword,
    putRecord,
    setCurrentUser,
} from '../lib/indexedDB';

const registerService = async ({ fullName, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await getByIndex('users', 'email', normalizedEmail);

    if (existingUser) {
        throw new Error('این ایمیل قبلا ثبت نام کرده است.');
    }

    const user = {
        id: crypto.randomUUID(),
        fullName: fullName.trim(),
        name: fullName.trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(password),
    };

    await putRecord('users', user);
    setCurrentUser(user.id);

    return { ...user, passwordHash: undefined };
};

const loginService = async ({ email, password }) => {
    const user = await getByIndex('users', 'email', email.trim().toLowerCase());

    if (!user || user.passwordHash !== await hashPassword(password)) {
        throw new Error('ایمیل یا رمز عبور اشتباه است.');
    }

    setCurrentUser(user.id);
    return { ...user, passwordHash: undefined };
};

const getMeService = async () => {
    const user = await getCurrentUser();
    return user ? { ...user, passwordHash: undefined } : null;
};

export { getMeService, loginService, registerService };
