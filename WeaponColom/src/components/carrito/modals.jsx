import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modal.css"

import { useState } from 'react';
export default function Modals({show,handleClose }){
 

    return <Modal show={show} onHide={handleClose}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title'>Carrito de compras</Modal.Title>
      <hr className='edit_hr'></hr>
      
      <div className='input'>

      <button type="button" className="btn btn-success" >pagar</button>

      </div>
      </div>
    
    <Modal.Body>
        
    </Modal.Body>
    {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer> */}
  </Modal>
}