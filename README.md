# Example Hono Backend

Este repositorio es un ejemplo de un backend utilizando Hono, un framework web ligero y rápido, ideal para construir APIs eficientes. El proyecto está desarrollado en TypeScript e incluye la configuración básica, manejo de rutas, conexión a una base de datos PostgreSQL, y ejemplos de middleware.

## Requisitos

- Node.js v16 o superior
- PostgreSQL

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/example-hono-backend.git
   cd example-hono-backend
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Configuración

1. Abre el archivo `wrangler.toml` y busca la siguiente línea:
   ```toml
   DATABASE_URL = ""
   ```
2. Reemplaza el valor de `DATABASE_URL` con la cadena de conexión a tu base de datos PostgreSQL. Por ejemplo:
   ```toml
   DATABASE_URL = "postgres://usuario:contraseña@localhost:5432/nombre_base_de_datos"
   ```

## Uso

### Desarrollo

Para ejecutar el proyecto en modo de desarrollo, usa el siguiente comando:

```bash
npm run dev
```

Este comando inicia el servidor en el puerto especificado en el archivo `wrangler.toml` (por defecto, 50000).

### Despliegue

Para desplegar el proyecto en un entorno de producción, utiliza el siguiente comando:

```bash
npm run deploy
```

## Endpoints

El proyecto incluye varios endpoints para interactuar con la base de datos PostgreSQL:

- **GET `/products`**: Obtiene la lista de productos.
- **GET `/products/:id`**: Obtiene un producto por su ID.
- **GET `/users`**: Obtiene la lista de usuarios.
- **GET `/`**: Ruta raíz que retorna un mensaje de bienvenida.

## Contribución

Si encuentras algún problema o deseas mejorar el proyecto, siéntete libre de abrir un issue o enviar un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.
