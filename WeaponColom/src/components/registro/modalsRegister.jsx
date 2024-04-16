import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./register.css"

import { useState } from 'react';
export default function ModalsRegister({show1,handleClose1}){
 
    return <Modal show={show1} onHide={handleClose1}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title1'>Registrarte</Modal.Title>
      <p className='edit'>Es rápido y fácil.</p>
      
      <hr className='edit_hr'></hr>
      
      <div className='input_1'>
      <input type='text' className='name' placeholder='Nombre' ></input>
      <input type="text"  className='name' placeholder='Apellido'></input>
      <input type="email" className='name1' placeholder='Número de celular o correo electrónico' onChange={e=>{email(e)}}></input>
      <input  type="password"className='name1' placeholder='Contraseña nueva'></input>
      <div className='button1'>
      <Button onClick={()=>{GetData()}} >REGISTRARSE</Button>
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