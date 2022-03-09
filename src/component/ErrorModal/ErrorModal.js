import React from 'react';
import { useState } from 'react';
import {Modal, ModalBody} from 'reactstrap';

const ErrorModal = (props) => {

    const [modal, setModal] = useState(true);

    return(
        <Modal isOpen={modal}>
            <ModalBody>
                <div style={{ textAlign:"center"}}>
                    <span className="fa fa-lg fa-times-circle " style={{color:'red'}}>   {props.message}</span>
                    <span className="float-right fa fa-times close" onClick={() => props.closeHandler()}></span>    
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ErrorModal;