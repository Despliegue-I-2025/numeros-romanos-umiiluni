# Deploy en Vercel

Esta guía te muestra cómo publicar tu convertidor de números romanos en Vercel en 3 pasos simples.

## Requisitos

- Cuenta en GitHub con tu repositorio
- Cuenta en Vercel (puedes crearla con tu cuenta de GitHub)

## Paso 1: Preparar el repositorio (local)

```bash
# Si aún no subiste el código a GitHub
git init
git add .
git commit -m "Convertidor de números romanos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/roman-numerals-converter.git
git push -u origin main
```

## Paso 2: Conectar Vercel a GitHub

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Selecciona "Import Git Repository"
4. Autoriza acceso a tu GitHub
5. Selecciona el repositorio `roman-numerals-converter`
6. Haz clic en "Import"

## Paso 3: Configuración automática

Vercel detectará automáticamente:
- **Framework**: Vite (JavaScript)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Solo haz clic en "Deploy" y espera.

## Después del Deploy

Una vez desplegado, tu aplicación estará disponible en una URL como:
```
https://roman-numerals-converter.vercel.app
```

El servidor API también estará disponible:
- `https://roman-numerals-converter.vercel.app/api/r2a?roman=XIV`
- `https://roman-numerals-converter.vercel.app/api/a2r?arabic=14`

## Configuración Avanzada (Opcional)

Si necesitas configurar variables de entorno:

1. En el dashboard de Vercel, ve a "Settings" > "Environment Variables"
2. Agrega tus variables
3. Haz re-deploy con el botón "Redeploy"

## Troubleshooting

**Error: "Build failed"**
- Verifica que `npm run build` funcione localmente: `npm run build`
- Revisa los logs de build en el dashboard de Vercel

**La aplicación no se ve**
- Verifica que `dist/index.html` existe tras hacer `npm run build`
- Comprueba que vite.config.js está correctamente configurado

**API no funciona**
- Verifica que los endpoints en `/api/` son accesibles
- Revisa la consola del navegador para errores CORS

## Actualizar la aplicación

Cada vez que hagas `git push` a `main`, Vercel automáticamente:
1. Detecta el cambio
2. Ejecuta `npm run build`
3. Despliega la nueva versión

No necesitas hacer nada más, es automático.

## Dominios Personalizados (Opcional)

1. Ve a "Settings" > "Domains" en el proyecto de Vercel
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones de Vercel

## Más Información

- [Documentación oficial de Vercel](https://vercel.com/docs)
- [Documentación de Vite en Vercel](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)
