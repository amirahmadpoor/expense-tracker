import { supabase } from '../lib/supabase';

const getProfileService = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();

        return { profile, error };
    } catch (err) {
        console.error(err);
    }
}

const signOut = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase.auth.signOut(user);

        if (error) {
            throw error;
        }

        return true;
    } catch (err) {
        console.error(err);
    }
}


export { getProfileService, signOut };