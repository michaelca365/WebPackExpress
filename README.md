<h1> Curso de Webpack con React </h1>

<h2> 1.  Instalacion de Webpack y babel </h2>

* Para la instalación de Webpack se emplean los paquetes <code> npm i webpack -D </code>, el cual instala el paquete del core y <code>npm i  webpack-cli -D</code> el cual permite emplear wepack con la linea de comandos. 
* Para babel y su correcta implementación con webpack se emplean los paquetes <code> @babel/core @babel/preset-env babel-loader </code> El primero como su nombre lo indica instala todo el nucleo de babel, el segundo permite la implementación de ecmascript 6, y el tercero permite cargar babel en webpack para posteriormente poder transpilarlo

<h2>2. Configurar Webpack</h2>

* El primer paso es generar el archivo <code> webpack.config.js </code> en la carpeta raiz del proyecto 

* Dado que webpack en su configuracion requiere el uso contante tanto de rutas relativas y absoultas, lo mejor es utilizar <code> path</code>, el cual ya viene dentro de la libreria de nodeJs

````javascript
const path = require('path');

````
* Para realizar la configuración se debe especificar un nombre, un punto de entrada de la aplicación, y el directorio donde se va a ubicar los achivos una vez renderizado llamado output, el cual recibe dos propiedades; la ruta y el filename
````javascript
const path = require('path');

module.exports = {
    name: 'express-server',
    entry: './src/',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
}
````
* Una vez definidos los los puntos de entrada y salida, se debe especificar a webpack con que archivos o extensiones de archivos debe trabajar. Lo anterior se hace mediante la propiedad resolve 

````javascript
{
    [...],
    resolve: {
        extensions: ['.js']
    }
}

````

* Ahora se debe construir un modulo para trabajar con las reglas que va a implementar webpack y cargar los loaders con los que se va a trabajar en la aplicacion. Los loaders que se implementan dependen de los recursos con los que va a contar la aplicacion, como puede ser; babel, css, html, styl, etc..
* Dentro de las Reglas generales <code> test </code> especifica la extensión a trabajar, <code> exclude </code> los directorios o archivos a excluir, y el loader es el que se encarga de recopilar.
````javascript

module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
````

* Cuando se desea transcompilar el codigo con webpack es ecesario especificar cual es el entorno o framework con el cual se va a ejecutar el codigo, para nuestro caso es con node, generalmente viene por defecto con 'browserlist'.

````javascript
module.exports = {
    name: 'express-server',
    entry: './src/',
    target: 'node',
}
````

* Dado que en la aplicación se va a utilizar <code> babel </code> se debe agregar un archivo a la raiz con la configuracion de babel antes de poder transcompilar con webpack. Para ello se agrega el archivo <code> .babelrc </code> en la raiz del proyecto.

````javascript 

{
    "presets": [
        "@babel/preset-env"
    ]
}

````

<h2>3. Implementando TypeScript </h2>

* Para implementar typescript se van a emplear los paquetes <code> npm i typescript ts-loader @types/express -D</code>
* Al emplear typescript se puede cambiar el modo de importar las funciones 

````typescript

import * as express from 'express';
import {request, response} from 'express';

````

* En este caso para utilizar express es necesario agregar tipado a las funciones que reciban parametros 

````javascript
app.get('/', (req: Request,res: Response)=>{
    res.send('Hello TypeScript');
});
````
* Dado que webpack debe ahora compilar typescript es necesario agegar el loader de typescript dentro de <code> webpack.config.js </code> especificamente dentro de las reglas

`````javascript 
module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.ts$/,
        use:{
          loader: "ts-loader"
        }
      }
    ]
  }

`````

* Dado que el archivo de entrada del proyecto es de tipo typescript es necesario crear un archivo de configuración llamado <code> tsconfig.ts </code> este archivo especifica las opciones requeridas para compilar el proyecto

````json
{
    "compilerOptions": {
        "sourceMap": true
    }
}

````

* cuando se empaqueta con webpack desde el backend, no se desea empaquetar los<code> node_modules</code> de node, instalando nodeExternals se crea una función que ignora esta carpeta <code> npm install webpack-node-externals -D </code>, y añadiendo al <code> webpack.config.js </code>

````javascript
module.exports = {
  externals: [nodeExternals()],
}

````
