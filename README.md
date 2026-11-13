# MISTERIOS DEL MUNDO – El universo de los mitos y leyendas

Enciclopedia internacional e interactiva dedicada a recopilar los mitos, leyendas, dioses, criaturas legendarias, lugares misteriosos y folclore tradicional de los 195 países del mundo, con una sección especial consagrada al folclore paraguayo y las tradiciones guaraníes.

## Despliegue en Render (Static Site)

1. Sube este repositorio a GitHub.
2. En Render, selecciona **New + → Static Site** y conecta tu repositorio.
3. Configura los parámetros exactos:
   - **Root Directory**: *(vacío)*
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. El archivo `public/_redirects` ya incluye la regla `/* /index.html 200` para enrutamiento SPA.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilación de producción

```bash
npm run build
```
