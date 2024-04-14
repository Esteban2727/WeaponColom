import "./MainPage.css"
import { BsCart4 } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsPersonRaisedHand } from "react-icons/bs";
import  image from "./assets/image1.png"
import { useState } from 'react';
import Modals from "./components/carrito/modals";
import ModalsRegister from "./components/registro/modalsRegister";
import ModalsSignIn from "./components/sing in/modasSignin";
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
    )
}