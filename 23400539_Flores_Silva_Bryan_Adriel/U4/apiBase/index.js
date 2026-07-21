const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect("mongodb://127.0.0.1:27017/escuela").then(() => {
    console.log("Conectado a la base de datos");
}).catch((err) => {
    console.log("Error al conectar a la base de datos", err);
});

const alumnoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    carrera: {type: String, required: true, trim: true},
    semestre: {type: Number, required: true, min: 1}
},
{
    timestamps: true
}
);

const Alumno = mongoose.model("Alumno", alumnoSchema, "alumnos");

app.get("/alumnos", async (req, res) => {
    try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error){
        res.status(500).json({
            mensaje: "Error al obtener los alumnos",
            error: error
        });
    }
});

app.get("/alumnos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            });
        }
        res.json(alumno);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el alumno",
            error: error
        });
    }
});

app.post("/alumnos", async (req, res) => {

    try{
        const { nombre, carrera, semestre } = req.body;
    
        if(!nombre || !carrera || !semestre){
            return res.status(400).json({
                mensaje: "Faltan datos del alumno"
            });
        }
        
        const nuevoAlumno = new Alumno({
            nombre, carrera, semestre
        });

        const alumnoGuardado = await nuevoAlumno.save();

        res.status(201).json({
            mensaje: "Alumno registrado correctamente",
            alumno: alumnoGuardado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar el alumno",
            error: error
        });
    }
});

app.put("/alumnos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, carrera, semestre} = req.body;
        
        if(!nombre || !carrera || !semestre){
            return res.status(400).json({
                mensaje: "Faltan datos del alumno"
            });
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(
            id, 
            {
                nombre, carrera, semestre
            }, {new: true, runValidators: true}
        );

        if(!alumnoActualizado){
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            });
        }

        res.json({
            mensaje: "Alumno actualizado correctamente",
            alumno: alumnoActualizado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el alumno",
            error: error
        });
    }
    
});

app.delete("/alumnos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const alumnoEliminado = await Alumno.findByIdAndDelete(id);
        if(!alumnoEliminado){
            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            });
        }

        res.json({
            mensaje: "Alumno eliminado correctamente",
            alumno: alumnoEliminado
        });
    } catch (error) {3
        res.status(500).json({
            mensaje: "Error al eliminar el alumno",
            error: error
        });
    }
});


app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.get('/mensaje', (req, res) => {
    res.send('Mensaje desde Express');
});

app.get('/pagina', (req, res) => {
    const nombre = "Bryan Adriel Flores Silva";
    res.send(`
        <style>
            .p1 {
                color: red;
                background-color: #f0f0f0;
            }
        </style>
        <h1>Mi página web</h1>
        <p class="p1";">Creada con Express</p>
        <p>Hola, ${nombre}</p>    
    `);

app
});

app.get('/alumno', (req, res) => {
    res.json({
        nombre: "Bryan",
        carrera: "ISC",
        semestre: 7
    })
});

app.get('/materias', (req, res) => {
    res.json([
        {
            nombre: "NoSQL",
            hora: "8:00-11:00"
        },
        {
            nombre: "Programación Web",
            hora: "14:00-17:00"
        }
    ]);
});

// Esta se ejecuta cuando se hace una petición GET a la ruta /mensaje/:nombre de forma /mensaje/Bryan 
app.get('/mensaje/:nombre', (req, res) => {
    res.send(`Hola ${req.params.nombre}`);
});

app.get('/suma/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.send(`Resultado: ${a+b}`)
});

app.get('/multiplicar/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.send(`Resultado: ${a*b}`)
});

app.get('/aleatorio', (req, res) => {
    const numero = Math.floor(Math.random() * 100) + 1;
    res.send(`Resultado: ${numero}`);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});