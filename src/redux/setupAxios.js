export default function setupAxios(axios) {
    axios.interceptors.request.use(
        config => {
            config.baseURL = 'http://stg-portalbackend.int-zolve.com/api';
            return config;
        },
        err => Promise.reject(err),
    );
}
