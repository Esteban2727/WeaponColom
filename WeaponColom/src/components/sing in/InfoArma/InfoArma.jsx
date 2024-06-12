import React, { useState, useEffect } from 'react';
import { BsCart4 } from 'react-icons/bs';

export default function Information() {
  const [products1, setProduct1] = useState([]);
  const NomArma = window.location.pathname;
  console.log(NomArma)

  useEffect(() => {
    async function obtenerProductos() {
      console.log(NomArma);
      try {
        // Obtiene los productos de la API utilizando la ruta de la URL
        const url = `http://localhost:8000${NomArma}`;
        const response = await fetch(url);
        const data = await response.json();
        setProduct1(data);
        console.log(data)
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }
    obtenerProductos();
  }, [NomArma]); // Agrega NomArma como dependencia para que useEffect se vuelva a ejecutar cuando cambie

  return (
    <div>
      {products1.map((producto, index) => (
        <div key={index} className='decorar_inside'>
          <p className='decorar_inside__titles'>{producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <div className='moveCar'>
            <BsCart4 className='addCarrito' />
          </div>
        </div>
      ))}
    </div>
  );
}