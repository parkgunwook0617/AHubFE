import { create } from 'zustand';
import api from '../../AxiosIntercepter';

interface AuthState {
    isLoggedIn: boolean;
    isLoaded: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isLoaded: false,

    checkAuth: async () => {
        try {
            await api.post('/auth/validate');
            set({ isLoggedIn: true, isLoaded: true });
        } catch (error) {
            set({ isLoggedIn: false, isLoaded: true });
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/signOut');
        } catch (error) {
            console.error("서버 로그아웃 처리 실패", error);
        } finally {
            set({ isLoggedIn: false, isLoaded: true });
        }
    }
}));

export default useAuthStore;