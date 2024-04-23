import Mainpage from "./MainPage"
import { Link, Route, Router, Routes } from "react-router-dom"
import Recuperar from "./rutas/recuperar"
// import Fusil from "./rutas/Armas"
// import Escopeta from "./rutas/escopeta"
// import Pistola from "./rutas/pistola"
// import Franco from "./rutas/franco"
import  Armas from "./rutas/Armas"
function App() {


  return (
    <>
    

       
    <Routes>
      <Route path="/" element={   
         <div className="Container_main"><Mainpage/></div> }></Route>
    <Route path="/recuperarPassword" element={<Recuperar/> }></Route>
    <Route path="/:Escopeta" element={<Armas/>}></Route>
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
