import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./sigin.css"
import { useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
export default function ModalsSignIn({show2,handleClose2}){


    return <Modal show={show2} onHide={handleClose2}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title_Ingresar ' style={{fontSize:'30px', fontWeight:'bold' }}>INGRESAR</Modal.Title>
      
      
      <hr className='edit_hr'></hr>
      <div className='cuadro'>
      <IoPersonCircle  className='edit_log'/>
      <div className='input_2 ' >
      <input type="email" className='name11' placeholder='Número de celular o correo electrónico'></input>
      <input  type="password"className='name11' placeholder='Contraseña '></input>
      <div className='button2'>
      <button type="button" class="btn btn-success edit_button">INGRESAR</button>
      </div>
      </div>
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