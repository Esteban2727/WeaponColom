import pg from 'pg'
const { Pool, Client } = pg

const GetUsers = async ()=>{

      const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'tienda',
        password: 'Dios2004!!',
        port: 5432,
        
      })

await client.connect();

    const res= await client.query('SELECT passwords from usuarios');
      debugger
    const resultado= res.rows
    

       await client.end();
       return resultado

}
 

GetUsers().then(resultado=>{console.log(resultado)});
