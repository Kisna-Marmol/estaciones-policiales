// netlify/functions/estaciones.js
//
// API que recibe una latitud y longitud (por query string) y devuelve
// las estaciones policiales más cercanas, ordenadas por distancia.
//
// Ejemplo de uso:
//   /.netlify/functions/estaciones?lat=14.0900&lon=-87.2000&limite=3

const estaciones = require("../../data/estaciones.json");

// Fórmula de Haversine: calcula la distancia en km entre dos coordenadas
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // radio de la Tierra en km
  const toRad = (grados) => (grados * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const params = event.queryStringParameters || {};
  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);
  const limite = params.limite ? parseInt(params.limite, 10) : 3;

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: "Debes enviar parámetros 'lat' y 'lon' numéricos. Ej: ?lat=14.09&lon=-87.20",
      }),
    };
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Coordenadas fuera de rango válido." }),
    };
  }

  const resultados = estaciones
    .map((estacion) => ({
      nombre: estacion.nombre,
      lat: estacion.lat,
      lon: estacion.lon,
      distancia_km: Number(
        calcularDistanciaKm(lat, lon, estacion.lat, estacion.lon).toFixed(2)
      ),
    }))
    .sort((a, b) => a.distancia_km - b.distancia_km)
    .slice(0, limite > 0 ? limite : 3);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(
      {
        consulta: { lat, lon, limite },
        estaciones_mas_cercanas: resultados,
      },
      null,
      2
    ),
  };
};
