import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const ModalComments = () => {
  const [modal, setModal] = useState<any | null>(null);
  const modalRef = useRef(null);
  const exampleModal = useRef() as React.MutableRefObject<HTMLDivElement | null>;
  const [showModal, setShowModal] = useState(true);
  //const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const myModal = modal || new Modal(exampleModal.current as HTMLDivElement, {
    backdrop: true,
    keyboard: false,
    focus: true,
  });

  /* useEffect(() => {
    return setModal(new Modal(exampleModal.current as HTMLDivElement, {
      backdrop: 'static',
      keyboard: false,
      focus: true,
    }));
  }, [exampleModal, showModal]);   */

  useEffect(() => {
    myModal.show();
  }, []);

  return (
    <>
      <button
        type='button'
        className='btn btn-primary m-1'
      // onClick={() => myModal.show()}
      >
      </button>
      <div className="modal" id="exampleModal"  >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalComments;