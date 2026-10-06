import { clearCurrentUser } from '../lib/indexedDB';
import { getMeService } from './auth.api';

const getProfileService = async () => {
    const profile = await getMeService();
    return { profile, error: profile ? null : new Error('کاربر وارد نشده است.') };
}

const signOut = async () => {
    clearCurrentUser();
    return true;
}


export { getProfileService, signOut };