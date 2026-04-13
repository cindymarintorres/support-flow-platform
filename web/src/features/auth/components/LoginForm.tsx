import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { LoginSchema, type LoginDto } from '../auth.schema';
import { useAuth } from '../useAuth';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AppInput } from '@/components/common/AppInput';
import { AppButton } from '@/components/common/AppButton';
import logo from '@/assets/img/logo/logo-support-flow-v2.png';

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  const onSubmit = (data: LoginDto) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="w-70 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Iniciar Sesión</h2>
        {/* <p className="text-sm text-slate-500">Bienvenido de nuevo a SupportFlow</p> */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <AppInput
          id="email"
          label="Correo electrónico"
          leftIcon={Mail}
          type="email"
          placeholder="ejemplo@empresa.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <AppInput
          id="password"
          label="Contraseña"
          leftIcon={Lock}
          rightIcon={showPassword ? EyeOff : Eye}
          onIconClick={() => setShowPassword(!showPassword)}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Recordarme y olvidé contraseña — esto se queda directo, no vale la pena abstraerlo */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">
              Recordarme
            </Label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Olvidé mi contraseña
          </Link>
        </div>

        {/* Error del servidor */}
        {/* Mensaje de error desde NestJS */}
        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-600 text-center font-medium">
              {/* @ts-expect-error - asumiendo estructura de axios */}
              {error.response?.data?.message || 'La contraseña ingresada es incorrecta. Por favor, inténtalo de nuevo.'}
            </p>
          </div>
        )}

        <AppButton
          type="submit"
          className="w-full mt-6 bg-[#60B6C1] hover:bg-[#4ea2ac] text-white"
          isLoading={isLoading}
          loadingText="Iniciando sesión..."
        >
          Iniciar Sesión
        </AppButton>

      </form>
    </div>
  )
}