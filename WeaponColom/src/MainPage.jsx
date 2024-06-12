import "./MainPage.css"
import { BsCart4 } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsPersonRaisedHand } from "react-icons/bs";
import  image from "./assets/image1.png"
import { useState,useEffect } from 'react';
import Modals from "./components/carrito/modals";
import ModalsRegister from "./components/registro/modalsRegister";
import ModalsSignIn from "./components/sing in/modasSignin";
import { Link } from 'react-router-dom'
import escopeta from "../src/assets/escopeta.png"
import franco from "../src/assets/franco.png"
import fusil from "../src/assets/fusil.png"
import pistola from "../src/assets/pistola.png"
import ak47 from "../src/assets/ak47.png"
import bush from "../src/assets/Bushmaster_ACR.png"
import  'aos/dist/aos.css'
import Aos from 'aos';
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

 function Mainpage(){
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    
   
    const[modal1, setModal]=useState(false)
    const[producto1,setProducto1 ]= useState([])

    const abriMOdal=(product)=>{
      setProducto1(product)
      setModal(true)
    }
    const CerrarModal=()=>{
      setModal(false)
    }
   
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
      async function obtenerProductosCompletos() {
        try {
    
          const url = 'http://localhost:8000';
          const response = await fetch(url);
          const data = await response.json();
          console.log(data)
          setProductos(data);
        } catch (error) {
          console.error('Error al obtener productos:', error);
        }
      }
      Aos.init({duration:1000})
      obtenerProductosCompletos(); // Llama a obtenerProductos() dentro de useEffect()
  
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
    function IngresarUsuario(){
      
    }

      
    return (
    <>
    <div className="Container_Header container-fluid">
    <img className="Container_header__imageLOGO  " src={image} alt="image logo" style={{ width: '90px', height: '70px' }} ></img>
    <p className="Container_Header__editTitle">WEAPON COLOM </p> 
    <div className="Container_Header__modals"> 
    <BsCart4  className="Container_Header__buycar" style={{ width: '30px', height: '50px' }}  onClick={handleShow}/>  
    <BsFillPersonPlusFill className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow1} />
    <BsPersonRaisedHand className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow2}/>
    <Modals show={show} handleClose={handleClose} />
    <ModalsRegister show1={show1} handleClose1={handleClose1}/>
    <ModalsSignIn show2={show2} handleClose2={handleClose2}/>
    </div>

    
    </div>
    <div className="redireccion " >
    <button className="edit_categorias" onClick={()=>{window.location.href ="/Pistola"}}> <img src={pistola} className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href ="/Escopeta"}} ><img src={escopeta} className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href ="/fusil"}} ><img src={fusil}  className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href="/franco"}} ><img src={franco} className="edit_image_categoria" alt="iamge weapons"></img></button>
        </div>  
        <div className="size_carrusel">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={franco} className="d-block w-100 edit2" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={escopeta} className="d-block w-100 edit2" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={fusil} className="d-block w-100 edit3" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={ak47} className="d-block w-100 edit3" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={bush} className="d-block w-100 edit3" alt="..."></img>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
<div className="dropdown OTRO">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    BUSCAR POR :
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
  <li><a className="dropdown-item" href="http://localhost:3000/">Categoria</a></li>
  <li><hr className="dropdown-divider"/></li>
  <li><a className="dropdown-item" href="http://localhost:3000/media_distancia">media distancia</a></li>
  <li><a className="dropdown-item" href="http://localhost:3000/corta_distancia">corta distancia</a></li>
  <li><a className="dropdown-item" href="http://localhost:3000/larga_distancia">larga distancia</a></li>
  <li><a className="dropdown-item" href="http://localhost:3000/arma_automatica">arma automatica</a></li>
  <li><hr className="dropdown-divider"/></li>

  
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
     <h1 className='ti'>Productos de nuestra Tienda</h1>
      {productosFiltrados.map((producto, index) => (
        <div key={index} className='decorar_insides ' data-aos="fade-down fade-up" onClick={()=>{abriMOdal(producto)}}>
          <p className='decorar_inside__titles'> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p> 
          <p><strong>Marca:</strong> {producto.marca}</p>  
          <p><strong>Categoría:</strong> {producto.categoria}</p> 
          <div className='moveCar'>
          <BsCart4 className='addCarrito' onClick={()=>{IngresarUsuario()}}  />
          </div>
        </div>
      ))}
{modal1 &&    
              <div className="style_background">
                <div className="modal1 edit_modal_producto" style={{ display: modal1 ? 'flex' : 'none', height: "300px", width: "700px" }}>
                    <div className="modal-content" style={{backgroundColor:"rgb(161, 161, 211)"}}>
                        <span className="close" onClick={CerrarModal}>&times;</span>
                        
                          <p>{producto1.nombre}</p>
                          <p><strong>Descripción:</strong> {producto1.descripcion}</p>
                          <p><strong>Precio:</strong> {producto1.precio}</p> 
                          <p><strong>Marca:</strong> {producto1.marca}</p>  
                          <p><strong>Categoría:</strong> {producto1.categoria}</p>
                    </div>
                </div>
                </div>
            }
      
      

      
    
 


    <footer className="container_footer container-fluid">
        <div className="container_footer__info container-fluid" >
        <img className="Container_header__imageLOGO1  " src={image} alt="image logo" style={{ width: '150px', height: '130px' }} ></img>
        <FaInstagram className="buttons_redes" onClick={()=>{window.location.href = "https://www.instagram.com/esteban_castro_henao?igsh=MXdmODd5c2tpNnd0cg=="}} />
        <FaWhatsapp className="buttons_redes" onClick={()=>{window.location.href = "https://www.whatsapp.com"}} />
        <ImFacebook2 className="buttons_redes" onClick={()=>{window.location.href = "https://www.facebook.com/profile.php?id=100006573377077"}} />
        <div className="other_container ">
        <p className="edit_info_container">servicio al cliente : Horario Lunes a viernes de 9:00am a 6:00pm</p>
        <hr className="edit_hr2"/>
        <p className="edit_info_container">informacion </p>
        <hr className="edit_hr2"/>
        <p className="edit_info_container onemore"> correo: escastr@gmail.com</p>
        <p className="edit_info_container onemore"> 317250283</p>
        </div>
        
        </div>
    </footer>
    </>
    )
  
}

export default Mainpage;
