# Guía de Despliegue en cPanel

Este proyecto usa un sistema híbrido de configuración que funciona perfecto en cPanel.

## ¿Cómo Funcionan las Variables en cPanel?

El proyecto está configurado para usar **dos métodos**:

1. **Variables de entorno** (para desarrollo local)
2. **Archivo config.js** (para producción en cPanel)

El código primero intenta leer `config.js`, y si no existe, usa las variables de entorno. Esto te da flexibilidad total.

---

## Método 1: Build Local + Subir a cPanel (Recomendado)

### Paso 1: Configurar localmente

Asegúrate de que tu archivo `.env` tenga las credenciales correctas:

```env
PUBLIC_GOOGLE_CLIENT_ID=593546219802-r7ipaalg4qncb4af4e4rfarg9n052hf6.apps.googleusercontent.com
PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbw0LSG9bUq8iH4cxf5GTFfWgrWMBu2LiES0o2IVuFqfX_ez_moMs0mXtTkO8TRO3Mrmvw/exec
```

### Paso 2: Hacer el build

```bash
npm run build
```

Esto genera la carpeta `dist/` con todos los archivos optimizados.

### Paso 3: Subir a cPanel

**Opción A: Via FTP**
1. Conéctate a tu servidor vía FTP (FileZilla, WinSCP, etc.)
2. Ve a la carpeta `public_html` (o `www`, `httpdocs` según tu hosting)
3. Sube TODO el contenido de la carpeta `dist/` (no la carpeta dist, sino su contenido)

**Opción B: Via File Manager de cPanel**
1. Entra a cPanel > File Manager
2. Ve a `public_html`
3. Sube un ZIP de la carpeta `dist/`
4. Extrae el ZIP en `public_html`

### Paso 4: Configurar el archivo config.js (opcional)

Si necesitas cambiar las URLs en el servidor sin hacer un nuevo build:

1. Ve a `public_html/config.js`
2. Edita el archivo con tus credenciales:

```javascript
window.APP_CONFIG = {
  GOOGLE_CLIENT_ID: 'tu_client_id_aqui',
  GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec'
};
```

---

## Método 2: Solo Editar config.js en Producción

Si ya has desplegado y solo necesitas cambiar las URLs:

1. Accede a cPanel > File Manager
2. Ve a `public_html/config.js`
3. Haz clic derecho > Edit
4. Cambia las URLs:

```javascript
window.APP_CONFIG = {
  GOOGLE_CLIENT_ID: 'nuevo_client_id',
  GOOGLE_SHEETS_URL: 'nueva_url_de_sheets'
};
```

5. Guarda y recarga tu sitio

**No necesitas hacer un nuevo build**, los cambios se aplican inmediatamente.

---

## Estructura de Archivos en cPanel

Tu `public_html` debería verse así:

```
public_html/
├── index.html
├── config.js          ← Archivo editable para cambiar URLs
├── _astro/
│   └── ... (archivos compilados)
├── favicon.svg
└── ... (otros archivos)
```

---

## Ventajas de Este Método

✅ **No necesitas acceso a variables de entorno en cPanel**
✅ **Puedes cambiar las URLs directamente en el servidor**
✅ **No necesitas rebuild para cambiar configuración**
✅ **Funciona en cualquier hosting compartido**
✅ **config.js puede editarse con el editor de cPanel**

---

## Configurar Dominio en Google Cloud Console

No olvides agregar tu dominio en Google Cloud Console:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a "Credenciales"
4. Edita tu Client ID OAuth 2.0
5. En "Orígenes autorizados de JavaScript" agrega:
   ```
   https://tudominio.com
   https://www.tudominio.com
   ```

---

## Solución de Problemas

### No funciona el botón de Google
- Verifica que el dominio esté autorizado en Google Cloud Console
- Abre la consola del navegador (F12) y revisa si hay errores
- Verifica que `config.js` tenga el Client ID correcto

### No se guardan los datos en Google Sheets
- Verifica que la URL en `config.js` sea la correcta (debe terminar en `/exec`)
- Confirma que el script de Apps Script esté desplegado con permisos públicos
- Revisa la consola del navegador para ver si hay errores de red

### Necesito cambiar las URLs
- Edita `config.js` directamente en el servidor
- No necesitas hacer un nuevo build
- Los cambios se aplican inmediatamente al recargar

---

## Archivo .htaccess (Opcional)

Si tu sitio está en una subcarpeta o necesitas redirects, crea un `.htaccess`:

```apache
# Redirect www to non-www (opcional)
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Opcional: Forzar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Checklist de Despliegue

- [ ] Build local: `npm run build`
- [ ] Subir contenido de `dist/` a `public_html`
- [ ] Editar `config.js` con las URLs correctas
- [ ] Agregar dominio en Google Cloud Console
- [ ] Probar el login de Google
- [ ] Probar el formulario nativo
- [ ] Verificar que los datos lleguen a Google Sheets

---

¡Listo! Tu aplicación debería estar funcionando en cPanel sin problemas.
