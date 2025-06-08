import Usuario from "../models/Usuario";

interface NavFilterProps {
    arrUsuarios: Usuario[];
    filterUser: Usuario[]; // Add this line
    setFilterUser: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

const NavFilter = (props: NavFilterProps) => {
    const { arrUsuarios, filterUser, setFilterUser } = props;

    const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId === "") {
            setFilterUser(arrUsuarios);
        } else {
            setFilterUser(arrUsuarios.filter(user => String(user.id) === selectedId));
        }
    }
    return (
        <nav className="navbar bg-body-tertiary mb-4 bg-opacity-25">
            <div className="container-fluid">
                <form className="d-flex justify-content-end align-items-center ms-auto" role="search">
                    <div className="input-group input-group-sm ms-auto">
                        <label htmlFor="inputUserId" className="input-group-text text-capitalize">Filter by User</label>
                        <select
                            id="inputUserId"
                            className={`form-select form-select-sm`}
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