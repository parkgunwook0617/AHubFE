import axios, {
    type AxiosInstance,
    type AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosResponse
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    `${BASE_URL}/auth/reissue`,
                    {},
                    { withCredentials: true }
                );

                return api(originalRequest);
            } catch (reissueError) {
                window.location.href = '/login';
                return Promise.reject(reissueError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;