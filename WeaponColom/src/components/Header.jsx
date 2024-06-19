import React, { useState } from 'react';

const Header = ({ productos, setProductos, total, setTotal, countProducts, setCountProducts }) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    
    const productIndex = productos.findIndex(item => item.codigo === product.codigo);
  
    if (productIndex !== -1) {
      
      const updatedProducts = [...productos];
      
      updatedProducts[productIndex].quantity -= 1;
  
      
      if (updatedProducts[productIndex].quantity === 0) {
        updatedProducts.splice(productIndex, 1);
      }
  
      
      setProductos(updatedProducts);
  
      
      setTotal(total - product.precio);
      setCountProducts(countProducts - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   /* cambios */
    const token = localStorage.getItem('token'); // Reemplaza con tu token real
    const data=[...productos]
    try {
      const response = await fetch('http://localhost:8000/compra/factura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          total,
          weapons:productos.map(w=>{
            
            return {
              codigo:w.codigo,
              quantity:w.quantity
            }
          })
        }), /* enviar los datos en forma de json */
      });
      if (response.ok) {
        console.log(22222)
        onClearCart();
      }
      const data = await response.json();

     
  
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
  

      
  
      // Reinicia los estados del formulario
      // Muestra una alerta o mensaje de éxito al usuario
      alert('Pedido pagado exitosamente');
  
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };
  

  const onClearCart = () => {
    setProductos([]);
    setTotal(0);
    setCountProducts(0);
  };

  /* cambios */
/* const onpayproduct = ()=>{
  alert("pedido pagado exitosametne")
} */

  return (
    <header>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {productos.length ? (
            <>
              <div className="row-product">
                {productos.map(product => (
                  <div className="cart-product" key={product.codigo}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">{product.quantity}</span>
                      <p className="titulo-producto-carrito">{product.nombre}</p>
                      <span className="precio-producto-carrito">${product.precio}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              {/* cambio */}
              <div className='btns-carrito'>
              <button className="btn-clear-all" onClick={onClearCart}>
                Vaciar carrito
              </button>
             {/*  cambios */}
              <button className="btn-pay-all" onClick={handleSubmit}>
                pagar
              </button>
              </div>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};

/* cambios */


export default Header;

