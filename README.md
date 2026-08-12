# Estaciones Policiales Más Cercanas

Aplicación en la nube que recibe una latitud y longitud y devuelve las
estaciones policiales más cercanas. Incluye:

- `data/estaciones.json` — lista de 6 estaciones policiales (nombre, lat, lon).
- `netlify/functions/estaciones.js` — API (servicio) que calcula distancias con la fórmula de Haversine y devuelve las N estaciones más cercanas.
- `public/index.html` — página web donde el usuario ingresa sus coordenadas y presiona "Buscar".
- `netlify.toml` — configuración para que Netlify despliegue la página y la función juntas, en la misma URL.

Todo se despliega como **un solo sitio de Netlify**, así que solo obtienes
una URL pública que sirve tanto la página como la API (en `/.netlify/functions/estaciones`).

---

## Cómo desplegarlo (sin usar la terminal)

Ya tienes cuentas en **GitHub** y **Netlify**, así que sigue estos pasos:

### 1. Sube el proyecto a GitHub

1. Entra a [github.com/new](https://github.com/new) y crea un repositorio nuevo (por ejemplo `estaciones-policiales`). Puede ser público o privado.
2. Descomprime el archivo `.zip` que te envié en tu computadora.
3. En la página del repositorio recién creado, haz clic en **"uploading an existing file"** (o **"Add file" → "Upload files"**).
4. Arrastra **toda la carpeta** `proyecto-estaciones` (o todos sus archivos y subcarpetas: `data/`, `netlify/`, `public/`, `netlify.toml`) hacia el área de carga. Los navegadores modernos (Chrome) preservan la estructura de carpetas al arrastrar.
5. Escribe un mensaje de commit (ej. "Primera versión") y haz clic en **"Commit changes"**.
6. Verifica que en GitHub quedó así:
   ```
   data/estaciones.json
   netlify/functions/estaciones.js
   public/index.html
   netlify.toml
   ```

### 2. Conecta el repositorio con Netlify

1. Entra a [app.netlify.com](https://app.netlify.com) y haz clic en **"Add new site" → "Import an existing project"**.
2. Elige **GitHub** y autoriza el acceso si te lo pide.
3. Selecciona el repositorio `estaciones-policiales` que acabas de crear.
4. Netlify detectará automáticamente el archivo `netlify.toml` (publish = `public`, functions = `netlify/functions`). No necesitas cambiar nada; solo haz clic en **"Deploy site"**.
5. Espera 1-2 minutos mientras Netlify construye el sitio.

### 3. Obtén tu URL pública

1. Cuando termine el despliegue, Netlify te dará una URL como `https://nombre-al-azar.netlify.app`.
2. (Opcional) Puedes cambiarla en **"Site settings" → "Change site name"** por algo como `estaciones-policiales-kisna.netlify.app`.
3. Abre esa URL — verás la página web. Prueba escribiendo una latitud/longitud (o usa el botón "Usar mi ubicación actual") y presiona **Buscar**.

### 4. Prueba desde tu celular

Abre la misma URL desde el navegador de tu celular y repite la prueba.

---

## Coordenadas de prueba (Tegucigalpa)

| Latitud | Longitud   |
|---------|------------|
| 14.0900 | -87.2000   |
| 14.0520 | -87.2100   |
| 14.1050 | -87.1850   |

## Qué entregar en Canvas

- **URL de tu página web desplegada** (la de Netlify, ej. `https://estaciones-policiales-kisna.netlify.app`) — esta misma URL sirve como API pública en `https://tu-sitio.netlify.app/.netlify/functions/estaciones?lat=14.09&lon=-87.20&limite=3`.
- El código fuente ya está en tu repositorio de GitHub (API + Frontend).
- El archivo `data/estaciones.json` con las estaciones.

## Cómo probar la API directamente (sin la página web)

Una vez desplegado, abre en el navegador:

```
https://tu-sitio.netlify.app/.netlify/functions/estaciones?lat=14.09&lon=-87.20&limite=3
```

Debería devolver un JSON con las 3 estaciones más cercanas y su distancia en km.
