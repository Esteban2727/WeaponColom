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
import InfoArma from "./components/sing in/InfoArma/InformationWeapon"

import { useState } from 'react'
import InformationWeapon from "./components/sing in/InfoArma/InformationWeapon"

//import {ProductList} from './components/ProductList'
function App() {
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
     <Route path="/weapon" element= {<InformationWeapon/>}></Route>
    <Route path="/recuperarPassword" element={<Recuperar/> }></Route>
    <Route path="/Escopeta" element={<Armas/>}></Route>
    <Route path="/Fusil" element={<Armas/>}></Route>
    <Route path="/Pistola" element={<Armas/>}></Route>
    <Route path="/Rifle" element={<Armas/>}></Route>
    <Route path="/Armas_traumaticas" element={<Armas/>}></Route>
    <Route path="/Bolas_de_pimienta" element={<Armas/>}></Route>
    <Route path="/Pistola_de_aire" element={<Armas/>}></Route>
    <Route path="/Neumatico" element={<Armas/>}></Route>
    <Route path="/Fogueo" element={<Armas/>}></Route>
    <Route path="/Airsoft" element={<Armas/>}></Route>
    
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
