import { useState } from "react"
import NavFilter from "../components/NavFilter";
import { useQuery } from "@tanstack/react-query";
import EmpleadosService from "../services/EmpleadosService";
import UsuariosService from "../services/UsuariosService";
import Usuario from "../models/Usuario";
import Comment from "../models/Comment";
import LoadingSpinner from "../components/LoadingSpinner";
import CardComments from "../components/CardComments";
//import bootstrap from 'bootstrap'; // Ensure you have bootstrap installed
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const EmpleadosList = () => {

    const [arrComments, setArrComments] = useState<Comment[]>([]);
    const [filterUser, setFilterUser] = useState<Usuario[]>([]);
    const [showComments, setShowComments] = useState<boolean>(false);
    const [isLoadingComments, setLoadingComments] = useState<boolean>(false);

    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    /* tooltipTriggerList.addEventListener('hidden.bs.tooltip', () => {
        // do something...
    }) */

    const fetchDataFilter = async (data: any) => {
        let response;
        if (data[0]) {
            response = await (new EmpleadosService()).getByUser(data[0]).then((res) => {
                return res;
            }).catch((error) => {
                console.error("Error fetching empleados by user:", error);
                return { data: [] }; // Return an empty array on error
            });

        } else {
            response = await (new EmpleadosService()).getAll().then((res) => {
                return res;
            }).catch((error) => {
                console.error("Error fetching empleados by user:", error);
                return { data: [] }; // Return an empty array on error
            });
        }
        return response.data;
    }

    const fetchDataUsers = async () => {
        const response = await (new UsuariosService()).getAll();
        return response.data;
    }

    const fetchDataComments = async (data: any) => {
        setLoadingComments(true);
        const response = await (new EmpleadosService()).getCommentsByPost(data).then((res) => {
            console.log(res.data);
            return res;
        }).catch((error) => {
            console.error("Error fetching comments by post:", error);
            return { data: [] }; // Return an empty array on error
        });

        setArrComments(response.data);
        setShowComments(true);
        setLoadingComments(false);
    }

    const handleOpenComments = (empleado: any) => {
        fetchDataComments(empleado);
    }

    const { data: usuarios, isLoading, error } = useQuery({
        queryKey: ["usuarios"],
        queryFn: () => fetchDataUsers(),
        staleTime: Infinity
    });

    const { data: dataFilter } = useQuery({
        queryKey: ["dataFilter", { filterUser }],
        queryFn: () => fetchDataFilter(filterUser),
        staleTime: Infinity,
        enabled: !!filterUser // Only run this query if filterUser is not empty
    });

    if (isLoading) return <LoadingSpinner fixed={true} />;
    if (error) return <div>Error al cargar los usuarios</div>;

    return (
        <>
            <NavFilter arrUsuarios={usuarios} arrEmpleados={dataFilter} filterUser={filterUser} setFilterUser={setFilterUser} />
            {isLoading && <LoadingSpinner />}
            <div className="container">
                <div className='empleados-list row row-cols-1 row-cols-md-3 g-2'>
                    {dataFilter?.map((empleado: any) => (
                        <div key={empleado.id} className="">

                            <div className=' card text-bg-warning ' >
                                <div className='card-body align-items-bottom d-flex flex-column justify-content-center position-relative' style={{ height: '300px' }}>
                                    {isLoadingComments && empleado.id === arrComments[0]?.postId && <LoadingSpinner fixed={false} />}
                                    {arrComments && arrComments.length > 0 && arrComments[0].postId == empleado.id && showComments ? (
                                        <CardComments arrComments={arrComments} setShowComments={setShowComments} empleado={empleado} />
                                    ) : (
                                        <>
                                            <h5 className='card-title text-capitalize text-center text-truncate'>{empleado.title}</h5>
                                            <h6 className='card-subtitle mb-2 text-muted d-none'>{empleado.userId}</h6>
                                            <p className='card-text text-muted py-2 my-2 small text-capitalize lh-base text-truncate1'>{empleado.body}</p>
                                            <div className="d-grid gap-2 mt-2">
                                                <button onClick={() => handleOpenComments(empleado)} data-bs-toggle="tooltip" data-bs-title="Default tooltip" type="button" className="stretched-link btn btn-warning  shadow">Show Comments</button>
                                            </div>

                                        </>
                                    )}

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