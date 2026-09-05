import toast from 'react-hot-toast';
import { getProfileService, signOut } from '../api/profile.api'

const getProfileController = async () => {
    try {
        const response = await getProfileService();

        if (response.error) {
            toast.error('مشکلی در دریافت پروفایل پیش امده.');
            return;
        }

        return response.profile;
    } catch (err) {
        console.error(err);
    }
}

const signOutController = async () => {
    return await signOut();
}

export { getProfileController,signOutController };