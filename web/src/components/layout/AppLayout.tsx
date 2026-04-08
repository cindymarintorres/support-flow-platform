import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
import { useUiStore } from '../../store/uiStore';

const AppLayout = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* SIDEBAR */}
      {/* <Sidebar isOpen={isSidebarOpen} /> */}

      {/* CONTENIDO PRINCIPAL */}
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* TOPBAR */}
        {/* <Topbar /> */}
        
        {/* OUTLET (Aquí se inyecta el Dashboard o la tabla de Tickets) */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;