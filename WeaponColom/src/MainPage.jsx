import "./MainPage.css"
import { BsCart4 } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsPersonRaisedHand } from "react-icons/bs";
export default function Mainpage(){
    return (
    
    <div className="Container_Header">
    <p className="Container_Header__editTitle">WEAPON COLOM </p> 
    <div className="Container_Header__modals"> 
    <BsCart4  className="Container_Header__buycar"/>  
    <BsFillPersonPlusFill className="Container_Header__buycar"  />
    <BsPersonRaisedHand className="Container_Header__buycar"/>
    </div>
    
    </div>
    )
}