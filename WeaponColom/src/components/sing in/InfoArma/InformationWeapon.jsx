import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";

import { useSearchParams } from "react-router-dom";
import "./informationWeapon.css";
import SelectableStars from "../../stars/Stars";


export default function InformationWeapon({}) {
  const [comments, setComments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const weapon = JSON.parse(searchParams.get("weapon"));
  const [comentario, setcomentario] = useState();
  const [ratingStars, setRatingStars] = useState(0);


  
  useEffect(() => {
    const getComments = async () => {
      try {
        const url = `http://localhost:8000/${weapon.codigo}/rate`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error("Error al obtener Datos:", error);
      }
    };

    getComments();
  }, []);
  
  const getCommentario = async (e) => {
    e.preventDefault();
    
    try {
      const url = `http://localhost:8000/rate/${weapon.codigo}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({comment:comentario,stars: ratingStars}),
      });
      setcomentario(""); // Limpia el campo de comentario después de enviar
      setRatingStars(0); // Restablece la calificación después de enviar
      
    } catch (error) {
      console.error("Error al obtener Datos:", error);
    }
  };

  useEffect(() => {}, []); // Agrega NomArma como dependencia para que useEffect se vuelva a ejecutar cuando cambie

  return (
    <div className="colorFondoArmas">
      <div className="decorar_inside1">
        <img src={weapon.url_image} className="image_size" />

        <p className="tituloArma">{weapon.nombre}</p>

        <p>
          <strong>Descripción:</strong> {weapon.descripcion}
        </p>
        <p>
          <strong>Precio:</strong> {weapon.precio}
        </p>
        <p>
          <strong>Stock:</strong> {weapon.stock}
        </p>
        <p>
          <strong>Categoría:</strong> {weapon.categoria}
        </p>
        <div className="moveCar">
          <BsCart4 className="addCarrito" />
        </div>
      </div>
      <div className="container-comments">
        <div className="block-comments">
          {comments.map((c, index) => (
            <div key={index} className="card-comment">
              <div>
                
                <p>{c.comentario}</p>
                <SelectableStars selectedStars={c.stars} onStarClick={() => {}} /> 
              </div>
            </div>
          ))}
        </div>

        <div className="input-rate">
        <SelectableStars
            selectedStars={ratingStars}
            onStarClick={setRatingStars} // Actualiza el estado cuando el usuario hace clic en una estrella
          />
          <input
            type="text"
            placeholder="Escribe tu comentario"
            onChange={(e) => {
              setcomentario(e.target.value);
            }}
          ></input>
          <button type="button" onClick={getCommentario}>
            enviar
          </button>
        </div>
      </div>
    </div>
  );
}
