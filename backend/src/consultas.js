import pg from 'pg';
import {encript, compare}from "./encryptar.js"
const { Pool } = pg;
import app from "./index.js";

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tienda',
  password: 'Dios2004!!',
  port: 5432,
});
const validarData = async(formdata)=>{
  try {
    
    const client = await pool.connect();
    const correo1 = await client.query('select correo from usuarios where correo= $1', [formdata.correo])
    if(!correo1.rows.length>0){return false}
    const correo2 = await client.query('select passwords from usuarios where correo= $1', [formdata.correo])
    console.log(correo2.rows[0].passwords)
    console.log(formdata.passwords)
    const checkPassword= await compare( formdata.passwords,correo2.rows[0].passwords)
   
    if(checkPassword &&  correo1.rows.length > 0){
      const nomusuario = await client.query('select usuario from usuarios where correo= $1', [formdata.correo])
      const imprimir=nomusuario.rows[0].usuario
      console.log(`bienvenido al programa usuario  ${imprimir}`);
      client.release();
      return true
    }
    else{
      return false
      
    }
  } catch (error) {
    console.error('Error reading query', error);
  }
};

const insertData = async (formData) => {
  try {
    const client = await pool.connect();
    const usuario = await client.query('select usuario from usuarios where usuario= $1', [formData.nomusuario])
    const correo = await client.query('select correo from usuarios where correo= $1', [formData.correo])
    
    
    if(usuario.rows.length > 0){
      console.log("el usuario ya existe")
      return  false
      
    }
    else if(correo.rows.length > 0){
      console.log("el correo ya existe")
      return  false
      
    }
    console.log("datos agregados")
    const passwordHash= await encript(formData.password)
    const result = await client.query('INSERT INTO usuarios (correo, passwords,usuario,nombre,apellido) VALUES ($1, $2,$3,$4,$5)', [formData.correo, passwordHash,formData.nomusuario,formData.nombre,formData.apellido]);
    console.log("llega hasta aqui")
    client.release();
    return true
    
  } catch (error) {
    console.error('Error executing query', error);
  }
  
};

 async function RecuperarPassword(data,codigo1){
  try {
    const client = await pool.connect();
    const correo = await client.query('select correo from usuarios where correo= $1', [data.correo])
   
    if(correo.rows.length > 0){
      console.log(codigo1)
      const id = await client.query('select idusuario from usuarios where correo= $1', [data.correo])
      
      await client.query('insert into recuperarpass (idusuario,codigogenerado) values($1,$2)', [id.rows[0].idusuario,codigo1])
      client.release();
}
else{
  console.log("correo no se encuentra en la base de datos")
}
  }catch (error) {
    console.error('Error reading query', error);
  }
}

async function recuperada(codigos){
  try{
    
    const client = await pool.connect();
    const id = await client.query('SELECT idusuario FROM recuperarpass WHERE codigo = (SELECT MAX(codigo) FROM recuperarpass) ')
    const cod = await client.query('SELECT codigo FROM recuperarpass WHERE codigo = (SELECT MAX(codigo) FROM recuperarpass) ')
    const codigos1 = await client.query('select codigogenerado from recuperarpass where codigo = $1', [cod.rows[0].codigo])
    
    if(codigos.codigo==codigos1.rows[0].codigogenerado){
      const passwordHash= await encript(codigos.passwordre)
      const queryText = 'UPDATE usuarios SET passwords = $1 WHERE idusuario = $2';
    const result = await client.query(queryText, [passwordHash, id.rows[0].idusuario]);
     await client.query('delete from recuperarpass')
    
    }
    client.release(); 
   
  }
 
catch (error) {
  console.error('Error reading query', error);
}
}



async function getProducto(producto){
  try{
  const client = await pool.connect();
  const datos = await client.query('Select * from producto where tipo=$1',[producto])
  console.log("entro en getproducto")
   client.release()
   return datos.rows

  }catch{
    console.error('Error en la función bringALL:', error);
    throw error;
  }
}
 async function getAllproductos(){
  try{
    const client = await pool.connect();
    const datos = await client.query('Select * from producto ')
    console.log("entra a la base")
     client.release()
     return datos.rows
  
    }catch{
      console.error('Error en la función getALLprocutos:', error);
      throw error;
    }
 }
 async function getProductoCategoria(categoria){
  try{
    const client = await pool.connect();
    const datos = await client.query('Select * from producto where categoria=$1',[categoria])
    
     client.release()
     return datos.rows
  
    }catch{
      console.log("No entro a la base de datos")
      throw error;
    }
 }

//bringALL,bringALL1,bringALL2,bringALL3,
export {getProducto, insertData , validarData ,RecuperarPassword ,recuperada,getAllproductos,getProductoCategoria};


// db.query('INSERT INTO table_name SET ?', data, function(err, result) {
//   if (err) {
//       console.log(err);
//       res.status(500).send('Error inserting data into the database');
//   } else {
//       console.log('Data inserted successfully');
//       res.status(200).send('Data inserted successfully');
//    }
//     });
//};

//GetUsers().then(resultado=>{console.log(resultado)});{}


