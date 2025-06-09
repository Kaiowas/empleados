import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-white bg-opacity-25 flex-fill  text-end justify-content-end rounded'>
            <div className='container justify-content-end ms-auto'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink
                            className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold pe-none text-warning text-decoration-underline" : "")}
                            to='/'
                        >
                            Empleados
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold pe-none text-warning text-decoration-underline" : "")}
                            to='/nuevo-empleado'
                        >
                            Nuevo Empleado
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;