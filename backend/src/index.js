import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer'

//bringALL,bringALL1,bringALL2,bringALL3,
import {getProducto, insertData ,validarData,RecuperarPassword ,recuperada } from './consultas.js';


const app = express();

const PORT = process.env.PORT || 8000; 

app.use(cors());
app.use(express.json());


app.post('/', (req, res) => {
  const datosRecibidos = req.body;
 // console.log('Datos recibidos del frontend:', datosRecibidos);
  
  if(Object.keys(datosRecibidos).length== 5){
    res.send('Datos recibidos correctamente en el backend registro');
    
  insertData(datosRecibidos);
  
  }
  else {
    res.send('Datos recibidos correctamente en el backend ingresar');
   
     validarData(datosRecibidos);
  }
});



app.post('/recuperarPassword', async (req, res) => {
  const datosRecibidos = req.body;
  
  if (  Object.keys(datosRecibidos).length==3) {

    recuperada(datosRecibidos)
}
  else{
   
  var codigoAleatorio = Math.floor(10000 + Math.random() * 90000);
  
  RecuperarPassword(datosRecibidos,codigoAleatorio)
  

      const infom= 
      `<h1>enviando correo
                <ul>
                <li> tu correo es : ${datosRecibidos.correo} y el codigo es ${codigoAleatorio}</li>
                </ul>
      </h1>`

      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "escastr@gmail.com",
          pass: "qypu gnux wbis sdib",
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    
      const info = await transporter.sendMail({
        from: '"Weapon Colom" <escastr@gmail.com>', // Cambia esto por tu dirección de correo electrónico
        to: datosRecibidos.correo, // Dirección de correo del destinatario
        subject: "Recuperación de contraseña", // Línea de asunto del correo electrónico
        html: infom // Contenido HTML del correo electrónico
      });
    
      console.log("El correo fue enviado:", info.messageId);
      res.send('Datos recibidos correctamente en el backend ingresar');

    }});
    app.get("/:tipo" , async (req,res)=>{
      const tipoArma = req.params.tipo
      console.log(req.params)
      console.log(tipoArma)
      console.log(req.params.tipo)
      const tipo= await getProducto(tipoArma)
      if(tipo){
        res.json(tipo)
      }else{
        res.status(404).json({error:'no se encontraron'})
      }
      
       })

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



export default app;
