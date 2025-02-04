import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Avatar, Button, IconButton,
} from '@mui/material';
import {
    Email,
    Phone,
    Work,
    School,
    LocationOn,
    Person,
    Cake,
    Home, ExitToApp, Edit, CheckCircle,
} from '@mui/icons-material';
import {AuthAPI, UserAPI} from '../api/api';
import {useLocation, useNavigate} from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({email: "", accounting: null});

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    useEffect(() => {
        if (userId != null) {
            UserAPI.getUserById(userId)
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Ошибка при загрузке данных пользователя:', error);
                });
        } else {
            UserAPI.getCurrentUserInfo()
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Ошибка при загрузке данных пользователя:', error);
                });
        }
    }, [userId]);

    // Функция для безопасного отображения данных
    const renderField = (label, value, icon) => (
        <ListItem sx={{px: 0}}>
            <Avatar sx={{bgcolor: '#1C2E4A', mr: 2}}>
                {icon}
            </Avatar>
            <ListItemText
                primary={label}
                secondary={value || 'Не указано'}
                secondaryTypographyProps={{color: '#4A5568'}}
            />
        </ListItem>
    );

    const handleLogout = () => {
        AuthAPI.logout()
        window.location.reload();
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1C2E4A, #4A5568)',
                padding: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 800,
                    background: 'rgba(255, 255, 255, 0.9)', // Полупрозрачный белый фон
                    backdropFilter: 'blur(10px)', // Размытие для стеклянного эффекта
                }}
            >
                {/* Основная информация */}
                <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Профиль пользователя
                </Typography>
                <List>
                    {renderField('Email', user.email, <Email/>)}
                </List>
                <Divider sx={{my: 2}}/>

                {/* Accounting */}
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Учетные данные
                    {userId &&
                        <IconButton onClick={() => navigate("/profile/account?userId=" + userId)}>
                            <Edit/>
                        </IconButton>
                    }
                </Typography>
                {user.accounting ? (
                    <List>
                        {renderField('Статус', user.accounting.status === 'FIT' ? 'Годен' : 'Не годен', <CheckCircle/>)}
                        {renderField('Семейное положение', user.accounting.maritalStatus === 'MARRIED' ? 'Женат' : 'Холост',
                            <Home/>)}
                        {renderField(
                            'Телефон',
                            user.accounting.phoneNumber
                                ? `+${user.accounting.phoneNumberCode} ${user.accounting.phoneNumber}`
                                : 'Не указано',
                            <Phone/>
                        )}
                    </List>
                ) : (
                    <Typography variant="body1" color="#4A5568">
                        Учетные данные отсутствуют.
                    </Typography>
                )}
                <Divider sx={{my: 2}}/>

                {/* Enlistment Office */}
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Военкомат
                </Typography>
                {user.accounting?.enlistmentOffice ? (
                    <List>
                        {renderField('Город', user.accounting.enlistmentOffice.city, <LocationOn/>)}
                        {renderField('Улица', user.accounting.enlistmentOffice.street, <LocationOn/>)}
                        {renderField('Номер дома', user.accounting.enlistmentOffice.houseNumber, <LocationOn/>)}
                    </List>
                ) : (
                    <Typography variant="body1" color="#4A5568">
                        Информация о военкомате отсутствует.
                    </Typography>
                )}
                <Divider sx={{my: 2}}/>

                {/* Work */}
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Место работы
                    {(user.accounting && userId) &&
                        <IconButton onClick={() => navigate("/profile/work?userId=" + userId)}>
                            <Edit/>
                        </IconButton>
                    }
                </Typography>
                {user.accounting?.work ? (
                    <List>
                        {renderField('Организация', user.accounting.work.organization, <Work/>)}
                        {renderField('Должность', user.accounting.work.position, <Work/>)}
                        {renderField(
                            'Отсрочка',
                            user.accounting.work.postponement ? 'Есть' : 'Нет',
                            <CheckCircle/>
                        )}
                    </List>
                ) : (
                    <Typography variant="body1" color="#4A5568">
                        Информация о работе отсутствует.
                    </Typography>
                )}
                <Divider sx={{my: 2}}/>

                {/* Study */}
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Место учебы
                    {(user.accounting && userId) &&
                        <IconButton onClick={() => navigate("/profile/study-plan?userId=" + userId)}>
                            <Edit/>
                        </IconButton>
                    }
                </Typography>
                {user.accounting?.study ? (
                    <List>
                        {renderField('Название', user.accounting.study.name, <School/>)}
                        {renderField('Курс', user.accounting.study.currentCourse, <School/>)}
                        {renderField('Дата начала', user.accounting.study.startDate, <Cake/>)}
                        {renderField('Дата окончания', user.accounting.study.endDate, <Cake/>)}
                        {renderField(
                            'Отсрочка',
                            user.accounting.study.postponement ? 'Есть' : 'Нет',
                            <CheckCircle/>
                        )}
                    </List>
                ) : (
                    <Typography variant="body1" color="#4A5568">
                        Информация об учебе отсутствует.
                    </Typography>
                )}
                <Divider sx={{my: 2}}/>

                {/* Passport */}
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', color: '#1C2E4A'}}>
                    Паспортные данные
                    {(user.accounting && userId) &&
                        <IconButton onClick={() => navigate("/profile/passport?userId=" + userId)}>
                            <Edit/>
                        </IconButton>
                    }
                </Typography>
                {user.accounting?.passport ? (
                    <List>
                        {renderField('Кем выдан', user.accounting.passport.issued, <Person/>)}
                        {renderField('Дата выдачи', user.accounting.passport.dateIssue, <Cake/>)}
                        {renderField('Серия', user.accounting.passport.series, <Person/>)}
                        {renderField('Номер', user.accounting.passport.number, <Person/>)}
                        {renderField('Имя', user.accounting.passport.first_name, <Person/>)}
                        {renderField('Фамилия', user.accounting.passport.last_name, <Person/>)}
                        {renderField('Отчество', user.accounting.passport.middle_name, <Person/>)}
                        {renderField('Пол', user.accounting.passport.gender === 'M' ? 'Мужской' : 'Женский', <Person/>)}
                        {renderField('Дата рождения', user.accounting.passport.birthday, <Cake/>)}
                        {renderField('Город', user.accounting.passport.addressCity, <LocationOn/>)}
                        {renderField('Улица', user.accounting.passport.addressStreet, <LocationOn/>)}
                        {renderField('Дом', user.accounting.passport.addressHouseNumber, <LocationOn/>)}
                        {renderField('Квартира', user.accounting.passport.addressApartmentNumber, <LocationOn/>)}
                    </List>
                ) : (
                    <Typography variant="body1" color="#4A5568">
                        Паспортные данные отсутствуют.
                    </Typography>
                )}

                {userId === null &&
                    <>
                        <Divider sx={{my: 2}}/>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                background: 'linear-gradient(135deg, #D32F2F, #FF6659)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #B71C1C, #E53935)'
                                },
                                fontWeight: 'bold',
                                borderRadius: 2,
                                padding: '10px'
                            }}
                            startIcon={<ExitToApp/>}
                            onClick={handleLogout}
                        >
                            Выйти из аккаунта
                        </Button>
                    </>
                }
            </Paper>
        </Box>
    );
};

export default UserProfile;