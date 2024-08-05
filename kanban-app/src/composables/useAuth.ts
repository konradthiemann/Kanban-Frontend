import { ref } from 'vue';
import api, { getUserID, getUser } from '../services/api';
import { UserData } from '../types';

export function useAuth() {
  const user = ref();

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
      
      return user.value
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        console.log('Invalid username or password');
    } else {
        console.error('An error occurred during login:', error);
    }
      return false;
    }
  };

  const register = async (userData: UserData) => {
      const response = await api.post('/register/', userData);
      return response
  };

  //This function attempts to refresh the access token using the refresh token stored in localStorage
  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) throw new Error('No refresh token available');

      const response = await api.post('/api/token/refresh/', { refresh });
      localStorage.setItem('access', response.data.access);
      api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
      return true;
    } catch (error: any) {
      console.error('Failed to refresh token:', error);
      return false;
    }
  };

  //This function handles 401 errors by attempting to refresh the token and retrying the original request if the token refresh is successful. If the token refresh fails, it redirects the user to the login page.
  const handle401Error = async (error: any) => {
    if (error.response && error.response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request
        error.config.headers['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
        return api.request(error.config);
      } else {
        // Redirect to login page or handle as needed
        console.log('Redirecting to login page');
        // router.push('/login'); // Uncomment if using Vue Router
      }
    }
    return Promise.reject(error);
  };

  // An Axios response interceptor is added to handle 401 errors globally. This ensures that any request that receives a 401 error will trigger the handle401Error function.
  api.interceptors.response.use(
    response => response,
    handle401Error
  );

  return { user, login, register };
}
