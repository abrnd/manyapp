const API_URL = 'http://localhost:8000';

export const API_ROUTES = {
    SIGN_UP: `${API_URL}/auth/signup`,
    SIGN_IN: `${API_URL}/auth/signin`,
    GET_USER: `${API_URL}/auth/me`,
    CREATE_TASK: `${API_URL}/task/add`,
    GET_TASK: `${API_URL}/task/get`,
    DELETE_TASK: `${API_URL}/task/del`,
    GET_STATUS: `${API_URL}/status/get`,
    UPDATE_TASK: `${API_URL}/task/update`,
    DOWNLOAD_FILE: `${API_URL}/task/download`,
    GET_EXTENSION: `${API_URL}/task/extension`,
    LOGOUT: `${API_URL}/auth/logout`
}

export const APP_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    HOME: '/home',
}