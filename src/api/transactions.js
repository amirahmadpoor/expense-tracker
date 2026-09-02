import { supabase } from "../lib/supabase";

const getTransactionsService = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        throw error;
    }

    return data;
};


const insertTransactionService = async ({
    title,
    amount,
    type,
    category,
    date
}) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    const { data, error } = await supabase
        .from('transactions')
        .insert({
            user_id: user.id,
            title,
            amount,
            type,
            category,
            date
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    const { data, error } = await supabase
        .from('transactions')
        .update({
            title,
            amount,
            type,
            category,
            date
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};


const deleteTransactionService = async (id) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};


export {
    insertTransactionService,
    updateTransactionService,
    getTransactionsService,
    deleteTransactionService
};