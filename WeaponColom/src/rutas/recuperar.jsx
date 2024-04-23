import { useState } from "react"
import "./recuperar.css"
import { HiBarsArrowDown } from "react-icons/hi2";
export default function Recuperar(){

    const [getValues,SetGetvalues]=useState({
        correo:"",
        
      })
      const [getcodigo ,SetGetcodigo]=useState({
        codigo:"",
        passwordre:"",
        confirmPassword:"",
        
      })
      function GetCodigo(event){
        const {name,value}= event.target
        SetGetcodigo({
          ...getcodigo,
          [name]:value,
        })
      }
    
     function GetEmail(event){
      const {name,value}= event.target
      SetGetvalues({
        ...getValues,
        [name]:value,
      })
    }
  
    const CodeHanlde=async(e)=>{
      e.preventDefault()

      if(!getcodigo.passwordre || !getcodigo.confirmPassword || !getcodigo.codigo){
        return alert("no puede dejar campos vacios")
      }
      else if(getcodigo.passwordre.includes(" ") ){
        return alert("la contraseña no puede tener espacios")
      }
      else if( getcodigo.passwordre!= getcodigo.confirmPassword){
        return alert("la contraseña y la confirmación no son las mismas")
      }
      console.log(getcodigo)
      const response = await fetch('http://localhost:8000/recuperarPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        mode:'cors',
        body: JSON.stringify(getcodigo), 
      })

    }

 
    const recuperarHanlde=async(e)=>{
        e.preventDefault()
        console.log(getValues)
        const response = await fetch('http://localhost:8000/recuperarPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          mode:'cors',
          body: JSON.stringify(getValues), 
        })

      }
  
    return <div className="container_main_recup" >


        <div className="container_main_recup__tarjeta" >
            <p className="title_rec">Recuperando contraseña</p>
        <input type="email"  name='correo'  value={getValues.email2}    placeholder='Número de celular o correo electrónico'className='name11' onChange={GetEmail} ></input>
        <input type="password"  name='passwordre'  value={getcodigo.passwordre}    placeholder='contraseña'className='name11' onChange={GetCodigo} ></input>
        <input type="password"  name='confirmPassword'  value={getcodigo.confirmPassword}    placeholder='confirmar contraseña'className='name11' onChange={GetCodigo} ></input>
        


        <input  type="number"   name='codigo' value={getcodigo.codigo}  placeholder='Codigo ' className='name11' onChange={GetCodigo} ></input>
        <div className="move">
        <button type="button" className="btn btn-success edit_button1" onClick={CodeHanlde} onChange={CodeHanlde} >Recupera</button>
        <button type="button" className="btn btn-success edit_button1" onClick={recuperarHanlde} >enviar codigo</button>
        </div>



        </div>
       
      
       

    </div>
}