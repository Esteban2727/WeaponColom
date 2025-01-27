import { encript, compare } from "./encryptar.js";
import pool from "./Database/poolConnection.js";
import { AsyncLocalStorage } from "async_hooks";

const validarData = async (formdata) => {
  try {
    const client = await pool.connect();
    const correo1 = await client.query(
      "select correo from usuarios where correo= $1",
      [formdata.correo]
    );
    if (!correo1.rows.length > 0) {
      return false;
    }
    const correo2 = await client.query(
      "select passwords from usuarios where correo= $1",
      [formdata.correo]
    );
    console.log(correo2.rows[0].passwords);
    console.log(formdata.passwords);
    const checkPassword = await compare(
      formdata.passwords,
      correo2.rows[0].passwords
    );

    if (checkPassword && correo1.rows.length > 0) {
      const nomusuario = await client.query(
        "select usuario from usuarios where correo= $1",
        [formdata.correo]
      );
      const imprimir = nomusuario.rows[0].usuario;
      console.log(`bienvenido al programa usuario  ${imprimir}`);
      client.release();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error reading query", error);
  }
};

const insertData = async (formData) => {
  try {
    const client = await pool.connect();
    const usuario = await client.query(
      "select usuario from usuarios where usuario= $1",
      [formData.nomusuario]
    );
    const correo = await client.query(
      "select correo from usuarios where correo= $1",
      [formData.correo]
    );

    if (usuario.rows.length > 0) {
      console.log("el usuario ya existe");
      return false;
    } else if (correo.rows.length > 0) {
      console.log("el correo ya existe");
      return false;
    }
    console.log("datos agregados");
    const passwordHash = await encript(formData.password);
    const result = await client.query(
      "INSERT INTO usuarios (correo, passwords,usuario,nombre,apellido) VALUES ($1, $2,$3,$4,$5)",
      [
        formData.correo,
        passwordHash,
        formData.nomusuario,
        formData.nombre,
        formData.apellido,
      ]
    );
    console.log("llega hasta aqui");
    client.release();
    return true;
  } catch (error) {
    console.error("Error executing query", error);
  }
};

async function RecuperarPassword(data, codigo1) {
  try {
    const client = await pool.connect();
    const correo = await client.query(
      "select correo from usuarios where correo= $1",
      [data.correo]
    );

    if (correo.rows.length > 0) {
      console.log(codigo1);
      const id = await client.query(
        "select idusuario from usuarios where correo= $1",
        [data.correo]
      );

      await client.query(
        "insert into recuperarpass (idusuario,codigogenerado) values($1,$2)",
        [id.rows[0].idusuario, codigo1]
      );
      console.log("hecho con exito")
      client.release();
    } else {
      console.log("correo no se encuentra en la base de datos");
    }
  } catch (error) {
    console.error("Error reading query", error);
  }
}

async function recuperada(codigos) {
  try {
    const client = await pool.connect();
    const id = await client.query(
      "SELECT idusuario FROM recuperarpass WHERE codigo = (SELECT MAX(codigo) FROM recuperarpass) "
    );
    const cod = await client.query(
      "SELECT codigo FROM recuperarpass WHERE codigo = (SELECT MAX(codigo) FROM recuperarpass) "
    );
    const codigos1 = await client.query(
      "select codigogenerado from recuperarpass where codigo = $1",
      [cod.rows[0].codigo]
    );

    if (codigos.codigo == codigos1.rows[0].codigogenerado) {
      const passwordHash = await encript(codigos.passwordre);
      const queryText =
        "UPDATE usuarios SET passwords = $1 WHERE idusuario = $2";
      const result = await client.query(queryText, [
        passwordHash,
        id.rows[0].idusuario,
      ]);
      await client.query("delete from recuperarpass");
    }
    client.release();
  } catch (error) {
    console.error("Error reading query", error);
  }
}

async function getProducto(producto) {
  try {
    const client = await pool.connect();
    const datos = await client.query("Select * from producto where tipo=$1", [
      producto,
    ]);
    console.log("entro en getproducto");
    client.release();
    return datos.rows;
  } catch {
    console.error("Error en la función bringALL:", error);
    throw error;
  }
}

async function getAllproductos() {
  try {
    const client = await pool.connect();
    const datos =
      await client.query(`select producto.codigo,descuentos,producto.precio,(producto.precio*descuento.descuentos)as descuentoDado,producto.codigo, producto.nombre,
                                    producto.descripcion,producto.tipo, producto.categoria,producto.precio,producto.url_image,producto.stock,round(avg(cal.stars),0)::int as average_stars
                                     from producto left  join descuento
 on 
 producto.codigo= descuento.codigoproducto left join oferta on
 
descuento.codigooferta=oferta.codigooferta left join calificacion cal on producto.codigo = cal.codigoproducto 
                                    group by producto.codigo,descuento.descuentos`);

    await client.release();
    return datos.rows;
  } catch (error) {
    console.error("Error en la función getALLprocutos:", error);
    throw error;
  }
}

async function getProductoCategoria(categoria) {
  try {
    const client = await pool.connect();
    const datos = await client.query(
      "Select * from producto where categoria=$1",
      [categoria]
    );

    client.release();
    return datos.rows;
  } catch {
    console.log("No entro a la base de datos");
    throw error;
  }
}
async function getID(dato) {
  try {
    const client = await pool.connect();
    const getIDS = await client.query(
      "select (idusuario,usuario) from usuarios where correo=$1",
      [dato.correo]
    );

    client.release();
    return getIDS.rows;
  } catch {
    throw (Error, "no obtuvo la id y el usuario");
  }
}

async function getArmas1(name) {
  const client = await pool.connect();
  console.log(name);
  const getArma = await client.query(
    "SELECT * FROM producto WHERE nombre ILIKE $1",
    [`%${name}%`]
  );
  client.release();
  console.log(getArma.rows);
  return getArma.rows;
}
async function InfoPerfil(value) {
  const client = await pool.connect();
  const getInfo = await client.query(
    "SELECT nombre,apellido,usuario,correo FROM usuarios WHERE idusuario = $1",
    [value]
  );
  client.release();
  console.log(getInfo.rows);
  return getInfo.rows;
}
async function changeDatas(datas, otro) {
  const client = await pool.connect();
  const update = await client.query(
    `UPDATE usuarios SET nombre = $1, apellido = $2, usuario = $3, correo = $4 WHERE idusuario = ${otro}`,
    [datas.nombre, datas.apellido, datas.usuario, datas.correo]
  );
  client.release();
  return update.rows;
}
async function saveRate(id_product, id_user, stars = 0, comment) {
  const client = await pool.connect();
  try {
    // Verificar si ya existe una entrada para el usuario y el producto
    const rate = await client.query(
      `SELECT codigocalifica FROM calificacion WHERE idusuario = $1 AND codigoproducto = $2`,
      [id_user, id_product]
    );

    if (rate.rows.length > 0) {
      await client.query(
        `UPDATE calificacion
         SET stars = $1,comentario = $2 WHERE codigocalifica = $3`,
        [stars, comment, rate.rows[0].codigocalifica]
      );
    } else {
      await client.query(
        `INSERT INTO calificacion (codigoproducto, idusuario,stars,comentario) 
         VALUES ($1, $2,$3,$4)`,
        [id_product, id_user, stars, comment]
      );
    }
    await client.release();
  } catch (error) {
    console.error("Error al guardar la calificación:", error);
    throw error;
  }
}
async function getRate(id_weapon) {
  const client = await pool.connect();

  try {
    const comentar = await client.query(
      "SELECT comentario, stars from calificacion where codigoproducto= $1",
      [id_weapon]
    );
    await client.release();

    return comentar.rows;
  } catch (error) {}
}

async function getBestProducts() {
  const client = await pool.connect();
  const result =
    await client.query(`select p.codigo,p.url_image,p.stock,round(avg(cal.stars),0)::int as average_stars
        from producto p
        join calificacion cal on p.codigo = cal.codigoproducto
        group by p.codigo
        having round(avg(cal.stars),0)>0
        order by average_stars desc
        LIMIT 5`);
  await client.release();
  return result.rows;
}

async function sendComments(codeproduct, comments, user) {
  const client = await pool.connect();
  const result = await client.query(
    "insert into calificacion (idusuario,comentario) from calificacion"
  );
  await client.release();
  return result.rows;
}

export {
  sendpagos,
  sendComments,
  saveRate,
  changeDatas,
  InfoPerfil,
  getArmas1,
  getID,
  getProducto,
  insertData,
  validarData,
  RecuperarPassword,
  recuperada,
  getAllproductos,
  getProductoCategoria,
  getRate,
  getBestProducts,
};

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

/* cambios */
//GetUsers().then(resultado=>{console.log(resultado)});{}
async function sendpagos(user, totalPagado, weapons) {
  const client = await pool.connect();
  await client.query("insert into pago (idusuario,total)  VALUES ($1, $2)", [
    user,
    totalPagado,
  ]);

  const result = await client.query(
    "INSERT INTO pedido (id_usuario,fecha) VALUES ($1,$2) returning codigopedido",
    [user, new Date()]
  );
  const codigopedido = result.rows[0].codigopedido;



  const values = []
  for (let i = 0; i < weapons.length; i++) {
    values.push(`(${codigopedido},${weapons[i].codigo},${weapons[i].quantity})`)
  } 

  await client.query(`INSERT INTO detallespedido (codigopedido,codigoproducto,cantidad) VALUES ${values.join(',')}`)

  await client.release();
}
