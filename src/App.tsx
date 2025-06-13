import { Outlet, NavLink } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import clsx from 'clsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div className='container-lg user-select-none pb-5'>
          <div className="sticky-top1 top-0 d-flex justify-content-between align-items-center py-2 px-3 bg-info-subtle gap-5 mb-4 z-2 border-1 border-bottom border-warning-subtle shadow-lg">
            <NavLink
              className={clsx("text-primary text-opacity-50 h2 m-0 text-decoration-none active fw-bold pe-none active fw-bold pe-none")}
              to='/'
            >
              CRM Empleados
            </NavLink>
            <NavBar />
          </div>

          <Outlet />
        </div>
      </>
    </QueryClientProvider>
  )
}

export default App
