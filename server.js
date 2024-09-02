const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors')
const port = 3000;

// Middleware
app.use(express.json());
// Servir archivos estáticos (como CSS y imágenes)
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rutas para las diferentes páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/m', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'maintence.html'));
});
app.get('/acerca-de', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'acerca-de.html'));
});

app.get('/servicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'servicio.html'));
});

app.get("/formularios", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formularios.html'));
}); 

// Ruta para guardar los datos del alumno
app.post('/save-student', (req, res) => {
    const { name, age, grade, lname, muni, dept, bar, secc, jorn } = req.body;
    const studentData = `Nombre: ${name}, Apellido: ${lname}, Municipio: ${muni}, Departamento: ${dept}, Barrio: ${bar}, Edad: ${age}, Grado: ${grade}, Sección: ${secc}, Jornada: ${jorn}\n`;

    // Guardar en el archivo students.txt
    fs.appendFile(path.join(__dirname, 's.txt'), studentData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ success: false, message: 'Error al guardar datos' });
        }
        res.json({ success: true, student: { name, age, grade, lname, muni, dept, bar, secc, jorn } });
    });
});

// Ruta para obtener la lista de alumnos
app.get('/students', (req, res) => {
    fs.readFile(path.join(__dirname, 's.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).json({ success: false, message: 'Error al leer datos' });
        }
        // Convertir los datos a una lista de objetos
        const students = data.split('\n').filter(line => line).map(line => {
            const parts = line.split(', ').map(part => part.split(': ')[1]);
            return {
                name: parts[0],
                lname: parts[1],
                muni: parts[2],
                dept: parts[3],
                bar: parts[4],
                age: parts[5],
                grade: parts[6],
                secc: parts[7],
                jorn: parts[8]
            };
        });
        res.json(students);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
