const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('SERVIDOR EXPRESS ACTIVIDAD 2 U4');
});

// Ejercicio 1: Número par o impar
app.get('/par/:numero', (req, res) => {
    if (req.params.numero % 2 === 0) {
        res.send(`El número ${req.params.numero} es par`);
    } else {
        res.send(`El número ${req.params.numero} es impar`);
    }
})

// Ejercicio 2: Mayor de edad
app.get('/edad/:edad', (req, res) => {
    if (req.params.edad >= 18) {
        res.send(`Tienes ${req.params.edad} años. Eres mayor de edad`);
    } else {
        res.send(`Tienes ${req.params.edad} años. Eres menor de edad`);
    }
})

// Ejercicio 3. Calculadora
app.get('/calculadora/:operacion/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    let resultado;

    switch (req.params.operacion) {
        case 'suma':
            resultado = a + b;
            break;
        case 'resta':
            resultado = a - b;
            break;
        case 'multiplicacion':
            resultado = a * b;
            break;
        case 'division':
            resultado = a / b;
            break;
        default:
            res.send('Operación no válida');
            return;
    }

    res.send(`El resultado de la ${req.params.operacion} de ${req.params.a} y ${req.params.b} es: ${resultado}`);
});

//Ejercicio 4. Tabla de multiplicar
app.get('/tabla/:numero', (req, res) => {
    let tabla = '';

    for (let i=1; i<=10; i++) {
        tabla += `${req.params.numero} x ${i} = ${req.params.numero * i}<br>`;
    }

    res.send(tabla);
});

//Ejercicio 5. Calificación
app.get('/calificacion/:nota', (req, res) => {
    let calificacion;

    if (req.params.nota < 70 && req.params.nota >= 0) {
        calificacion = 'Reprobado';
    } else if (req.params.nota >= 80){
        calificacion = 'Muy bien'
    } else if (req.params.nota >= 70){
        calificacion = 'Aprobado';
    } else{
        res.send('Nota no válida');
    }

    res.send(`Nota: ${req.params.nota} <br> Calificación: ${calificacion}`);
});

    

// LISTENER
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});