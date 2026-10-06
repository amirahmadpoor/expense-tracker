const DATABASE_NAME = 'expense-tracker';
const DATABASE_VERSION = 1;
const SESSION_KEY = 'expense-tracker-session';

const openDatabase = () => new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains('users')) {
            const users = database.createObjectStore('users', { keyPath: 'id' });
            users.createIndex('email', 'email', { unique: true });
        }

        if (!database.objectStoreNames.contains('transactions')) {
            const transactions = database.createObjectStore('transactions', { keyPath: 'id' });
            transactions.createIndex('userId', 'userId', { unique: false });
        }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
});

const requestResult = (request) => new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
});

const readStore = async (storeName, mode = 'readonly') => {
    const database = await openDatabase();
    return database.transaction(storeName, mode).objectStore(storeName);
};

const getByKey = async (storeName, key) => requestResult((await readStore(storeName)).get(key));

const getByIndex = async (storeName, indexName, value) => requestResult((await readStore(storeName)).index(indexName).get(value));

const getAllByIndex = async (storeName, indexName, value) => requestResult((await readStore(storeName)).index(indexName).getAll(value));

const putRecord = async (storeName, record) => requestResult((await readStore(storeName, 'readwrite')).put(record));

const deleteRecord = async (storeName, key) => requestResult((await readStore(storeName, 'readwrite')).delete(key));

const getCurrentUser = async () => {
    const userId = localStorage.getItem(SESSION_KEY);
    return userId ? getByKey('users', userId) : null;
};

const setCurrentUser = (userId) => localStorage.setItem(SESSION_KEY, userId);
const clearCurrentUser = () => localStorage.removeItem(SESSION_KEY);

const hashPassword = async (password) => {
    const encodedPassword = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', encodedPassword);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

export {
    clearCurrentUser,
    deleteRecord,
    getAllByIndex,
    getByIndex,
    getByKey,
    getCurrentUser,
    hashPassword,
    putRecord,
    setCurrentUser,
};
