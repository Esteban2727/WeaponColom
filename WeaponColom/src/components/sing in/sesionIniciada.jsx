import "./sesionIniciada.css";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Header from "../Header";
import SelectableStars from "../stars/Stars";

export default function PageOne() {
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [weapons, setWeapons] = useState();
  const [productos1, setProductos1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingStars, setRatingStars] = useState(0);

  const navigate = useNavigate();

  const getAllWeapons = async () => {
    try {
      const result = await fetch("http://localhost:8000", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const weapons = await result.json();
      setWeapons(weapons);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWeapons();
  }, []);

  const closeSession = () => {
    if (window.location.pathname === "/weapons") {
      localStorage.setItem("token", false);
    }
  };

  const onAddProducts = (product) => {
    const aux = { ...product };
    aux.precio = product.precio - product.descuentodado;

    const existingProduct = productos1.find(
      (item) => item.codigo === product.codigo
    );

    if (existingProduct) {
      const updatedProducts = productos1.map((item) =>
        item.codigo === product.codigo
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setProductos1(updatedProducts);
    } else {
      setProductos1([...productos1, { ...aux, quantity: 1 }]);
    }

    setTotal(total + Number(aux.precio));
    setCountProducts(countProducts + 1);
  };

  // Maneja el clic en el botón "addCarrito"
  const handleAddToCartClick = (event, product) => {
    event.stopPropagation(); // Evita que el evento de clic se propague al div contenedor
    onAddProducts(product); // Agrega el producto al carrito
  };

  return (
    <div className="containerPrincipal">
      <div className="containerInformacion">
        <div className="containerTel">
          <div className="edit_contact">
            <BsTelephoneFill className="edit_tel" />
            <p>Telefono:</p>
            <a href="#" className="edit_url">
              3172650283
            </a>
            <MdEmail className="edit_tel" />
            <p>Email:</p>
            <a href="#" className="edit_url">
              escastr@gmail.com
            </a>
          </div>

          <div className="edit_cerrarSesion">
            <p>Bienvenido,</p>
            <a href="/" className="edit_url" onClick={closeSession}>
              cerrar sesion
            </a>
          </div>
        </div>
        <div className="containerHeader">
          <div className="left">
            <h1>weaponColom </h1>
          </div>
          <Header
            productos={productos1}
            setProductos={setProductos1}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
          <BsFillHouseCheckFill
            className="edit_home_profile"
            onClick={() => {
              window.location.href = "/pruebaPerfil";
            }}
          />
        </div>

        <div className="container_sudirecciones">
          <div className="edit_reDIRE">
            <div
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              {/*   <button className="acomodar_container">Hover over me</button>
              <FaCaretDown /> */}
            </div>
            <div
              onMouseEnter={() => setIsDropdownOpen1(true)}
              onMouseLeave={() => setIsDropdownOpen1(false)}
            >
              {/* <button className="acomodar_container">Hover over me</button>
              <FaCaretDown /> */}
            </div>
            <div
              onMouseEnter={() => setIsDropdownOpen2(true)}
              onMouseLeave={() => setIsDropdownOpen2(false)}
            >
              {/*  <button className="acomodar_container">Hover over me</button>
              <FaCaretDown /> */}
            </div>
          </div>
          <div
            className="other"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {isDropdownOpen && (
              <div className="acomodar">
                <p>Dropdown content here</p>
              </div>
            )}
          </div>
          <div
            className="other"
            onMouseEnter={() => setIsDropdownOpen1(true)}
            onMouseLeave={() => setIsDropdownOpen1(false)}
          >
            {isDropdownOpen1 && (
              <div className="acomodar">
                <p>Dropdown content here</p>
              </div>
            )}
          </div>
        </div>
        <div className="one">
          <div className="container">
            {!loading &&
              weapons.map((producto) => (
                <div
                  key={producto.codigo}
                  className="card-weapon"
                  onClick={() =>
                    navigate(`/weapon/?weapon=${JSON.stringify(producto)}`)
                  }
                >
                  <p className="card-weapon-title"> {producto.nombre}</p>
                  <div className="card-weapon-image">
                    <img src={producto.url_image} />
                  </div>
                  {console.log(producto.imagen)}

                  <p className="hello">
                    <strong>Precio:</strong>{" "}
                    {producto.precio - producto.descuentodado}
                    <p>
                      <strong>descuento:</strong>{" "}
                      {`${producto.descuentos * 100}%`}
                    </p>
                    <p>
                      <strong>stock:</strong> {producto.stock}
                    </p>
                    <p>
                      <strong>Categoría:</strong> {producto.categoria}
                    </p>
                    <SelectableStars
                      selectedStars={producto.average_stars}
                      onStarClick={() => {}}
                    />
                  </p>

                  <div className="addCarrito1" >
                    <BsCart4
                      size={25}
                      
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
