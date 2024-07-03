import { ref } from 'vue';
import api, { getUserID, getUser } from '../services/api';

export function useAuth() {
  const user = ref(null);

  const login = async (username: string, password: string):Promise<boolean> => {
    try {
      const response = await api.post('/api/token/', {
        "username":username,
        "password":password
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
      
      const userId = await getUserID(response.data.access);
      user.value = await getUser(userId);
      
      return true
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        console.log('Invalid username or password');
    } else {
        console.error('An error occurred during login:', error);
    }
      return false;
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
