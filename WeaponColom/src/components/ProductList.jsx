import React from 'react'
import {data} from './data'

export const ProductList = ({allProducts, setAllProducts,countProducts, setCountProducts,total,setTotal}) => {
	const onAddProducts=(product)=>{

		if(allProducts.find(item =>(item.id=== product.id))){

			const products = allProducts.map(item =>item.id===product.id? {
				...item, quantity:item.quantity +1	}: item) 
				setTotal(total + product.price * product.quantity)
				setCountProducts(countProducts + product.quantity)
		return setAllProducts([...products])
	
	}
	setTotal(total + product.price * product.quantity)
	setCountProducts(countProducts + product.quantity)
	setAllProducts([...allProducts, product])
}
	console.log(allProducts)

  return (
    <div className='container-items'>
        {data.map(product => (
            <div className="item" key={product.id}> 
				<figure>
					<img
						src={product.img}
						alt={product.nameProduct} //nombre del producto en caso de que no salga la imagen
					/>
				</figure>
				<div className="info-product">
					<h2>{product.nameProduct}</h2>
					<p className="price">${product.price}</p>
					<button onClick={()=> onAddProducts(product)}
						className="btn-add-cart">Añadir al carrito</button>
				</div>
			</div>

        ))
    }
      
    </div>
  )
}