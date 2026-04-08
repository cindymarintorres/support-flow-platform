import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5F6F5] p-4">
      {/* El fondo color menta suave de tu diseño */}
      <Outlet /> 
    </div>
  );
};

export default AuthLayout;