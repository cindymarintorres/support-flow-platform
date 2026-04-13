import axios from 'axios'
import { env } from '@/config/env';
import { useAuthStore } from '../store/authStore'

const baseURL = env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

// 1. Interceptor de PETICIONES (Request)
api.interceptors.request.use((config) => {
  //MEJORA: Usamos getState() de Zustand en lugar de parsear localStorage.
  // Es más seguro, rápido y confía en la memoria de la app.
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// 2. Interceptor de RESPUESTAS (Response)
api.interceptors.response.use(
  (response) => {
    // Si la petición fue exitosa (Status 2xx), la dejamos pasar.
    return response
  },
  (error) => {
    // Si el backend responde con un error...
    if (error.response) {
      const { status } = error.response

      // Si es 401 (No Autorizado / Token expirado o inválido)
      if (status === 401) {
        console.warn('Sesión expirada. Cerrando sesión automáticamente...')

        // Ejecutamos la función logout de tu store
        useAuthStore.getState().logout()

        // Nota: Al hacer logout(), Zustand limpia el estado y el localStorage.
        // Tu <ProtectedRoute /> reaccionará a esto y enviará al usuario a /login.
      }

      // Opcional: Manejar 403 (Prohibido - No tiene permisos)
      if (status === 403) {
        console.warn('No tienes permisos para realizar esta acción.')
        // Aquí podrías disparar una notificación (toast) global
      }
    }

    return Promise.reject(error)
  }
)

export default api