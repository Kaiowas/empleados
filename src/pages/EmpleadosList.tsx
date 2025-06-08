import { useEffect, useState } from "react"
import EmpleadosService from "../services/EmpleadosService";

const EmpleadosList = () => {

    const [arrEmpleados, setArrEmpleados] = useState([]);

    const fetchData = async () => {
        const response = await (new EmpleadosService()).getAll();
        //console.log(response.data);
        setArrEmpleados(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
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
    )
}

export default EmpleadosList