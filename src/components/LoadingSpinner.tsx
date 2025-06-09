
const LoadingSpinner = () => {
    return (
        <>
            <div className='position-fixed w-100 h-100 top-0 start-0 end-0 bottom-0 z-3 bg-white opacity-75 text-center d-flex justify-content-center align-items-center' style={{ cursor: "wait" }}>
                <div className='rounded shadow-lg bg-white p-2 border-info  border-1 align-items-center d-flex'>
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

        </>
    )
}
export default LoadingSpinner;