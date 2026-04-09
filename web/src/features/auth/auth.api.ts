import api from '../../lib/axios'
import type { AuthResponseDto, LoginDto } from './auth.schema'

export const loginRequest = async (credentials: LoginDto): Promise<AuthResponseDto> => {
  const { data } = await api.post<AuthResponseDto>('/auth/login', credentials)
  return data
}