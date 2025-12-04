# Configuración del Sistema de Registro

Este proyecto implementa un sistema de registro con Google OAuth y formulario nativo, que envía los datos directamente a Google Sheets.

## Pasos de Configuración

### 1. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Identity
4. Ve a "Credenciales" y crea un ID de cliente OAuth 2.0
5. Configura los orígenes autorizados de JavaScript:
   - Para desarrollo local: `http://localhost:4321`
   - Para producción: tu dominio
6. Copia el Client ID

### 2. Configurar Google Sheets

1. Crea una nueva hoja de cálculo en Google Sheets
2. Configura las columnas en la primera fila: `Nombre`, `Apellido`, `Email`, `Fecha`
3. Ve a **Extensiones > Apps Script**
4. Borra el código predeterminado y pega el siguiente código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.nombre,
    data.apellido,
    data.email,
    new Date()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doGet(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

5. Guarda el proyecto con un nombre descriptivo
6. Haz clic en **Implementar > Nueva implementación**
7. Selecciona el tipo: **Aplicación web**
8. Configura:
   - **Ejecutar como**: Tu cuenta
   - **Quién tiene acceso**: Cualquier persona
9. Haz clic en **Implementar**
10. Autoriza los permisos necesarios
11. Copia la URL de la aplicación web (termina en `/exec`)

### 3. Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (copia de `.env.example`):

```bash
cp .env.example .env
```

2. Edita el archivo `.env` y agrega tus credenciales:

```env
# Google OAuth
PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_de_google.apps.googleusercontent.com

# Google Sheets Web App URL (from Apps Script deployment)
PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

### 4. Iniciar el Proyecto

```bash
# Instalar dependencias (si aún no lo has hecho)
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:4321`

---

## Despliegue en Producción (cPanel)

Para desplegar en cPanel o cualquier hosting compartido, consulta la guía detallada en [DESPLIEGUE-CPANEL.md](DESPLIEGUE-CPANEL.md).

**Resumen rápido:**
1. Ejecuta `npm run build`
2. Sube el contenido de `dist/` a tu `public_html`
3. Edita `public_html/config.js` con tus URLs si es necesario

## Funcionalidades

### Login con Google
- Haz clic en el botón "Continuar con Google"
- Selecciona tu cuenta de Google
- Los datos (nombre, apellido, email) se extraen automáticamente
- Se envían a Google Sheets automáticamente

### Registro Manual
- Si no tienes cuenta de Google o prefieres no usarla
- Completa el formulario con nombre, apellido y email
- Haz clic en "Registrarse"
- Los datos se envían a Google Sheets

## Estructura de Datos en Google Sheets

Cada registro se guarda con la siguiente estructura:

| Nombre | Apellido | Email | Fecha |
|--------|----------|-------|-------|
| Juan | Pérez | juan@email.com | 2024-01-15 10:30:00 |

## Notas Importantes

- La URL de Google Sheets debe ser la URL de implementación (termina en `/exec`)
- El modo `no-cors` se usa porque Google Apps Script no permite CORS completo
- Los datos se envían correctamente aunque no se pueda leer la respuesta
- Asegúrate de que el script de Apps Script tenga permisos de "Cualquier persona"

## Solución de Problemas

### No se guardan los datos
1. Verifica que la URL del script sea la correcta (termina en `/exec`)
2. Asegura que el script esté implementado y tenga permisos públicos
3. Revisa la consola del navegador para ver errores

### El botón de Google no aparece
1. Verifica que el `PUBLIC_GOOGLE_CLIENT_ID` sea correcto
2. Asegura que el dominio esté autorizado en Google Cloud Console
3. Revisa la consola del navegador para ver errores

### Error de CORS
- Esto es normal con Google Apps Script en modo `no-cors`
- Los datos se envían correctamente aunque no puedas ver la respuesta
- Puedes verificar los datos en tu hoja de cálculo de Google Sheets
