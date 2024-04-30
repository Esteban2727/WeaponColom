import "./sesionIniciada.css"
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useState,useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import Aos from 'aos';

export default function  PageOne(){ 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function obtenerProductosCompletos() {
          try {
            // Obtiene el tipo de la URL
            console.log("enviando")
            const url = 'http://localhost:8000/prueba';
            console.log("recibiendo")
            const response = await fetch(url);
            const data = await response.json();
            setProductos(data);
            console.log(data)
          } catch (error) {
            console.error('Error al obtener productos:', error);
          }
        }
       
        obtenerProductosCompletos(); // Llama a obtenerProductos() dentro de useEffect()
    
        // No es necesario agregar 'obtenerProductos' a la lista de dependencias ya que no tiene dependencias externas
      }, []);

  return(
        <div className="containerPrincipal">
        <div className=" containerInformacion">
        <div className="containerTel">
            <div className="edit_contact">
        <BsTelephoneFill  className="edit_tel"/>
        <p>Telefono:</p><a href="#" className="edit_url">3172650283</a>
        <MdEmail className="edit_tel"/>

        <p>Email:</p><a href="#" className="edit_url">escastr@gmail.com</a>
        </div>
        <div className="edit_cerrarSesion">
        <p>Bienvenido,</p>
       <a href="#" className="edit_url">cerrar sesion</a>
        </div>
        </div>
        <div className=" containerHeader">
            <div className="left">
            <h1>weaponColom </h1>
            <input type="text" className="edit_inputww" placeholder="Busqueda en Catalogo"></input>
            <FaSearch className="edit-Search" />
            </div>
            
        </div>
   
        <div className="container_sudirecciones">
       
        <div className="edit_reDIRE">
        
        
  <div
  
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
   >
      <button className="acomodar_container">Hover over me</button>
      <FaCaretDown />
    </div>
    <div
      onMouseEnter={() => setIsDropdownOpen1(true)}
      onMouseLeave={() => setIsDropdownOpen1(false)}
   >
      <button className="acomodar_container">Hover over me</button>
      <FaCaretDown />
    </div>
    <div
      onMouseEnter={() => setIsDropdownOpen2(true)}
      onMouseLeave={() => setIsDropdownOpen2(false)}
   >
      <button className="acomodar_container">Hover over me</button>
      <FaCaretDown />
      
    </div>


        </div>
        {/* ssssssssssssssssssssssssssssssssss */}
<div className="other"  onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}>
    {isDropdownOpen && (
        <div className="acomodar">
          <p>Dropdown content here</p>
        </div>
      )}
      </div>

        {/* ssssssssssssssssssssssssssssssssss */}
{/* ssssssssssssssssssssssssssssssssss */}
<div className="other"  onMouseEnter={() => setIsDropdownOpen1(true)}
      onMouseLeave={() => setIsDropdownOpen1(false)}>
    {isDropdownOpen1 && (
        <div className="acomodar">
          <p>Dropdown content here</p>
        </div>
      )}
      </div>

        {/* ssssssssssssssssssssssssssssssssss */}
        <div className="other"  onMouseEnter={() => setIsDropdownOpen2(true)}
      onMouseLeave={() => setIsDropdownOpen2(false)}>
    {isDropdownOpen2 && (
        <div className="acomodar">
          <p>Dropdown content here</p>
        </div>
      )}
      <hr className="eddit_hr_hr"></hr>
      </div>
     
        </div>
        <div className="one">
        <div className="filtrado">
      <h2>Filtrado Por :</h2>
   
        </div>
        <div className="container">
    
        {productos.map((producto, index) => (
          <div key={index} className='decorar_insides1'>
            <p className='decorar_inside__titles'> {producto.nombre}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> {producto.precio}</p> 
            <p><strong>Marca:</strong> {producto.marca}</p>  
            <p><strong>Categoría:</strong> {producto.categoria}</p> 
  
          </div>
          
        ))}
        </div>
        

        </div>
    
        </div>

        </div>
    )
}