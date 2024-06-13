import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken"
import {GeneratorJWT } from "./jwt.js"

//bringALL,bringALL1,bringALL2,bringALL3,
import {InfoPerfil,getArmas1,getProducto, insertData ,validarData,RecuperarPassword ,recuperada ,getAllproductos,getProductoCategoria ,getID,changeDatas,saveLIKES} from './consultas.js';


const app = express();

const PORT = process.env.PORT || 8000; 

app.use(cors());
app.use(express.json());


app.post('/', async (req, res) => {
  const datosRecibidos= req.body
  
  if(Object.keys(datosRecibidos).length== 5){
    
   const guardar= await insertData(datosRecibidos);
  
    if(guardar== false){
      res.status(401).json({Error :"registro no aceptado"})
      
    }else{
      res.status(200).json({Error: "QUEDO REGISTRADO"})
    }
   }
  
  else {
    const savePromise = validarData(datosRecibidos);

    savePromise.then(save => {
      console.log(save); 
      if (!save) {
        res.status(401).json({ Error: "contraseña incorrecta" });
      } else {
       const guardar= getID(datosRecibidos)
       console.log(guardar)
        guardar.then(get=>{
          get.forEach(get=> {
            const rowValues = get.row.slice(1, -1).split(',');

            const idUsuario = rowValues[0].trim();
            const usuario = rowValues[1].trim();
          const token=  GeneratorJWT(idUsuario,usuario)
  

          res.status(200).json({ token });
            
        })})

      
      }
  })
}});

app.post('/pruebaPerfil',async (req,res)=>{
  let token = null;
      const authorization = req.get('authorization');
    
      console.log(authorization)
      if (authorization && authorization.startsWith('Bearer')){

          token = authorization.substring(7);
   
          try {    
            const verificar = jwt.verify(token,'WeaponColom');
    
            if (!verificar.id) {
                throw new Error('Token inválido');
            }
            const tipo= await InfoPerfil(verificar.id)
            
            res.json(tipo)
        } catch (error) {
          console.log("probando perfilUsuario")
            res.status(401).json({ error: 'No estás verificado' });
        }
      }
         })
        


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
        from: '"Weapon Colom" <escastr@gmail.com>', 
        to: datosRecibidos.correo, 
        subject: "Recuperación de contraseña", // 
        html: infom 
      });
    
      console.log("El correo fue enviado:", info.messageId);
      res.send('Datos recibidos correctamente en el backend ingresar');

    }});
    app.get("/:tipo" , async (req,res)=>{
      const tipoArma = req.params.tipo
      if(tipoArma == "Escopeta" || tipoArma == "Pistola" || tipoArma =="fusil" || tipoArma == "franco" ){
      console.log(req.params.tipo)
      
      const tipo= await getProducto(tipoArma)
      if(tipo){
        res.json(tipo)
      }else{
        res.status(404).json({error:'no se encontraron'})
      }
    }
        else{
        const save= remplazarlineaPorEspacio(req.params.tipo)
        console.log(save)
        console.log("entrando")
         const tipos= await getProductoCategoria(save)
         
         if(tipos){
          res.json(tipos)
        }else{
          res.status(404).json({error:'no se encontraron'})
        }
      }
  }) 
  

       app.get("/" , async (req,res)=>{

        console.log("llega aqui")
        const tipo= await  getAllproductos()
        console.log(tipo,12112)
        res.json(tipo)
        
         })
        
         function remplazarlineaPorEspacio(cadena) {
          // Utilizamos la función replace() con una expresión regular para encontrar todas las comas y reemplazarlas por espacios
          return cadena.replace(/_/g, ' ');
      }
      app.post("/prueba" , async (req,res)=>{

      let token = null;
      const authorization = req.get('authorization');
    
      console.log(authorization)
      if (authorization && authorization.startsWith('Bearer')){

          token = authorization.substring(7);
   
          try {    
            const verificar = jwt.verify(token,'WeaponColom');
    
            if (!verificar.id) {
                throw new Error('Token inválido');
            }
            const tipo= await  getAllproductos()
            console.log(tipo)
            
            res.json(tipo)
        } catch (error) {
          console.log("holaaaaaaaaaaaa")
            res.status(401).json({ error: 'No estás verificado' });
        }
      }
         })
        
         app.get("/prueba/:get" , async (req,res)=>{
          const tipoArma = req.params.get
          console.log(tipoArma,11111)
         const save=await getArmas1(tipoArma)
         console.log(save,111)
          res.json(save)
        
      }) 
      app.put("/pruebaPerfil",async(req,res)=>{
        let token = null;
        const authorization = req.get('authorization');
      
        console.log(authorization)
        if (authorization && authorization.startsWith('Bearer')){
  
            token = authorization.substring(7);
     
            try {    
              const verificar = jwt.verify(token,'WeaponColom');
      
              if (!verificar.id) {
                  throw new Error('Token inválido');
              }
              const atrapar= req.body
              console.log(atrapar)
              const send= await changeDatas(atrapar,verificar.id)
              res.json(send)
             } catch (error) {
                console.log("probando perfilUsuario")
                  res.status(401).json({ error: 'No estás verificado' });
       
      
        }
      }})

      app.put("/prueba",async(req,res)=>{
        let token = null;
        const authorization = req.get('authorization');
      
        console.log("esta entrnado con el put para los likes")
    
        if (authorization && authorization.startsWith('Bearer')){
  
            token = authorization.substring(7);
     
            try {    
              const verificar = jwt.verify(token,'WeaponColom');
      
              if (!verificar.id) {
                  throw new Error('Token inválido');
              }
              const atrapar= req.body
              const codigo= atrapar.codigo
              const like= atrapar.like

              const send= await saveLIKES(codigo,like,verificar.id)
              console.log(send)
              res.json(send)
             } catch (error) {
                console.log("probando sperfilUsuario")
                  res.status(401).json({ error: 'No estás verificado' });
       
      
        }
      }})
    


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



export default app;
