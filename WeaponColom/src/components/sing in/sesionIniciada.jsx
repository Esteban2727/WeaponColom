import "./sesionIniciada.css"
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useState,useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import Aos from 'aos';
import { BsFillHouseCheckFill } from "react-icons/bs";

import Header from "../Header";


export default function PageOne() {
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
 
  const [productos1, setProductos1] = useState([]);

  
  const [productos, setProductos] = useState(() => {
    const storedProductos = localStorage.getItem('productos');
    return storedProductos ? JSON.parse(storedProductos) : [];
  });
  
  const [resultado, setResultado] = useState(null);
  const [resultado1, setResultado1] = useState({});
  const [loading, setLoading] = useState(true);

  // Manejador de clics en el botón de "me gusta"
  const handleLike = async (codigo, e) => {
    e.stopPropagation();

    const currentProducto = productos.find(producto => producto.codigo === codigo);
    const updatedLike = !currentProducto.like;

    try {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8000/prueba';
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          codigo,
          like: updatedLike
        })
      });

      if (!response.ok) {
        throw new Error('Error updating like');
      }

      const result = await response.json();

      // Update states based on server response
      if (Array.isArray(result) && result.length > 0) {
        setResultado(result[0].calificacion);

        // Update productos based on server response
        const updatedProductos = productos.map(producto =>
          producto.codigo === result[0].codigo && result[0].idusuario
            ? { ...producto, like: result[0].calificacion }
            : producto
        );
        setProductos(updatedProductos);

        const updatedResultado1 = { ...resultado1, [result[0].codigo]: [result[0].calificacion, result[0].idusuario] };
        setResultado1(updatedResultado1);

        localStorage.setItem('productos', JSON.stringify(updatedProductos));
        localStorage.setItem('resultado1', JSON.stringify(updatedResultado1));

      } else if (!Array.isArray(result) && typeof result === 'object') {
        setResultado(result.calificacion);

        const updatedProductos = productos.map(producto =>
          producto.codigo === codigo
            ? { ...producto, like: result[0].calificacion }
            : producto
        );
        setProductos(updatedProductos);

        const updatedResultado1 = { ...resultado1, [codigo]: result.calificacion };
        setResultado1(updatedResultado1);

        localStorage.setItem('productos', JSON.stringify(updatedProductos));
        localStorage.setItem('resultado1', JSON.stringify(updatedResultado1));
      }

      console.log('Updated like:', result);

    } catch (error) {
      console.error('Error sending like:', error);
    }
  };

  useEffect(() => {
    const storedProductos = localStorage.getItem('productos');
    const storedResultado1 = localStorage.getItem('resultado1');
    if (storedProductos) {
      
      
      setProductos(JSON.parse(storedProductos));
    }
    if (storedResultado1) {
      setResultado1(JSON.parse(storedResultado1));
    }
    setLoading(false); 
  }, []);

  useEffect(() => {
    async function obtenerProductosCompletos() {
      const token = localStorage.getItem('token');
      try {
        const url = 'http://localhost:8000/prueba';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    obtenerProductosCompletos();
  }, []);
 

  const closeSession = () => {
    if (window.location.pathname === "/prueba") {
      localStorage.setItem('token', false);
    }
  };

  const onAddProducts = (product) => {
    const existingProduct = productos1.find(item => item.codigo === product.codigo);

    if (existingProduct) {
      const updatedProducts = productos1.map(item =>
        item.codigo === product.codigo
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setProductos1(updatedProducts);
    } else {
      setProductos1([...productos1, { ...product, quantity: 1 }]);
    }

    setTotal(total + product.precio);
    setCountProducts(countProducts + 1);
  };

  function visualizar(nombre){
    const remplazar = nombre.replace(/ /g, '#');

    
    window.location.href =`/prueba/${remplazar}` 
  }
  return (
    <div className="containerPrincipal">
      <div className="containerInformacion">
        <div className="containerTel">
          <div className="edit_contact">
            <BsTelephoneFill className="edit_tel" />
            <p>Telefono:</p><a href="#" className="edit_url">3172650283</a>
            <MdEmail className="edit_tel" />
            <p>Email:</p><a href="#" className="edit_url">escastr@gmail.com</a>
          </div>
       
          <div className="edit_cerrarSesion">
            <p>Bienvenido,</p>
            <a href="/" className="edit_url" onClick={closeSession}>cerrar sesion</a>
          </div>
        </div>
        <div className="containerHeader">
          <div className="left">
            <h1>weaponColom </h1>
            <input type="text" className="edit_inputww" placeholder="Busqueda en Catalogo"></input>
            <FaSearch className="edit-Search" />
          </div>
          <Header
            productos={productos1}
            setProductos={setProductos1}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
          <BsFillHouseCheckFill className="edit_home_profile" onClick={() => { window.location.href = "/pruebaPerfil" }} />
        
        </div>
     

        <div className="container_sudirecciones">
          <div className="edit_reDIRE">
            <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <button className="acomodar_container">Hover over me</button>
              <FaCaretDown />
            </div>
            <div onMouseEnter={() => setIsDropdownOpen1(true)} onMouseLeave={() => setIsDropdownOpen1(false)}>
              <button className="acomodar_container">Hover over me</button>
              <FaCaretDown />
            </div>
            <div onMouseEnter={() => setIsDropdownOpen2(true)} onMouseLeave={() => setIsDropdownOpen2(false)}>
              <button className="acomodar_container">Hover over me</button>
              <FaCaretDown />
            </div>
          </div>
          <div className="other" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            {isDropdownOpen && (
              <div className="acomodar">
                <p>Dropdown content here</p>
              </div>
            )}
          </div>
          <div className="other" onMouseEnter={() => setIsDropdownOpen1(true)} onMouseLeave={() => setIsDropdownOpen1(false)}>
            {isDropdownOpen1 && (
              <div className="acomodar">
                <p>Dropdown content here</p>
              </div>
            )}
          </div>
          <div className="other" onMouseEnter={() => setIsDropdownOpen2(true)} onMouseLeave={() => setIsDropdownOpen2(false)}>
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
            <h2 >Filtrado Por :</h2>
          </div>
          <div className="container">
          {!loading && productos.map((producto) => (
        <div key={producto.codigo} className='decorar_insides1' onClick={() => onAddProducts(producto)}>
          <p className='decorar_inside__titles'> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <button
            className={producto.like ? 'edit_buton_Gustar' : 'edit_buton_noGustar'}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(producto.codigo, e);
            }}
          >
            {producto.like ?  'gusta' : 'no gusta'}
          </button>
                <button className="botonVisualizar" onClick={()=>{visualizar(producto.nombre)}}>visualizar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
