import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://mangashop-rnfc.onrender.com',
    withCredentials: true, // gửi cookie refreshToken tự động
});

// ─── Gắn accessToken vào mọi request ────────────────────────────
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Auto refresh khi accessToken hết hạn (401) ─────────────────
let isRefreshing = false;
let queue = []; // hàng chờ các request bị lỗi 401

const processQueue = (error, token = null) => {
    queue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve(token);
    });
    queue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Đợi refresh xong rồi retry
                return new Promise((resolve, reject) => {
                    queue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    'http://localhost:5000/api/auth/refresh',
                    {},
                    { withCredentials: true }
                );
                const newToken = data.accessToken;
                localStorage.setItem('accessToken', newToken);
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;