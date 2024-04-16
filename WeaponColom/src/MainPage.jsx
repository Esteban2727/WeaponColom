import "./MainPage.css"
import { BsCart4 } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsPersonRaisedHand } from "react-icons/bs";
import  image from "./assets/image1.png"
import { useState } from 'react';
import Modals from "./components/carrito/modals";
import ModalsRegister from "./components/registro/modalsRegister";
import ModalsSignIn from "./components/sing in/modasSignin";

import escopeta from "../src/assets/escopeta.png"
import franco from "../src/assets/franco.png"
import fusil from "../src/assets/fusil.png"
import pistola from "../src/assets/pistola.png"

export default function Mainpage(){
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
 
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
    <>
    <div className="Container_Header">
    <img className="Container_header__imageLOGO  " src={image} alt="image logo" style={{ width: '90px', height: '70px' }} ></img>
    <p className="Container_Header__editTitle">WEAPON COLOM </p> 
    <div className="Container_Header__modals"> 
    <BsCart4  className="Container_Header__buycar" style={{ width: '30px', height: '50px' }}  onClick={handleShow}/>  
    <BsFillPersonPlusFill className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow1} />
    <BsPersonRaisedHand className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow2}/>
    <Modals show={show} handleClose={handleClose}/>
    <ModalsRegister show1={show1} handleClose1={handleClose1}/>
    <ModalsSignIn show2={show2} handleClose2={handleClose2}/>
    </div>

    
    </div>
    <div className="redireccion">
    <button className="edit_categorias" onClick={()=>{window.location.href = "/pistola"}}> <img src={pistola} className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href = "/escopeta"}} ><img src={escopeta} className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href = "/fusil"}} ><img src={fusil}  className="edit_image_categoria" alt="iamge weapons"></img></button>
        <button className="edit_categorias" onClick={()=>{window.location.href = "/franco"}} ><img src={franco} className="edit_image_categoria" alt="iamge weapons"></img></button>
        </div>  
    </>
    )
}