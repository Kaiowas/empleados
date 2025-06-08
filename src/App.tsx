import { Outlet, NavLink } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <div className='container-lg user-select-none pb-2'>
        <div className="sticky-top top-0 d-flex justify-content-between align-items-center py-2 px-3 bg-info-subtle gap-5 mb-4 border-1 border-bottom border-warning-subtle shhadow-lg">
          <NavLink
            className={({ isActive }) => "text-primary text-opacity-50 h2 m-0 text-decoration-none" + (isActive ? " active fw-bold pe-none" : "")}
            to='/'
          >
            CRM Empleados
          </NavLink>
          <NavBar />
        </div>

        <Outlet />
      </div>
    </>
  )
}

export default App
