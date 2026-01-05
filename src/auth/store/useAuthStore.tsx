import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
    isLoggedIn: boolean;
    isLoaded: boolean;
    checkAuth: () => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isLoaded: false,

    checkAuth: async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/validate`, {}, { withCredentials: true });
            set({ isLoggedIn: true, isLoaded: true });
        } catch (error) {
            set({ isLoggedIn: false, isLoaded: true });
        }
    },

    logout: async () => {
        try {
            axios.post(`${import.meta.env.VITE_API_URL}/auth/signOut`,
                null,
                { withCredentials: true });
        } catch {
            console.error("서버 로구아웃 처리 실패");
        } finally {
            set({ isLoggedIn: false, isLoaded: true });
        }
    }
}));

export default useAuthStore;