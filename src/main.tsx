import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoadingSpinner from './components/LoadingSpinner.tsx';
const EmpleadosList = lazy(() => import('./pages/EmpleadosList.tsx'));
const NuevoEmpleado = lazy(() => import('./pages/NuevoEmpleado.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Suspense fallback=<LoadingSpinner />> <EmpleadosList /></Suspense> },
      { path: '/nuevo-empleado', element: <Suspense fallback=<LoadingSpinner />><NuevoEmpleado /></Suspense> }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
