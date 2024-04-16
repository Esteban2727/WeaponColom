const cors = require ("cors");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000; 


app.use(express.json());
app.use(cors())

app.post('/', (req, res) => {
  const datosRecibidos = req.body;
  console.log('Datos recibidos del frontend:', datosRecibidos);
  res.send('Datos recibidos correctamente en el backend');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});