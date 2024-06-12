 import "./profile.css"
 import { BsEmojiLaughingFill } from "react-icons/bs";
 import { useState,useEffect } from "react";

 export default function Perfil() {
  const [InfoPerfil, setInfoPerfil] = useState({});
  const [values5, setValues5] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
  });

  function FunctionHandle(event) {
    const { name, value } = event.target;
    setValues5((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function DatosUsuario() {
      const token = localStorage.getItem('token');
      try {
        const url = 'http://localhost:8000/pruebaPerfil';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setInfoPerfil(data[0]);
        } else if (!Array.isArray(data) && typeof data === 'object') {
          setInfoPerfil(data);
        }
      } catch (error) {
        console.error('Error al obtener Datos:', error);
      }
    }

    DatosUsuario();
  }, []);

  useEffect(() => {
    setValues5({
      nombre: InfoPerfil.nombre || "",
      apellido: InfoPerfil.apellido || "",
      usuario: InfoPerfil.usuario || "",
      correo: InfoPerfil.correo || "",
    });
  }, [InfoPerfil]);
  
  async function updateProfile(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const url = 'http://localhost:8000/pruebaPerfil';
      const response = await fetch(url, {
        method: 'PUT', // Cambia a PUT o PATCH si es necesario
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values5),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Profile updated:', data);
        
        setInfoPerfil(data);
        window.location.href ="/pruebaPerfil"
      } else {
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }


  return (
    <div className="main_main">
      <div className="container_main_profile">
        <div className="container_main_profile__image">
          <BsEmojiLaughingFill className="edit_icon_Profile" />
        </div>
        <div className="container_main_profile__datas">
          <p className="letter_style">{InfoPerfil.nombre}</p>
          <p className="letter_style">{InfoPerfil.apellido}</p>
          <p className="letter_style">{InfoPerfil.usuario}</p>
        </div>
      </div>

      <div className="container_informationBuy">
        <div className="container_informationBuy__products">
          <form className="editar" onSubmit={updateProfile}>
            <div>
              <p>
                Fullname : {' '}
                <input
                  type="text"
                  name="nombre"
                  value={values5.nombre}
                  placeholder={InfoPerfil.nombre}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <hr className="edit1"></hr>

            <div>
              <p>
                lastname :{' '}
                <input 
                  type="text"
                  name="apellido"
                  value={values5.apellido}
                  placeholder={InfoPerfil.apellido}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <hr className="edit1"></hr>

            <div>
              <p>
                usuario :{' '}
                <input
                  type="text"
                  name="usuario"
                  value={values5.usuario}
                  placeholder={InfoPerfil.usuario}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <hr className="edit1"></hr>

            <div>
              <p>
                correo :{' '}
                <input
                  type="text"
                  name="correo"
                  value={values5.correo}
                  placeholder={InfoPerfil.correo}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <div>
              <button type="submit">Actualizar</button>
            </div>
          </form>
        </div>
      </div>

      <div className="container_informationProfile">
        <div className="container_informationProfile__inputs"></div>
        <div className="container_informationProfile_save">
          {/* Add save button or actions here */}
        </div>
      </div>
    </div>
  );
}