import toast from "react-hot-toast";

import {
    insertTransactionService,
    updateTransactionService,
    getTransactionsService,
    deleteTransactionService
} from "../api/transactions";


const getTransactionsController = async () => {
    try {
        return await getTransactionsService();

    } catch (err) {
        console.error(err);
        toast.error('مشکلی در دریافت تراکنش‌ها پیش آمده.');
    }
};


const insertTransactionController = async (data) => {
    try {
        const response = await insertTransactionService(data);

        toast.success('تراکنش اضافه شد.');

        return response;

    } catch (err) {
        console.error(err);
        toast.error('مشکلی در اضافه کردن تراکنش پیش آمده.');
    }
};


const updateTransactionController = async (id, data) => {
    try {
        const response = await updateTransactionService(id, data);

        toast.success('تراکنش ویرایش شد.');

        return response;

    } catch (err) {
        console.error(err);
        toast.error('مشکلی در ویرایش تراکنش پیش آمده.');
    }
};


const deleteTransactionController = async (id) => {
    try {
        const response = await deleteTransactionService(id);

        toast.success('تراکنش حذف شد.');

        return response;

    } catch (err) {
        console.error(err);
        toast.error('مشکلی در حذف تراکنش پیش آمده.');
    }
};


export {
    insertTransactionController,
    updateTransactionController,
    getTransactionsController,
    deleteTransactionController
};