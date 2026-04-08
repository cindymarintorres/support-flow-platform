import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

import { LoginSchema, type LoginDto } from '../schemas/auth.schema';
import { useAuth } from '../hooks/useAuth';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
//Importamos los componentes del nuevo Input Group
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginDto) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Iniciar Sesión</h2>
        <p className="text-sm text-slate-500">
          Bienvenido de nuevo a SupportFlow
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Campo: Correo Electrónico */}
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
            Correo electrónico
          </Label>
          
          {/* ✅ FORMA OFICIAL DE SHADCN */}
          <InputGroup>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="ejemplo@empresa.com"
              {...register('email')}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""} 
            />
            <InputGroupAddon align="inline-start">
              <Mail className="h-4 w-4 text-slate-400" />
            </InputGroupAddon>
          </InputGroup>

          {errors.email && (
            <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Campo: Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password" className={errors.password ? "text-red-500" : ""}>
            Contraseña
          </Label>
          
          {/* ✅ INPUT GROUP CON DOBLE ADDON (Candado y Ojo) */}
          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {/* Ícono de la izquierda */}
            <InputGroupAddon align="inline-start">
              <Lock className="h-4 w-4 text-slate-400" />
            </InputGroupAddon>
            
            {/* Botón de la derecha */}
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:text-slate-900"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {errors.password && (
            <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Opciones extras */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">
              Recordarme
            </Label>
          </div>

          <Link 
            to="/forgot-password" 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Olvidé mi contraseña
          </Link>
        </div>

        {/* Mensaje de error desde NestJS */}
        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-600 text-center font-medium">
              {/* @ts-expect-error - asumiendo estructura de axios */}
              {error.response?.data?.message || 'La contraseña ingresada es incorrecta. Por favor, inténtalo de nuevo.'}
            </p>
          </div>
        )}

        {/* Botón */}
        <Button 
          type="submit" 
          className="w-full mt-6 bg-[#60B6C1] hover:bg-[#4ea2ac] text-white" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>
    </div>
  );
};