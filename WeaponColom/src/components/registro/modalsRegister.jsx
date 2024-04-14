import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
export default function ModalsRegister({show1,handleClose1}){


    return <Modal show={show1} onHide={handleClose1}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title'>Registrarte</Modal.Title>
      <p className='edit'>Es rápido y fácil.</p>
      
      <hr className='edit_hr'></hr>
      
      <div className='input'>
      <input type='text' className='name' placeholder='Nombre' ></input>
      <input type="text"  className='name' placeholder='Apellido'></input>
      <input type="number" className='name1' placeholder='Número de celular o correo electrónico'></input>
      <input  type="password"className='name1' placeholder='Contraseña nueva'></input>
      
      <div className='fecha'>
      <select className='component_input_day'>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
      <option value={11}>11</option>
      <option value={12}>12</option>
      <option value={13}>13</option>
      <option value={14}>14</option>
      <option value={15}>15</option>
      <option value={16}>16</option>
      <option value={17}>17</option>
      <option value={18}>18</option>
      <option value={19}>19</option>
      <option value={20}>20</option>
      <option value={21}>21</option>
      <option value={22}>22</option>
      <option value={23}>23</option>
      <option value={24}>24</option>
      <option value={25}>25</option>
      <option value={26}>26</option>
      <option value={27}>27</option>
      <option value={28}>28</option>
      <option value={29}>29</option>
      <option value={30}>30</option>
      <option value={31}>31</option>
 
      </select>
      <select className='component_input_day'>
      <option value={1}>enero</option>
      <option value={2}>febrero</option>
      <option value={3}>marzo</option>
      <option value={4}>abril</option>
      <option value={5}>mayo</option>
      <option value={6}>junio</option>
      <option value={7}>julio</option>
      <option value={8}>agosto</option>
      <option value={9}>septiembre</option>
      <option value={10}>octubre</option>
      <option value={11}>noviembre</option>
      <option value={12}>diciembre</option>
      </select>
      </div>

      </div>
      </div>
    
    <Modal.Body>
        
    </Modal.Body>
    {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer> */}
  </Modal>
}