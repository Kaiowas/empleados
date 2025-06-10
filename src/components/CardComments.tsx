// import Comment from "../models/Comment";
import Comment from "../models/Comment";
import Empleado from "../models/Empleado";


interface NavFilterProps {
    arrComments: Comment[];
    empleado: Empleado;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardComments = (props: NavFilterProps) => {
    const { arrComments, setShowComments, empleado } = props;

    const handleClose = () => {
        setShowComments(false);
    };

    return (
        <>
            <div className="">
                <h5 className="text-center text-uppercase text-dark fw-bold d-block border-bottom border-secondary pb-1 mb-2">Comments ({arrComments.length})</h5>
                <p className="text-center  text-secondary small  m-0 p-1 lh-sm d-none">{empleado.title}</p>
            </div>
            <ol className="list-group " style={{ maxHeight: '157px', overflowY: 'auto' }}>

                {Array.isArray(arrComments) && arrComments.map((comment: Comment) => (

                    <li key={comment.id} className="list-group-item p-1 rounded-0 bg-warning bg-opacity-25 d-flex justify-content-between align-items-center">
                        <div className=" me-auto">
                            <div className="fw-bold text-center text-capitalize">{comment.name}</div>
                            <div className="small text-center ">{comment.email}</div>
                            <p className="small text-center p-2 lh-sm text-muted m-0">{comment.body}</p>
                        </div>
                        <span className="badge text-bg-primary rounded-pill d-none">14</span>
                    </li>

                ))}
            </ol>
            <div className="position-absolute top-0 start-100 translate-middle">
                <button className="btn-close bg-danger rounded-circle p-2 shadow small" onClick={handleClose}></button>
            </div>


        </>
    )
}
export default CardComments;