import Mainpage from "./MainPage"
import { Link, Route, Router, Routes } from "react-router-dom"
import Recuperar from "./rutas/recuperar"
// import Fusil from "./rutas/Armas"
// import Escopeta from "./rutas/escopeta"
// import Pistola from "./rutas/pistola"
// import Franco from "./rutas/franco"

import  Armas from "./rutas/Armas"
import SesionIniciada from "./components/sing in/sesionIniciada"
import Perfil from "./components/sing in/pefil"
import InfoArma from "./components/sing in/InfoArma/InfoArma"

import { useState } from 'react'

//import {ProductList} from './components/ProductList'
function App() {
 
  const rutaDespuesDePrueba = window.location.pathname.trim()
  console.log(rutaDespuesDePrueba,11)
 
  return (
    <>
  


          {/* <ProductList
  allProducts={allProducts}
  setAllProducts={setAllProducts}
  total={total}
  setTotal={setTotal}
  countProducts={countProducts}
  setCountProducts={setCountProducts}
   />  */}

       
    <Routes>
      <Route path="/" element={   
         <div className="Container_main"><Mainpage/></div> }></Route>
     <Route path="/prueba" element={<SesionIniciada/> }></Route>
     <Route path="/pruebaPerfil" element={<Perfil/> }></Route>

     <Route path={rutaDespuesDePrueba} element={<InfoArma />}> </Route>
    <Route path="/recuperarPassword" element={<Recuperar/> }></Route>
    <Route path="/Escopeta" element={<Armas/>}></Route>
    <Route path="/fusil" element={<Armas/>}></Route>
    <Route path="/Pistola" element={<Armas/>}></Route>
    <Route path="/franco" element={<Armas/>}></Route>
    
    </Routes>
    </>
  )
}
    {/* <Route path="/fusil" element={<Fusil/>}></Route>
    <Route path="/:Escopeta" element={<Escopeta/>}></Route>
    <Route path="/Pistola" element={<Pistola/>}></Route>
    <Route path="/franco" element={<Franco/>}></Route>
     */}
      


export default App
