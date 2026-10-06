import {
    deleteRecord,
    getAllByIndex,
    getCurrentUser,
    putRecord,
} from '../lib/indexedDB';

const requireCurrentUser = async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('کاربر وارد نشده است.');
    }

    return user;
};

const getTransactionsService = async () => {
    const user = await requireCurrentUser();
    return getAllByIndex('transactions', 'userId', user.id);
};


const insertTransactionService = async ({
    title,
    amount,
    type,
    category,
    date
}) => {
    const user = await requireCurrentUser();
    const transaction = {
        id: crypto.randomUUID(),
        userId: user.id,
        title,
        amount,
        type,
        category,
        date,
    };

    await putRecord('transactions', transaction);
    return transaction;
};


const updateTransactionService = async (
    id,
    {
        title,
        amount,
        type,
        category,
        date
    }
) => {
    const user = await requireCurrentUser();
    const transaction = await getTransactionForUser(id, user.id);

    Object.assign(transaction, { title, amount, type, category, date });
    await putRecord('transactions', transaction);
    return transaction;
};


const deleteTransactionService = async (id) => {
    const user = await requireCurrentUser();
    const transaction = await getTransactionForUser(id, user.id);

    await deleteRecord('transactions', id);
    return transaction;
};

const getTransactionForUser = async (id, userId) => {
    const transactions = await getAllByIndex('transactions', 'userId', userId);
    const transaction = transactions.find((item) => item.id === id);

    if (!transaction) {
        throw new Error('تراکنش پیدا نشد.');
    }

    return transaction;
};


export {
    insertTransactionService,
    updateTransactionService,
    getTransactionsService,
    deleteTransactionService
};