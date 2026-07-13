# Creación de flujo
## Estructura del JSON de una película:
{
  "id" : Number,
  "nombre" : String,
  "director" : String,
  "año" : Number,
  "duración" : Number,
  "genero" : String
}

## 1. Crear una película
**Método HTTP**: POST
**URI**: /movies
**Json enviado**:
{
  "id" : 1,
  "nombre" : "Pulp Fiction",
  "director" : "Quentin Tarantino",
  "año" : 1983,
  "duración" : 120,
  "genero" : "Acción"
}
**Json recibido**:
{
  "code" : 200,
  "msg" : "Película creada"
}

## 2. Consultar una película por id
**Método HTTP**: GET
**URI**: /movies/1
**Json enviado**:
{

}
**Json recibido**
{
  "code" : 200,
  data : {
    "id" : 1,
    "nombre" : "Pulp Fiction",
    "director" : "Quentin Tarantino",
    "año" : 1983,
    "duración" : 120,
    "genero" : "Acción"
  }
}

## 3. Actualizar año, director y duración de una película por su id
**Método HTTP**: PUT
**URI**: /movies/1
**Json enviado**:
{
  "id" : 1,
  "director" : "Bryan Flores",
  "año" : 2026,
  "duracion" : 60
}
**Json recibido**:
{
  "code": 200,
  "msg": "Película actualizada"
}

## 4. Borrar una película por su id
**Método HTTP**: Delete
**URI**: /movies/1
**Json enviado**:
{

}
**Json recibido**:
{
  "code": 200,
  "msg": "Película borrada"
}
 
