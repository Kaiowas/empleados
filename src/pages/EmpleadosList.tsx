import { useEffect, useState } from "react"
import NavFilter from "../components/NavFilter";
import EmpleadosService from "../services/EmpleadosService";
import UsuariosService from "../services/UsuariosService";
import Usuario from "../models/Usuario";

const EmpleadosList = () => {

    const [arrEmpleados, setArrEmpleados] = useState([]);
    const [arrUsuarios, setArrUsuarios] = useState<Usuario[]>([]);
    const [filterUser, setFilterUser] = useState<Usuario[]>([]);

    const fetchData = async () => {
        const response = await (new EmpleadosService()).getAll();
        setArrEmpleados(response.data);
    }

    const [usuariosLoaded, setUsuariosLoaded] = useState<boolean>(false);

    const fetchDataFilter = async (data: any) => {
        let response;
        if (data[0]) {
            response = await (new EmpleadosService()).getByUser(data[0]);
        } else {
            response = await (new EmpleadosService()).getAll();
        }

        setArrEmpleados(response.data);
    }

    const fetchDataUsers = async () => {
        if (!usuariosLoaded) {
            const response = await (new UsuariosService()).getAll();
            setArrUsuarios(response.data);
            setUsuariosLoaded(true);
        }
    }

    useEffect(() => {
        fetchData();
        fetchDataUsers();
    }, []);

    useEffect(() => {
        fetchDataFilter(filterUser);
    }, [filterUser]);

    return (
        <>
            <NavFilter arrUsuarios={arrUsuarios} filterUser={filterUser} setFilterUser={setFilterUser} />
            <div className="container">
                <div className='empleados-list row row-cols-1 row-cols-md-4 g-3'>
                    {arrEmpleados.map((empleado: any) => (
                        <div key={empleado.id} className="">
                            <div className=' card  h-100'>
                                <div className='card-body'>
                                    <h5 className='card-title text-capitalize text-center text-truncate'>{empleado.title}</h5>
                                    <h6 className='card-subtitle mb-2 text-muted d-none'>{empleado.userId}</h6>
                                    <p className='card-text text-muted small'>{empleado.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default EmpleadosList