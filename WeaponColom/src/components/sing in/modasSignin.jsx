import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
export default function ModalsSignIn({show2,handleClose2}){


    return <Modal show={show2} onHide={handleClose2}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title'>Ingresar</Modal.Title>
      
      
      <hr className='edit_hr'></hr>
      
      <div className='input'>
      <input type="number" className='name1' placeholder='Número de celular o correo electrónico'></input>
      <input  type="password"className='name1' placeholder='Contraseña '></input>
      <button type="button" class="btn btn-success">INGRESAR</button>
      

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