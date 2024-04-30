import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./register.css"
import Swal from "sweetalert2"
import { useState } from 'react';
export default function ModalsRegister({show1,handleClose1}){

  const[values1, SetValues1] = useState({
    correo:"",
    password:"",
    nomusuario:"",
    nombre:"",
    apellido:"",
    
  })

 function catchHandler(event){
  const {name,value}= event.target
  SetValues1({
    ...values1,
    [name]:value
  })

}
  
  
const registerHandler=async(e)=>{
  
  
  if( values1.correo== "" ||  values1.nombre== "" ||  values1.apellido== "" || values1.nomusuario=="" || values1.password== ""){
    return alert("no puede dejar campos vacios ")
  }
 else if(values1.nomusuario.includes(" ") ){
    return alert("no puede tener espacios el nombre de usuario ")
  }
  else if(values1.correo.includes(" ") ){
    return alert("no puede tener espacios el correo ")
  }
  else if(values1.password.includes(" ") ){
    return alert("no puede tener espacios la contraseña ")
  }
  e.preventDefault()
    
    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(values1), 
    })
  console.log(response)
  if(response.status==200){
    Swal.fire({
      title: "Good job!",
      text: "has registrado con exito",
      icon: "success"
    });
    console.log(response)
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!, error al registrarse",
    
    });
  }
 
  
}


    return <Modal show={show1} onHide={handleClose1}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title1' style={{fontSize:'30px', fontWeight:'bold' }}>Registrarte</Modal.Title>
      <p className='edit'>Es rápido y fácil.</p>
      
      <hr className='edit_hr'></hr>
      <div className='cuadro1'>
      <div className='input_1'>
      <input type='text' className='name'  name='nombre' value={values1.nombre} placeholder='Nombre'onChange={catchHandler} ></input>
      <input type="text"  className='name' name='apellido' value={values1.apellido} placeholder='Apellido' onChange={catchHandler}></input>
      <input type="text"  className='name' name='nomusuario' value={values1.nomusuario} placeholder='Nombre de usuario' onChange={catchHandler}></input>
      <input type="email"  name='correo'  value={values1.correo} className='name1' placeholder='Número de celular o correo electrónico'onChange={catchHandler} ></input>
      <input  type="password"className='name1' name='password' value={values1.password} placeholder='Contraseña nueva' onChange={catchHandler}></input>
      <div className='button1'>
      <Button onClick={registerHandler}  >REGISTRARSE</Button>
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