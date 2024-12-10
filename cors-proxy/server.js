import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario

// Habilita CORS para todas las rutas
app.use(cors());

// Permite analizar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Proxy para solicitudes al servicio REST
app.post('/proxy', async (req, res) => {
    console.log("proxy....")
    try {
        const { url, ...options } = req.body;
        console.log("url....",url);

        if (!url) {
            return res.status(400).json({ error: 'La URL es requerida.' });
        }

        const response = await fetch(url, options);
        console.log("response",response);

        const data = await response.json();
        console.log("data",data);

        res.json(data);
    } catch (error) {
        console.error('Error en el proxy:', error);
        res.status(500).json({ error: 'Error al realizar la solicitud.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Proxy corriendo en http://localhost:${PORT}`);
});