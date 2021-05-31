import api from '../utils/api';
import jwt_decode from 'jwt-decode';
import { LoginForm, User } from '../models/appModel';

const login = async (loginForm: LoginForm) => {
  const jwtToken = await api.post<string>(
    '/api/login',
    { ...loginForm },
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  localStorage.setItem('Authorization', jwtToken);
  return jwt_decode<User>(jwtToken);
};

const appService = { login };
export default appService;
