import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../store/authStore'
import { loginRequest } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { ROUTES } from '../../../constants/routes'

export const useAuth = () => {
  const navigate = useNavigate(); // Importante para mover al usuario
  const { login, logout, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, token }) => {
      login(user, token);
      navigate(ROUTES.TICKETS); // Centralizamos la navegación aquí
    },
    // Opcional: toast de error aquí
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error as AxiosError, // Tipado para manejar errores de API
    logout,
  };
};