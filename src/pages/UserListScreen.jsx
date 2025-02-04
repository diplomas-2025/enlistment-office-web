import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar, IconButton, Button
} from '@mui/material';
import {Add, ExitToApp, Person} from '@mui/icons-material';
import {AuthAPI, UserAPI} from '../api/api';
import {useNavigate} from "react-router-dom";

const UserList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserAPI.getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке списка пользователей:', error);
            });
    }, []);

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
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1C2E4A' }}>
                    Список пользователей
                    <IconButton onClick={() => navigate("/user")}>
                        <Add/>
                    </IconButton>
                </Typography>

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
                <Divider sx={{my: 2}}/>

                <List>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <React.Fragment key={user.id}>
                                <ListItem sx={{ px: 0, cursor: "pointer" }} onClick = {() => {
                                    navigate("/profile?userId=" + user.id)
                                }}>
                                    <Avatar sx={{ bgcolor: '#1C2E4A', mr: 2 }}>
                                        <Person />
                                    </Avatar>
                                    <ListItemText
                                        primary={`${user.lastName || ''} ${user.firstName || ''} ${user.middleName || ''}`.trim() || 'Неизвестный пользователь'}
                                        secondary={user.email}
                                        secondaryTypographyProps={{ color: '#4A5568' }}
                                    />
                                </ListItem>
                                <Divider sx={{ my: 1 }} />
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body1" color="#4A5568">
                            Нет доступных пользователей.
                        </Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default UserList;