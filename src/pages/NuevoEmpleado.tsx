import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import clsx from 'clsx';
import EmpleadosService from "../services/EmpleadosService";
import UsuariosService from "../services/UsuariosService";
import Usuario from "../models/Usuario";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const NuevoEmpleado = () => {
    const debug = false;
    const autoCompleteForm = debug ? true : false;


    const navigate = useNavigate();
    const [arrUsuarios, setArrUsuarios] = useState<Usuario[]>([]);
    const [usuariosLoaded, setUsuariosLoaded] = useState<boolean>(false);

    const { register, handleSubmit, formState } = useForm({
        mode: "onChange",
        defaultValues: autoCompleteForm
            ? {
                title: "Título de prueba",
                userId: 1,
                body: "Integer facilisis viverra consequat. Suspendisse ultricies justo lorem, vel posuere nunc euismod ac. Curabitur et quam at nulla dictum eleifend. Nulla eu gravida lorem. Praesent."
            }
            : {}
    });

    const fetchData = async () => {
        if (!usuariosLoaded) {
            const response = await (new UsuariosService()).getAll();
            setArrUsuarios(response.data);
            setUsuariosLoaded(true);
        }
    }

    //const { isLoading, error, data } = useQuery(['usuarios'], fetchData);

    const { data: usuarios, isLoading, error } = useQuery({
        queryKey: ["usuarios"],
        queryFn: () => fetchData(),
        staleTime: Infinity
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        if (!debug) {
            await (new EmpleadosService()).create(data);
            alert('Empleado creado correctamente');
            navigate('/');
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error al cargar los usuarios</div>;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="container w-75">
                <div className="row g-3">
                    <div className="col">
                        <label htmlFor="inputTitle" className="form-label text-capitalize">title <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${formState.touchedFields?.title && formState.errors?.title === undefined ? "is-valid" : "is-invalid"}`}
                            autoComplete="false"
                            autoFocus
                            id="inputTitle"
                            {...register('title', { required: true, minLength: 15 })}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="inputUserId" className="form-label text-capitalize">user <span className="text-danger">*</span></label>
                        <select
                            id="inputUserId"
                            className={`form-select form-select-lg ${formState.touchedFields?.userId && formState.errors?.userId === undefined ? "is-valid" : "is-invalid"}`}
                            {...register('userId', { required: true })}
                            defaultValue={autoCompleteForm ? "2" : ""}
                        >
                            <option value="">Select User</option>
                            {arrUsuarios &&
                                usuarios?.map((item: any) => (
                                    <option key={item.id} value={item.id} >
                                        {item.name} ({item.username})
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="inputBody" className="form-label text-capitalize">body <span className="text-danger">*</span></label>
                    <textarea className={`form-control form-control-sm ${formState.touchedFields?.body && formState.errors?.body === undefined ? "is-valid" : "is-invalid"}`} id="inputBody" style={{ maxHeight: "150px", height: "100px" }} aria-label="With textarea" {...register('body', { required: true, minLength: 20, maxLength: 200 })}></textarea>
                </div>
                <div className="mt-3 d-grid">
                    <button
                        type="submit"
                        className={clsx(`btn  btn-lg shadow fw-bold`, formState.isValid ? `btn-primary` : `btn-danger opacity-25`)}
                        disabled={!formState.isValid}
                    >
                        Guardar
                    </button>
                </div>

            </form >
        </div >
    );
}

export default NuevoEmpleado;