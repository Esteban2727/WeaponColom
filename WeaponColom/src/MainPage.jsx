import "./MainPage.css"
import { BsCart4 } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsPersonRaisedHand } from "react-icons/bs";
import  image from "./assets/image1.png"
import { useState } from 'react';
import Modals from "./modals";
export default function Mainpage(){
    const [show, setShow] = useState(false);
 
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    
    <div className="Container_Header">
    <img className="Container_header__imageLOGO  " src={image} alt="image logo" style={{ width: '90px', height: '70px' }} ></img>
    <p className="Container_Header__editTitle">WEAPON COLOM </p> 
    <div className="Container_Header__modals"> 
    <BsCart4  className="Container_Header__buycar" style={{ width: '30px', height: '50px' }}  onClick={handleShow}/>  
    <BsFillPersonPlusFill className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow} />
    <BsPersonRaisedHand className="Container_Header__buycar" style={{ width: '30px', height: '50px' }} onClick={handleShow}/>
    <Modals show={show} handleClose={handleClose}/>
    </div>
    
    </div>
    )
}