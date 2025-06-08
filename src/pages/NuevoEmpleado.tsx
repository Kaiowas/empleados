import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import EmpleadosService from "../services/EmpleadosService";
import UsuariosService from "../services/UsuariosService";
import Usuario from "../models/Usuario";
import { useNavigate } from "react-router-dom";

const NuevoEmpleado = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const [arrUsuarios, setArrUsuarios] = useState<Usuario[]>([]);

    const [usuariosLoaded, setUsuariosLoaded] = useState<boolean>(false);

    const fetchData = async () => {
        if (!usuariosLoaded) {
            const response = await (new UsuariosService()).getAll();
            setArrUsuarios(response.data);
            setUsuariosLoaded(true);
        }
    }

    const onSubmit = async (data: any) => {
        console.log(data);
        return
        await (new EmpleadosService()).create(data);
        alert('Empleado creado correctamente');
        navigate('/');
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="container w-75">
                <div className="row g-3">
                    <div className="col">
                        <label htmlFor="inputTitle" className="form-label text-capitalize">title <span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-lg" autoComplete="false" autoFocus id="inputTitle" {...register('title', { required: true })} />
                    </div>
                    <div className="col">
                        <label htmlFor="inputUserId" className="form-label text-capitalize">user <span className="text-danger">*</span></label>
                        <select
                            id="inputUserId"
                            className="form-select form-select-lg"
                            {...register('userId', { required: true })}
                        >
                            <option value="">Seleccione un usuario</option>
                            {arrUsuarios &&
                                arrUsuarios.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} ({item.username})
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="inputBody" className="form-label text-capitalize">body <span className="text-danger">*</span></label>
                    <textarea className="form-control" id="inputBody" style={{ maxHeight: "200px" }} aria-label="With textarea" {...register('body', { required: true })}></textarea>
                    {/* <input type="text" className="form-control" id="inputBody" {...register('body')} /> */}
                </div>
                <div className="mt-3 d-grid">
                    <button type="submit" className="btn btn-primary btn-lg shadow">Guardar</button>
                </div>

            </form>
        </div>
    );
}

export default NuevoEmpleado;