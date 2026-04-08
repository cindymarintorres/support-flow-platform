import { LoginForm } from '../../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    // LoginPage delega toda la lógica y UI compleja a LoginForm
    <LoginForm />
  );
};

export default LoginPage;