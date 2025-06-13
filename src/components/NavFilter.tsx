import Usuario from "../models/Usuario";
import Empleado from "../models/Empleado";

interface NavFilterProps {
    arrUsuarios: Usuario[];
    arrEmpleados: Empleado[];
    filterUser: Usuario[]; // Add this line
    setFilterUser: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

const NavFilter = (props: NavFilterProps) => {
    const { arrUsuarios, arrEmpleados, filterUser, setFilterUser } = props;

    const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId === "") {
            setFilterUser(arrUsuarios);
        } else {
            setFilterUser(arrUsuarios.filter(user => String(user.id) === selectedId));
        }
    }
    return (
        <nav className="navbar bg-warning mb-4 bg-opacity-75 shadow-sm rounded sticky-top top-0 border-dark border-bottom border-opacity-25">
            <div className="container-fluid">
                <div>
                    <div className="badge bg-warning-subtle px-3 text-dark text-opacity-50  d-flex align-items-center justify-content-center">
                        <span className="ms-0 fw-bold">{arrEmpleados?.length} Posts</span>
                    </div>
                    
                </div>
                <form className="d-flex justify-content-end align-items-center ms-auto" role="search">
                    <div>
                        {filterUser.length > 0 ? (
                            <span className="text-muted small">
                                Filtered by: <span className="fw-bold">{filterUser[0].name} ({filterUser[0].username})</span> 
                            </span>
                        ) : (
                            <span className="text-muted small">Showing all users</span>
                        )}
                    </div>
                    <div className="input-group input-group-sm w-50 ms-3">
                        <label htmlFor="inputUserId" className="input-group-text text-capitalize">Filter by User</label>
                        <select
                            id="inputUserId"
                            className={`form-select form-select-sm ${filterUser.length > 0 ? 'text-capitalize' : ''}`}
                            value={filterUser.length > 0 ? filterUser[0].id : "all"}
                            aria-label="Filter by User"
                            onChange={handleChangeUser}
                        >
                            <option value="all">All Users</option>
                            {arrUsuarios &&
                                arrUsuarios.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} ({item.username})
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default NavFilter;