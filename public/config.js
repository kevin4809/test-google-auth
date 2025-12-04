/**
 * Configuración para Producción
 *
 * Este archivo se puede editar directamente en el servidor (cPanel, FTP, etc.)
 * sin necesidad de hacer un nuevo build.
 *
 * IMPORTANTE: Las URLs aquí tienen prioridad sobre las variables de entorno.
 *
 * Para obtener estas URLs:
 * 1. GOOGLE_CLIENT_ID: Google Cloud Console > Credenciales > Client ID OAuth 2.0
 * 2. GOOGLE_SHEETS_URL: Apps Script > Implementar > URL de la aplicación web (termina en /exec)
 */

window.APP_CONFIG = {
  // Google OAuth Client ID
  GOOGLE_CLIENT_ID: '593546219802-r7ipaalg4qncb4af4e4rfarg9n052hf6.apps.googleusercontent.com',

  // Google Sheets Web App URL (debe terminar en /exec)
  GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/AKfycbw0LSG9bUq8iH4cxf5GTFfWgrWMBu2LiES0o2IVuFqfX_ez_moMs0mXtTkO8TRO3Mrmvw/exec'
};
