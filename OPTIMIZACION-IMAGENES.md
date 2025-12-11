# Optimización de Imágenes de Fondo

## 📋 Resumen de Optimizaciones Implementadas

Se han implementado las siguientes optimizaciones para mejorar la carga de imágenes de fondo:

### 1. **Preload de Imágenes Críticas**
Las imágenes de fondo principales ahora se precargan en el `<head>` del documento con `fetchpriority="high"`, lo que permite al navegador descargarlas prioritariamente.

### 2. **Imágenes WebP Optimizadas**
Se configuró el CSS para usar versiones WebP optimizadas con fallback a PNG/JPEG para navegadores que no soportan WebP.

### 3. **Imágenes Responsive**
Se implementaron diferentes versiones de imágenes según el dispositivo:
- Móvil: versión estándar (768px)
- Móvil Retina: versión @2x (1536px)
- Desktop: versión optimizada (1920px)
- Desktop Retina: versión @2x (2560px)

### 4. **Mejoras de Rendimiento CSS**
- Eliminado `background-attachment: fixed` que causa problemas de performance
- Agregado `image-rendering: crisp-edges` para mejor renderizado

## 🚀 Cómo Generar las Imágenes Optimizadas

### Paso 1: Instalar dependencias
```bash
npm install --save-dev sharp
```

### Paso 2: Ejecutar el script de optimización
```bash
npm run optimize-images
```

Este script:
- ✅ Convierte PNG/JPEG a WebP
- ✅ Redimensiona las imágenes a tamaños óptimos
- ✅ Aplica compresión con calidad 75-80%
- ✅ Genera versiones @2x para pantallas Retina
- ✅ Muestra el porcentaje de reducción de tamaño

### Paso 3: Verificar los archivos generados
El script creará estos archivos en `public/assets/`:
- `background-optimized.webp` (768px, ~40-50KB esperado)
- `background-optimized@2x.webp` (1536px, ~80-100KB esperado)
- `bg1-optimized.webp` (1920px, ~60-80KB esperado)
- `bg1-optimized@2x.webp` (2560px, ~120-150KB esperado)

## 📊 Beneficios Esperados

### Antes de la optimización:
- `background.png`: 132KB
- `bg1.jpeg`: 114KB
- **Total**: ~246KB

### Después de la optimización:
- Versiones WebP: ~40-150KB (según resolución)
- **Reducción esperada**: 40-60% del tamaño original
- **Carga más rápida**: 2-3x más rápido en conexiones lentas

## 🔧 Alternativa: Optimización Manual

Si prefieres optimizar las imágenes manualmente, puedes usar:

### Opción 1: Squoosh (Online)
1. Ve a https://squoosh.app
2. Sube las imágenes
3. Selecciona formato WebP
4. Ajusta calidad a 75-80%
5. Descarga y renombra según la convención

### Opción 2: ImageMagick (CLI)
```bash
# Móvil
magick convert public/assets/background.png -resize 768x -quality 80 public/assets/background-optimized.webp
magick convert public/assets/background.png -resize 1536x -quality 75 public/assets/background-optimized@2x.webp

# Desktop
magick convert public/assets/bg1.jpeg -resize 1920x -quality 80 public/assets/bg1-optimized.webp
magick convert public/assets/bg1.jpeg -resize 2560x -quality 75 public/assets/bg1-optimized@2x.webp
```

## 🎯 Recomendaciones Adicionales

1. **Comprimir imágenes originales**: Considera reducir el tamaño de las PNG/JPEG originales como fallback
2. **CDN**: Si usas un CDN, habilita compresión automática de imágenes
3. **Lazy loading**: Para imágenes no críticas (álbum, etc.), considera lazy loading
4. **Monitoring**: Usa Lighthouse para monitorear el rendimiento

## 🧪 Testing

Para verificar que las optimizaciones funcionen:

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña Network
3. Filtra por "Img"
4. Recarga la página
5. Verifica que se carguen las versiones `.webp`
6. Compara los tamaños antes y después

## ⚡ Impacto en Performance

Con estas optimizaciones deberías ver:
- ✅ **LCP (Largest Contentful Paint)**: Mejora de 1-2 segundos
- ✅ **FCP (First Contentful Paint)**: Mejora de 0.5-1 segundo
- ✅ **Total Blocking Time**: Reducción significativa
- ✅ **Score de Lighthouse**: +10-20 puntos en Performance
