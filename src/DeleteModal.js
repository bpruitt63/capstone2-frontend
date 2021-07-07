import React, { useState } from 'react';
import './static/styles/Trips.css';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


/** Modal to confirm deletion of a saved trip */
function DeleteModal({deleteTrip, username, id}) {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" className='toggle' onClick={toggle}>
                Delete Trip
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    Are you sure you want to permanently delete this trip?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" 
                            onClick={() => deleteTrip(username, id)}>
                        Delete
                    </Button>{' '}
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DeleteModal;