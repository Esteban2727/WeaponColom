import React, { useEffect, useState } from 'react';
import "./fusil.css"
import { BsCart4 } from "react-icons/bs"
import Carrito from "../components/carrito/modals"

import  'aos/dist/aos.css'
import Aos from 'aos';
export default  function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  
  const tipoArma = window.location.pathname.replace('/', ''); 
  useEffect(() => {
    async function obtenerProductos() {
      try {
        // Obtiene el tipo de la URL
        const url = `http://localhost:8000/${tipoArma}`;
        const response = await fetch(url);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }
    Aos.init({duration:1000})
    obtenerProductos(); // Llama a obtenerProductos() dentro de useEffect()

    // No es necesario agregar 'obtenerProductos' a la lista de dependencias ya que no tiene dependencias externas
  }, []);
  const handleBusquedaChange = (event) => {
    const save= event.target.value;
    const done = save.charAt(0).toUpperCase() + save.slice(1);
    setBusqueda(done)
    
   
   
  };
  
  
    console.log(productos)
    const productosFiltrados = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        
      )
    });
  return (
    <div className='decorar'>
    

      <div className="dropdown OTRO">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    BUSCAR OTRAS ARMAS
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
  <li><a className="dropdown-item" href="http://localhost:3000/">Incio</a></li>
    <li><a className="dropdown-item active" href="http://localhost:3000/franco">Franco </a></li>
    <li><a className="dropdown-item" href="http://localhost:3000/Escopeta">Escopeta</a></li>
    <li><a className="dropdown-item" href="http://localhost:3000/fusil">fusil</a></li>
    <li><a className="dropdown-item" href="http://localhost:3000/Pistola">Pistola</a></li>
    

  </ul>
  <div className='edit_input'>
      <input
        type="text"
        placeholder="Buscar por nombre de arma"
        className='editar_inputBusqueda'
        
        onChange={handleBusquedaChange}
      />
      
      </div>
</div>

      <h1 className='ti'>Productos de {tipoArma}</h1>

      {productosFiltrados.map((producto, index) => (
        <div key={index} className='decorar_inside ' data-aos="fade-down">
          <p className='decorar_inside__titles'> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p> 
          <p><strong>Marca:</strong> {producto.marca}</p>  
          <p><strong>Categoría:</strong> {producto.categoria}</p> 
          <div className='moveCar'>
          <BsCart4 className='addCarrito'/>
          </div>
        </div>
      ))}
    </div>
  ); 
}