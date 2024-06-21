import { ref } from 'vue';
import api from '../services/api';

export function useAuth() {
  const user = ref(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/api/token/', {
        "username":username,
        "password":password
      });
      console.log(response.data);
      user.value = response.data.user;
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await api.post('/auth/register/', userData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { user, login, register };
}
