# Proyecto de Webpack con Handlebars y Sass.
El propósito de este proyecto es crear un entorno para aprender JavaScript en frontend sin frameworks ni jquery pero aprovechando los beneficios de Node mediante Webpack. Esta configuración de Webpack está enfocada en facilitar el desarrollo de CSS y HTML.

## Compilación
**Nota:** Todos los comandos de esta sección requieren una terminal abierta en la raíz del proyecto.

### Requisitos previos
1. Tener instalado [NodeJS](https://nodejs.org/es/).
2. Instalar localmente las dependencias del proyecto con el comando `npm i`. Esto debe crear una pesada carpeta llamada **node_modules**.
3. Copiar y pegar el contenido de **.env.example** en un nuevo archivo llamado **.env**. Se puede cambiar el valor de las variables pero no su nombre.

### Cargar el proyecto en un puerto de localhost
Esta opción es útil para desarrollar, pues la aplicación se carga en un puerto local (el definido dentro de **.env**) y escucha los cambios hechos en el código fuente usando [HMR](https://webpack.js.org/concepts/hot-module-replacement/). Esto quiere decir que ~~casi todos~~ los cambios en el código se verán reflejados en localhost sin necesidad de recargar la página.

El siguiente comando carga la app y la abre en el navegador:
```
npm run dev
```

### Construir una versión de producción
La lógica de webpack es pedirle a los módulos de JavaScript que carguen el css, html, imágenes, etc. Pero en un navegador lo tradicional es que el html sea el punto de partida para pedir los demás recursos.

El siguiente comando sirve para construir una versión del proyecto que funcione igual al hecho en Webpack pero que sea legible por los navegadores:
```
npm run build
```
El código generado se guardará en la carpeta **/dist** y estará algo optimizado.


## Cómo funciona la configuración
La mayoría de la configuración está basada en [este video de YouTube](https://youtu.be/7e5apiL6tVQ), pero con algunas diferencias clave explicadas a continuación.

#### Limpieza de **/dist**
En lugar de eliminar dicha carpeta desde la línea de comandos cada vez que se construya el proyecto, se usa [CleanWebpackPlugin](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder) para limpiar los archivos basura del **/dist**.

#### .env
Separar la configuración del código fuente es uno de los factores incluídos en [The Twelve-Factor App](https://12factor.net/config) para cumplir con algunos criterios de calidad. Este archivo sirve para guardar valores que dependan del entorno en que corra la app. El código podrá acceder a dichas variables mediante el objeto global `process.env` después de [requerir y configurar dotenv](https://www.npmjs.com/package/dotenv#usage). Por ejemplo:
```dosini
# Inside .env
PORT=9000
```
```javascript
// Inside webpack.config.js
require('dotenv').config();

module.exports = {
  // ...
  devServer: {
    port: process.env.PORT, // From .env
    open: true,
  },
};
```

#### `import` absoluto
En los proyectos grandes de JavaScript no se recomienda abusar de los `import` relativos porque pueden generarse líneas poco legibles. En [este artículo](https://nimblewebdeveloper.com/blog/absolute-alias-imports-in-javascript-vscode) se explica bien el pequeño tema y da un par de tips adicionales. En resumen, usamos [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias) para poder hacer referencia a la carpeta **/src** desde cualquier archivo JavaScript.

De momento sólo se configuró para de JavaScript. No funciona en nuestras plantillas (handlebars) ni estilos (scss).

#### Rutas
Si usaron la aplicación, se habrán dado cuenta de que se generan dos rutas (la página inicial y _/about_). Esto se debe a una configuración de [webpack.config.js](webpack/webpack.config.js). Cada instancia de [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) que se añada al arreglo `plugins` va a generar un archivo html, configurado con las siguientes propiedades:
+ `template` indica el archivo que se va a procesar para esa ruta.
+ `chunks` es un arreglo que contiene los archivos de JavaScript utilizados. Cada valor corresponde a una propiedad de `entry`.
+ `filename` es el nombre del archivo generado.

Hay otras propiedades, pero esas son las más importantes. Nosotros usamos una función llamada `route` para no tener que escribir varias veces las propiedades más comunes.


## Lista de dependencias y plugins
### Principales
+ [Webpack](https://webpack.js.org/).
+ [Handlebars](https://handlebarsjs.com/).
+ [Sass](https://sass-lang.com/).
+ [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/).
### Para facilitar el desarrollo
+ [dotenv](https://www.npmjs.com/package/dotenv).
+ [DevServer](https://webpack.js.org/configuration/dev-server/).
+ [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin).
### Optimización
+ [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader).

El resto de las dependencias son usadas _nomás pa' que compile_ y no vale la pena mencionarlas. Para detalles específicos, ver nuestro [package.json](./package.json).


## TO-DO
+ Hacer que los _entry points_ inserten datos en archivos `.handlebars`.
+ Agregar librerías.
  - Estilos de [Bootstrap](https://getbootstrap.com/).
  - Íconos de [Font Awesome](https://fontawesome.com/icons?d=gallery).
+ Guardar las fuentes en archivos locales en lugar de importarlas de internet (en realidad no sé qué tanta diferencia haga).


## Oportunidades de mejora
Este entorno está enfocado en aprender frontend, pero si alguien quiere usarlo para dar un par de pasos extra aquí hay algunos tips:
+ Incluir [Babel](https://babeljs.io/) para compatibilidad entre navegadores.
+ [Optimizar las rutas](https://sgom.es/posts/2018-01-18-multiple-routes-webpack/).
