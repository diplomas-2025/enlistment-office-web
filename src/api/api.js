import axios from 'axios';

// Базовый URL API
const BASE_URL = 'https://spotdiff.ru/enlistment-office-api';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем интерцептор для автоматической подстановки токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
    }
    return config;
});

// Методы для работы с пользователями
const UserAPI = {
    // Получить всех пользователей
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            throw error;
        }
    },

    // Добавить нового пользователя
    addUser: async (email, password) => {
        try {
            const response = await api.post('/users', null, {
                params: { email, password },
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            throw error;
        }
    },

    // Получить информацию о пользователе по ID
    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
            throw error;
        }
    },

    // Получить информацию о текущем пользователе
    getCurrentUserInfo: async () => {
        try {
            const response = await api.get('/users/info');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении информации о текущем пользователе:', error);
            throw error;
        }
    },

    // Добавить учетные данные для пользователя
    addAccounting: async (userId, accountingData) => {
        try {
            const response = await api.post(`/users/${userId}/accounting`, accountingData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении учетных данных:', error);
            throw error;
        }
    },

    // Добавить место работы для пользователя
    addWork: async (accountingId, workData) => {
        try {
            const response = await api.post(`/users/accounting/${accountingId}/work`, workData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении места работы:', error);
            throw error;
        }
    },

    // Добавить место учебы для пользователя
    addStudy: async (accountingId, studyData) => {
        try {
            const response = await api.post(`/users/accounting/${accountingId}/study`, studyData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении места учебы:', error);
            throw error;
        }
    },

    // Добавить паспортные данные для пользователя
    addPassport: async (accountingId, passportData) => {
        try {
            const response = await api.post(`/users/accounting/${accountingId}/passport`, passportData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении паспортных данных:', error);
            throw error;
        }
    },
};

// Методы для работы с военкоматами
const EnlistmentOfficeAPI = {
    // Получить все военкоматы
    getAllEnlistmentOffices: async () => {
        try {
            const response = await api.get('/enlistment-offices');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении военкоматов:', error);
            throw error;
        }
    },

    // Создать новый военкомат
    createEnlistmentOffice: async (officeData) => {
        try {
            const response = await api.post('/enlistment-offices', officeData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при создании военкомата:', error);
            throw error;
        }
    },
};

// Методы для работы с документами
const EnlistmentSummonDocumentAPI = {
    // Добавить документ
    addDocument: async (accountId, type) => {
        try {
            const response = await api.post('/enlistment-summon-document', null, {
                params: { account_id: accountId, type },
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении документа:', error);
            throw error;
        }
    },
};

// Методы для аутентификации
const AuthAPI = {
    // Вход в систему
    login: async (email, password) => {
        try {
            const response = await api.post('/users/login', { email, password });
            const { accessToken, roles } = response.data;
            localStorage.setItem('token', accessToken); // Сохраняем токен в localStorage
            localStorage.setItem('is_admin', roles.includes('ADMIN')); // Сохраняем токен в localStorage
            return response.data;
        } catch (error) {
            console.error('Ошибка при входе в систему:', error);
            throw error;
        }
    },

    // Выход из системы
    logout: () => {
        localStorage.removeItem('token'); // Удаляем токен из localStorage
    },

    is_admin: () => {
        return localStorage.getItem("is_admin")
    }
};

// Экспортируем все методы
export { UserAPI, EnlistmentOfficeAPI, EnlistmentSummonDocumentAPI, AuthAPI };