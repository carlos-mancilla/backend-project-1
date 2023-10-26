# Proyecto Backend parte 2

Se recomienda usar Node.js 18+. Se debe ejecutar `npm install` para instalar las dependencias una vez descargado el proyecto.

La ruta por defecto de este proyecto es http://localhost:3001 .

Se debe crear un archivo .env basado en el archivo .env.sample

El archivo usado como bbdd es un archivo .json y debe tener como mínimo la siguiente estructura inicial

```
{
    "users": []
}
```

El proyecto incluye un archivo bd.json para poder ser utilizado.

En esta segunda parte se agregó seguridad con JWT.

## Scripts disponibles

### `npm run dev`

Este script ejecuta el proyecto usando Nodemon

### `npm run test`

Este script ejecuta los test unitarios

### `npm run start`

Este script ejecuta el servicio de forma normal