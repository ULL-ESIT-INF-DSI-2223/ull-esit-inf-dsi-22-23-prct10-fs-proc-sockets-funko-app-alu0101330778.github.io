# [PRÁCTICA 10.](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101330778.github.io). 

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101330778.github.io/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101330778.github.io?branch=main)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof/actions/workflows/coveralls.yml)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101330778.github.io)
## Jairo Alonso Abreu - alu0101330778.

## Índice <a name="índice"></a>
1. [Introducción](#introducción)
2. [Funcionamiento de la aplicación](#funcionamiento)
3. [Ejercicio 1](#ej1)
4. [Ejercicio 2](#ej2)
5. [Ejercicio 3](#ej3)
6. [Conclusiones](#conclusiones)
7. [Referencias](#referencias)

## Introducción <a name="introducción"></a>
> [Volver al índice](#índice)

En está práctica se han desarrollado 3 ejercicios. 

## Ejercicio 1 <a name="ej1"></a>
> [Volver al índice](#índice)
En este ejercicio se nos pide que se haga una traza de los cambios en en el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola del siguiente código:

```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
Para ello, se simularon dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. Para representar los elementos de la traza se utilizará el siguiente formato:
Pila de llamadas:
```ts
```
Registro de eventos de la API:
```ts
```
Cola de manejadores:
```ts
```
Output:
```
```
### Comienza la traza:
Primero se ejecuta la sentencia `if` que comprueba que se ha pasado un argumento por la línea de comandos.
Pila de llamadas:
```ts
if (process.argv.length !== 3)
```
El resto de campos están vacíos. Una vez resuelta la condición se elimina de la pila de llamadas. Si la condición es verdadera se ejecuta un `console.log` que muestra un mensaje por consola. La pila de llamadas recibe el `console.log` y se ejecuta. Una vez resuelto se elimina de la pila de llamadas.
Pila de llamadas:
```ts
console.log('Please, specify a file');
```
El resto de campos siguen vacíos. Si la sentencia `if` es falsa se ejecuta el siguiente bloque de código:
```ts
const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
```
Resumidamente, este bloque de código comprueba si el fichero es accesible con la función `access` de la librería `fs`. Si el fichero no existe se muestra un mensaje por consola. Si el fichero existe se muestra otro mensaje por consola y se crea un `watcher` que se ejecuta cada vez que se modifica el fichero. Después se muestra otro mensaje por la consola. Debido a que watch es una función asíncrona que se activa con el cambio en un fichero se queda esperando a que se produzca el cambio. Por tanto, el resto del código se ejecuta sin esperar a que se produzca el cambio. Una vez se produce el cambio se ejecuta el manejador de eventos `watcher.on` y se muestra un mensaje por consola.

### Primera modificación del fichero:
Si seguimos donde los dejamos anteriormente se ejecuta el `console.log` que muestra el mensaje `Starting to watch file ${filename}`. La pila de llamadas recibe el `console.log` y se ejecuta. Una vez resuelto se elimina de la pila de llamadas.
#### Pila de llamadas:
```ts
console.log(`Starting to watch file ${filename}`);
```
#### Output:
```
Starting to watch file helloworld.txt
```

El resto de campos siguen vacíos. Después se crea un `watcher` que se ejecuta cada vez que se modifica el fichero. La pila de llamadas recibe la función `watch` y se ejecuta. Una vez resuelta se elimina de la pila de llamadas.
#### Pila de llamadas:
```ts
const watcher = watch(process.argv[2]);
```
El resto de campos siguen vacíos. A continuación se ejecuta el manejador de eventos `watcher.on` que se ejecuta cada vez que se modifica el fichero. La pila de llamadas recibe la función `watcher.on`.
#### Pila de llamadas:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
Seguidamente la envía al registro de eventos de la API.
#### Pila de llamadas:
```ts
```
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
El resto de campos siguen vacíos. Una vez se produce el cambio en el fichero se ejecuta el manejador de eventos `watcher.on`.
El siguiente paso es ejecutar el `console.log` que muestra el mensaje `File ${filename} is no longer watched`. La pila de llamadas recibe el `console.log` y se ejecuta. Una vez resuelto se elimina de la pila de llamadas.
#### Pila de llamadas:
```ts
console.log(`File ${filename} is no longer watched`);
```
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
#### Output:
```
File helloworld.txt is no longer watched
```
Tras ejecutarse el `console.log` se elimina de la pila de llamadas y solo queda el manejador de eventos `watcher.on` en el registro de eventos de la API. Hasta ahora el programa se ha ejecutado sin haber modificado el fichero y debido a que esta función es asíncrona se ha ejecutado la línea de código que muestra el mensaje `File ${filename} is no longer watched` cuando se sigue esperando a que se produzca el cambio en el fichero. Al escribir una letra en el fichero se detecta un cambio por lo que se activa el manejador de eventos `watcher.on` y se ejecuta el `console.log` que muestra el mensaje `File ${filename} has been modified somehow`.
Por lo tanto los cambios en los elementos son:
1. Se añade a la cola de manejadores el callback `() => {console.log(`File ${filename} has been modified somehow`);}` del manejador de eventos `watcher.on`
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
#### Cola de manejadores:
```ts
() => {console.log(`File ${filename} has been modified somehow`);}
```
2. Como la pila de llamadas está vacía el callback pasa a ella y se ejecuta.
#### Pila de llamadas:
```ts
console.log(`File ${filename} has been modified somehow`);
```
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
#### Output:
```
File helloworld.txt has been modified somehow
```
Una vez resuelto se elimina de la pila de llamadas y solo queda el manejador de eventos `watcher.on` en el registro de eventos de la API. Como no hay más cambios en el fichero el programa se queda esperando a que se produzca otro cambio.
#### Segunda modificación del fichero:
Si modificamos nuevamente el fichero se detecta un cambio por lo que se activa el manejador de eventos `watcher.on` y se ejecuta el `console.log` que muestra el mensaje `File ${filename} has been modified somehow`. Bastante parecido a la primera modificación del fichero.
Por lo tanto los cambios en los elementos son:
1. Se añade a la cola de manejadores el callback `() => {console.log(`File ${filename} has been modified somehow`);}` del manejador de eventos `watcher.on`
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
#### Cola de manejadores:
```ts
() => {console.log(`File ${filename} has been modified somehow`);}
```
2. Como la pila de llamadas está vacía el callback pasa a ella y se ejecuta.
#### Pila de llamadas:
```ts
console.log(`File ${filename} has been modified somehow`);
```
#### Registro de eventos de la API:
```ts
watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });
```
#### Output:
```
File helloworld.txt has been modified somehow
```
Una vez resuelto se elimina de la pila de llamadas y solo queda el manejador de eventos `watcher.on` en el registro de eventos de la API. Con estoas dos modificaciones podemos ver que los mensajes se ejecutan en un orden incorrecto ya que el mensaje `File ${filename} is no longer watched` sale antes de que se pueda hacer ninguna modificación y aún así después salen mensajes de que el código se ha modificado. Se debería de implementar algún método que cuando se cierre el documento se elimine el manejador de eventos `watcher.on` para que no siga a la espera y se ejecute el `console.log` que muestra el mensaje `File ${filename} is no longer watched`. Por último falta mencionar qué el objeto `constants.F_OK` especifica los parámetros de accesibilidad del fichero.
## Ejercicio 2 <a name="ej2"></a>
> [Volver al índice](#índice)
En este ejercicio se nos pedia que realizaramos dos aplicaciones para proporcionar información sobre el contenido de un fichero. Una aplicación será implementada con el método `pipe` mientras que la otra no.
### WithPipe
Para realizar esta aplicación se nos pedia que implementaramos una función que reciba como parámetros el nombre del fichero y los parámetros `-l`, `-c` y `-w` o cualquier combinación de estos tres y que devolviera el número de líneas, caracteres y palabras del fichero, respectivamente. Para ello se ha usado el método `pipe`.

#### Funcionamiento
Tras recibir los parámetros y el fichero, se generan 3 procesos hijos que ejecutan el comando `wc` con los parámetros `-l`, `-m` y `-w`, respectivamente. Estos procesos leen el texto a partir del `pipe` que le envía el proceso que ejecuta el comando `cat filename`. El programa comprueba que al menos haya un parámetro y que sean los correctos. Si todo es correcto se comprueba el acceso al fichero. En caso de que se pueda acceder, se crea el proceso que ejecuta el comando `cat filename` y se le envía el `pipe` a los procesos que ejecutan los comandos `wc` correspondientes.
```ts
import {spawn} from 'child_process';
import {access} from 'fs';
import fs from 'fs';

  const lineas = spawn('wc', ['-l']);
  const caracteres = spawn('wc', ['-m']);
  const palabras = spawn('wc', ['-w']);
if (process.argv.length >= 4 && process.argv.length <= 6) {
  
  for(let i = 3; i < process.argv.length; i++){
    if(process.argv[i] != "-l" && process.argv[i] != "-c" && process.argv[i] != "-w"){
      console.log("Error: Parámetros incorrectos")
      process.exit(1)
    }
  }
  const filename = process.argv[2];
  access(filename, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
      process.exit(1)
    } else {
      
      const cat = spawn('cat', [filename]);
  
for(let i = 3; i < process.argv.length; i++){
  if(process.argv[i] == "-l"){
    cat.stdout.pipe(lineas.stdin);
  }
  if(process.argv[i] == "-c"){
    cat.stdout.pipe(caracteres.stdin);
  }
  if(process.argv[i] == "-w"){
    cat.stdout.pipe(palabras.stdin);
  }
}
    }
  });
    
} else {
  console.log('Error: Parámetros incorrectos');
}
//Leer la cantidad de lineas
    lineas.stdout.on('data', (data) => {
      const result = parseInt(data.toString()) + 1;
      console.log(`El archivo tiene ` + result + ` lineas`);
    });
//Leer la cantidad de caracteres
    caracteres.stdout.on('data', (data) => {
      const result = parseInt(data.toString())
      console.log(`El archivo tiene ` + result + ` caracteres`);
    });
//Leer la cantidad de palabras
    palabras.stdout.on('data', (data) => {
      const result = parseInt(data.toString())
      console.log(`El archivo tiene ` + result + ` palabras`);
    });
```

#### Ejemplo de ejecución
Contenido en el fichero `holamundo.txt`:
```
Primera linea
4 lineas
8 palabras
47 caracteres
```
Ejecución del programa:
Ejemplo 1: Todas las opciones
```
$node dist/ej/ej2/withPipe.js src/ej/ej2/holamundo.txt -l -c -w
El archivo tiene 47 caracteres
El archivo tiene 8 palabras
El archivo tiene 4 lineas
```
Ejemplo 2: Solo una opción
```
$node dist/ej/ej2/withPipe.js src/ej/ej2/holamundo.txt -l
El archivo tiene 4 lineas
```
Ejemplo 3: Opciones incorrectas
```
$node dist/ej/ej2/withPipe.js src/ej/ej2/holamundo.txt -l -c -w -x
Error: Parámetros incorrectos
```
Ejemplo 4: Fichero no existente
```
$node dist/ej/ej2/withPipe.js src/ej/ej2/holamundo2.txt -l -c -w
File src/ej/ej2/holamundo2.txt does not exist
```

### WithoutPipe
Para realizar esta aplicación no se puede usar el método `pipe`. Por lo que es necesario leer el fichero y contar las líneas, caracteres y palabras. En comparación con la aplicacion anterior ya no existen procesos hijos que ejecuten los comandos `wc` y se ha cambiado el método `access` con el siguiente código:

```ts
access(filename, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
      process.exit(1)
    } else {
    const data = cat.stdout;
    data.on('data', (chunk) => {
      for(let i = 3; i < process.argv.length; i++){
        if(process.argv[i] == "-c"){
          console.log("Numero de caracteres: " + chunk.toString().length);
        } else if(process.argv[i] == "-l") {
          console.log("Número de lineas: " + chunk.toString().split("\n").length);
        } else if(process.argv[i] == "-w") {
          let words = 0;
          let datos: string[] = chunk.toString().split("\n");
          datos = datos.filter((line) => line.trim() !== "");
          datos.forEach((line) => {
            words += line.split(" ").length
          });
          console.log("Número de palabras: " + words);
      }
    }
    });


    }
  });
```
En este caso se puede ver que se ha añadido un evento `data` que reacciona cada vez que se lee un trozo de datos del fichero. En cada iteración se comprueba si se ha pasado el parámetro `-c`, `-l` o `-w` y se realiza la operación correspondiente de conteo.

#### Ejemplo de ejecución
Contenido en el fichero `holamundo.txt`:
```
Primera linea
4 lineas
8 palabras
47 caracteres
```
Ejecución del programa:
Ejemplo 1: Todas las opciones
```
$node dist/ej/ej2/withOutPipe.js src/ej/ej2/holamundo.txt -l -c -w
Número de lineas: 4
Numero de caracteres: 47
Número de palabras: 8
```
Ejemplo 2: Solo una opción
```
$node dist/ej/ej2/withOutPipe.js src/ej/ej2/holamundo.txt -c
Numero de caracteres: 47
```
Ejemplo 3: Opciones incorrectas
```
$node dist/ej/ej2/withOutPipe.js src/ej/ej2/holamundo.txt -l -c -w -x
Error: Parámetros incorrectos
```
Ejemplo 4: Fichero no existente
```
$node dist/ej/ej2/withOutPipe.js src/ej/ej2/holamundo2.txt -l -c -w
File src/ej/ej2/holamundo2.txt does not exist
```
## Ejercicio 3 <a name="ej3"></a>
> [Volver al índice](#índice)
Para el último ejercicio se ha creado una aplicación cliente-servidor que permite al usuario gestionar su colección de funkos, pudiendo listar, añadir, eliminar y buscar funkos. La aplicación cliente recibe el comando introducido por el usuario, lo gestiona y le envía al servidor la información necesaria. El servidor gestiona el comando y realiza la operación correspondiente modificando la base de datos si es necesario. En caso de éxito envía un mensaje al cliente o el recurso solicitado y en caso de error también reporta un mensaje.
Para implementar esta aplicación se han desarrollado dos clases, una para el cliente y otra para el servidor. Además se han reutilizado el schema de la práctica anterior y los tipos de datos. Los usuarios se guardan igual que en la práctica anterior, en la carpeta `users`, cada uno tiene una carpeta con su nombre y dentro un fichero `funko-list.json` con la lista de funkos. En caso de que algún usuario no exista se le añadirá automáticamente al iniciar cualquier comando con su nombre de usuario.

### Cliente
El cliente se encarga de recibir el comando introducido y gestionarlo para enviarle la información relevante al servidor.
Atributos del cliente:
- `puerto_`: Puerto por el que se conecta al servidor.
- `lineaComandos_`: Array con los parámetros introducidos por el usuario.
- `usuarioActual_`: Nombre del usuario que ha iniciado sesión.

Métodos del cliente:
- `procesarComando()`: Método que se encarga de procesar el comando introducido por el usuario y elegir la operación correspondiente para gestionar el comando.
- `listarFunkos()`: Método que se encarga de recoger el usuario actual para posteriormente enviarlo al servidor.
- `agregarFunko(client: net.Socket)`: Método que se encarga de crear un funkoSchema nuevo y enviarlo al servidor.
- `removerFunko(client: net.Socket)`: Método que se encarga de recoger el id del funko a eliminar y enviarlo al servidor.
- `actualizarFunko(client: net.Socket)`: Método que se encarga de recoger el funko a actualizar y enviarlo al servidor.
- `leerFunko(client: net.Socket)`: Método que se encarga de recoger el id del funko a leer y enviarlo al servidor.
- `showlist(funkoSchema[])`: Método que se encarga de mostrar por pantalla la lista de funkos recibida.

```ts
import net from "net";
import yargs from "yargs";
import chalk from "chalk";
import { funkoSchema } from "../schema/funkoSchema.js";
import { type } from "../types/type.js";
import { genre } from "../types/genre.js";

export class client {
  private puerto_ = 60300;
  private lineaComandos_: string[];
  private usuarioActual_: string | undefined;

  constructor(lineasComandos: string[]) {
    this.lineaComandos_ = lineasComandos;
    this.procesarComando();
  }

  private procesarComando(): void {
    const client = net.connect({ port: 60300 });
    const command = this.lineaComandos_[0];
    switch (command) {
      case "list":
        this.listarFunkos();
        client.write(
          JSON.stringify({ command: "list", user: this.usuarioActual_ }) + "\n"
        );
        break;
      case "add":
        this.agregarFunko(client);
        break;
      case "remove":
        this.removerFunko(client);
        break;
      case "update":
        this.actualizarFunko(client);
        break;
      case "read":
        this.leerFunko(client);
        break;
      default:
        console.log("Comando no válido");
        break;
    }

    client.on("data", (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());
      switch (message.type) {
        case "list":
          this.showlist(message.datos);
          break;
        case "add":
          console.log(chalk.green(message.datos));
          break;
        case "remove":
          console.log(chalk.green(message.datos));
          break;
        case "update":
          console.log(chalk.green(message.datos));
          break;
        case "read":
          this.showlist([message.datos]);
          break;
        case "user":
          console.log(chalk.red(message.datos));
          break;
        case "error":
          console.log(chalk.red(message.datos));
          break;
        default:
          console.log(chalk.red("Comando no válido"));
          break;
      }
      client.end();
    });
  }

  public actualizarFunko(client: net.Socket) {
    yargs(this.lineaComandos_)
      .command(
        "update",
        "Update a funko to the user",
        {
          user: {
            description: "Usuario name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
          name: {
            description: "Funko name",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Funko description",
            type: "string",
            demandOption: true,
          },
          type: {
            description: "Funko type",
            type: "string",
            demandOption: true,
          },
          genre: {
            description: "Funko genre",
            type: "string",
            demandOption: true,
          },
          franc: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          number: {
            description: "Funko number",
            type: "number",
            demandOption: true,
          },
          exclusive: {
            description: "Funko exclusive",
            type: "boolean",
            demandOption: true,
          },
          specialFeatures: {
            description: "Funko special features",
            type: "string",
            demandOption: true,
          },
          marketValue: {
            description: "Funko market value",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          const tipo = argv.type as type;
          const genero = argv.genre as genre;
          const funko = {
            id: argv.id,
            name: argv.name,
            description: argv.desc,
            type: tipo,
            genre: genero,
            franchise: argv.franc,
            number: argv.number,
            exclusive: argv.exclusive,
            specialFeatures: argv.specialFeatures,
            marketValue: argv.marketValue,
          };
          client.write(
            JSON.stringify({
              command: "update",
              user: argv.user,
              funko: funko,
            }) + "\n"
          );
        }
      )
      .help().argv;
  }

  public leerFunko(client: net.Socket): void {
    yargs(this.lineaComandos_)
      .command(
        "read",
        "Read a funko from the user",
        {
          user: {
            description: "Usuario name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          this.usuarioActual_ = argv.user;
          client.write(
            JSON.stringify({ command: "read", user: argv.user, id: argv.id }) +
              "\n"
          );
        }
      )
      .help().argv;
  }

  public removerFunko(client: net.Socket) {
    yargs(this.lineaComandos_)
      .command(
        "remove",
        "Remove a funko from the user",
        {
          user: {
            description: "Usuario name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          client.write(
            JSON.stringify({
              command: "remove",
              user: argv.user,
              id: argv.id,
            }) + "\n"
          );
        }
      )
      .help().argv;
  }

  public agregarFunko(client: net.Socket) {
    yargs(this.lineaComandos_)
      .command(
        "add",
        "Add a funko to the user",
        {
          user: {
            description: "Usuario name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
          name: {
            description: "Funko name",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Funko description",
            type: "string",
            demandOption: true,
          },
          type: {
            description: "Funko type",
            type: "string",
            demandOption: true,
          },
          genre: {
            description: "Funko genre",
            type: "string",
            demandOption: true,
          },
          franc: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          number: {
            description: "Funko number",
            type: "number",
            demandOption: true,
          },
          exclusive: {
            description: "Funko exclusive",
            type: "boolean",
            demandOption: true,
          },
          specialFeatures: {
            description: "Funko special features",
            type: "string",
            demandOption: true,
          },
          marketValue: {
            description: "Funko market value",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          const tipo = argv.type as type;
          const genero = argv.genre as genre;
          const funko = {
            id: argv.id,
            name: argv.name,
            description: argv.desc,
            type: tipo,
            genre: genero,
            franchise: argv.franc,
            number: argv.number,
            exclusive: argv.exclusive,
            specialFeatures: argv.specialFeatures,
            marketValue: argv.marketValue,
          };
          client.write(
            JSON.stringify({ command: "add", user: argv.user, funko: funko }) +
              "\n"
          );
        }
      )
      .help().argv;
  }

  public listarFunkos(): void {
    yargs(this.lineaComandos_)
      .command(
        "list",
        "List all the funkos",
        {
          user: {
            description: "Usuario name",
            type: "string",
            demandOption: true,
          },
        },
        (argv) => {
          this.usuarioActual_ = argv.user;
        }
      )
      .help().argv;
  }

  public showlist(funkoCollection: funkoSchema[]): void {
    funkoCollection.forEach((funko) => {
      console.log("-----------------");
      console.log("ID: " + funko.id);
      console.log("Name: " + funko.name);
      console.log("Description: " + funko.description);
      console.log("Type: " + funko.type);
      console.log("Genre: " + funko.genre);
      console.log("Franchise: " + funko.franchise);
      console.log("Number: " + funko.number);
      if (funko.exclusive) {
        console.log("Exclusive: Yes");
      } else {
        console.log("Exclusive: No");
      }
      console.log("Special Features: " + funko.specialFeatures);

      if (funko.marketValue > 100) {
        console.log("Market Value: " + chalk.green(funko.marketValue));
      } else if (funko.marketValue > 50) {
        console.log("Market Value: " + chalk.blue(funko.marketValue));
      } else if (funko.marketValue > 25) {
        console.log("Market Value: " + chalk.yellow(funko.marketValue));
      } else {
        console.log("Market Value: " + chalk.red(funko.marketValue));
      }
    });
  }
}
```

### Servidor <a name="servidor"></a>
> [Volver al índice](#índice)
El servidor es el que se encarga de gestionar las peticiones de los clientes. Para la implementación se ha creado una clase llamada server. En el constructor se crea el servidor y se le pasa una función que se ejecutará cada vez que un cliente se conecte al servidor. En esta función se crea un listener para el evento data que se ejecutará cada vez que el cliente envíe un mensaje al servidor. En este listener se parsea el mensaje recibido y se ejecuta la función correspondiente a la petición del cliente.
El único atributo que tiene la clase es el puerto en el que se ejecutará el servidor. Este puerto se ha definido como constante para que sea fácil de cambiar en caso de que se necesite.
Los métodos de la clase servidor son los siguientes:
- `compruebaUsuario()`: comprueba si el usuario existe y si no existe lo crea.
- `compuebaFunko()`: comprueba si el Funko existe en la base de datos del usuario.
- `listFunkos()`: Lee la base de datos del usuario y envía la colección de Funkos al cliente.
- `addFunko()`: Añade un Funko a la base de datos del usuario en caso de que no exista y envía un mensaje de éxito o error al cliente.
- `deleteFunko()`: Elimina un Funko de la base de datos del usuario en caso de que exista y envía un mensaje de éxito o error al cliente.
- `updateFunko()`: Actualiza un Funko de la base de datos del usuario en caso de que exista y envía un mensaje de éxito o error al cliente.
- `readFunko()`: Busca un Funko en la base de datos del usuario en caso de que exista y se lo envía al cliente.

```ts
import net from "net";
import { writeFile, readFile, accessSync, mkdirSync, constants } from "fs";
import chalk from "chalk";
import { funkoSchema } from "../schema/funkoSchema.js";

export class server {
  private puerto = 60300;
  constructor() {
    net
      .createServer((connection) => {
        console.log("A client has connected.");

        connection.on("data", (dataJSON) => {
          const message = JSON.parse(dataJSON.toString());
          const path =
            "src/ej/funko/users/" + message.user + "/funko-list.json";
          const comprobar = this.compruebaUsuario(message.user, connection);
          if (comprobar) {
            switch (message.command) {
              case "list":
                console.log("Listando Funkos...");
                this.listFunkos(path, message.user, connection);
                break;
              case "add":
                console.log("Agregando Funko...");
                this.addFunko(path, message.user, connection, message.funko);
                break;
              case "remove":
                console.log("Removiendo Funko...");
                this.removeFunko(path, message.user, connection, message.id);
                break;
              case "update":
                console.log("Actualizando Funko...");
                this.updateFunko(path, message.user, connection, message.funko);
                break;
              case "read":
                console.log("Leyendo Funko...");
                this.readFunko(path, message.user, connection, message.id);
                break;
              default:
                console.log("Comando no válido");
                break;
            }
          } else {
            console.log("Usuario no válido");
          }
        });
        connection.on("close", () => {
          console.log("A client has disconnected.");
        });
      })
      .listen(this.puerto, () => {
        console.log("Waiting for clients to connect.");
      });
  }
  public closeServer(): void {
    this.servidor.close();
  }
  public updateFunko(
    path: string,
    user: string,
    connection: net.Socket,
    funko: funkoSchema
  ): void {
    readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.red("Error: ") + "No se pudo leer el archivo.");
        return;
      } else {
        console.log(chalk.green("Success: ") + "Archivo leído correctamente.");
        const funkos: funkoSchema[] = JSON.parse(data.toString());
        if (this.compruebafunko(funko.id, funkos)) {
          //Buscar el funko con el mismo id y cambiarlo por el nuevo
          const funkosFiltrados = funkos.map((funko_) => {
            if (funko_.id === funko.id) {
              return funko;
            } else {
              return funko_;
            }
          });
          writeFile(path, JSON.stringify(funkosFiltrados), (err) => {
            if (err) {
              console.log(
                chalk.red("Error: ") + "No se pudo escribir el archivo."
              );
              return;
            } else {
              console.log(
                chalk.green("Success: ") + "Archivo escrito correctamente."
              );
              connection.write(
                JSON.stringify({
                  type: "update",
                  datos: "Funko actualizado.",
                }) + "\n"
              );
            }
          });
        } else {
          console.log(chalk.red("Error: ") + "El id no existe.");
          connection.write(
            JSON.stringify({
              type: "error",
              datos: "El funko con el id especificado no existe.",
            }) + "\n"
          );
        }
      }
    });
  }
  public readFunko(
    path: string,
    user: string,
    connection: net.Socket,
    id: number
  ): void {
    readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.red("Error: ") + "No se pudo leer el archivo.");
        return;
      } else {
        console.log(chalk.green("Success: ") + "Archivo leído correctamente.");
        const funkos: funkoSchema[] = JSON.parse(data.toString());
        if (this.compruebafunko(id, funkos)) {
          //Remover el funko
          const funkosFiltrados = funkos.find((funko) => funko.id === id);

          connection.write(
            JSON.stringify({ type: "read", datos: funkosFiltrados }) + "\n"
          );
        } else {
          console.log(chalk.red("Error: ") + "El id no existe.");
          connection.write(
            JSON.stringify({
              type: "error",
              datos: "El funko con el id especificado no existe.",
            }) + "\n"
          );
        }
      }
    });
  }

  public removeFunko(
    path: string,
    user: string,
    connection: net.Socket,
    id: number
  ): void {
    readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.red("Error: ") + "No se pudo leer el archivo.");
        return;
      } else {
        console.log(chalk.green("Success: ") + "Archivo leído correctamente.");
        //Comprobar si el id existe
        const funkos: funkoSchema[] = JSON.parse(data.toString());

        if (this.compruebafunko(id, funkos)) {
          //Remover el funko
          const funkosFiltrados = funkos.filter((funkoItem) => {
            return funkoItem.id != id;
          });

          writeFile(path, JSON.stringify(funkosFiltrados), (err) => {
            if (err) {
              console.log(
                chalk.red("Error: ") + "No se pudo escribir el archivo."
              );
              return;
            } else {
              console.log(
                chalk.green("Success: ") + "Archivo escrito correctamente."
              );
              connection.write(
                JSON.stringify({ type: "remove", datos: "Funko removido." }) +
                  "\n"
              );
            }
          });
        } else {
          console.log(chalk.red("Error: ") + "El id no existe.");
          connection.write(
            JSON.stringify({
              type: "error",
              datos: "El funko con el id especificado no existe.",
            }) + "\n"
          );
        }
      }
    });
  }

  public compruebafunko(id: number, funkos: funkoSchema[]): boolean {
    let existe = false;
    const comprobar = funkos.find((funkoItem) => {
      return funkoItem.id == id ? funkoItem : undefined;
    });

    if (comprobar != undefined) {
      existe = true;
    }
    return existe;
  }

  public compruebaUsuario(user: string, client: net.Socket): boolean {
    let existe = false;
    try {
      accessSync("src/ej/funko/users/" + user, constants.F_OK);
      existe = true;
    } catch (err) {
      client.write(
        JSON.stringify({
          type: "user",
          datos: "El usuario no existe. Se ha creado.",
        }) + "\n"
      );
      //Se creara el usuario
      mkdirSync("src/ej/funko/users/" + user);
      writeFile(
        "src/ej/funko/users/" + user + "/funko-list.json",
        JSON.stringify([]),
        (err) => {
          if (err) {
            console.log(
              chalk.red("Error: ") + "No se pudo escribir el archivo."
            );
            return;
          } else {
            console.log(
              chalk.green("Success: ") + "Archivo escrito correctamente."
            );
          }
        }
      );
    }
    return existe;
  }

  public listFunkos(
    path: string,
    user: string,
    connection: net.Socket
  ): void | funkoSchema[] {
    readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.red("Error: ") + "No se pudo leer el archivo.");
        return;
      } else {
        console.log(chalk.green("Success: ") + "Archivo leído correctamente.");
        const funkoCollection: funkoSchema[] = JSON.parse(data.toString());
        connection.write(
          JSON.stringify({ type: "list", datos: funkoCollection }) + "\n"
        );
      }
    });
  }

  public addFunko(
    path: string,
    user: string,
    connection: net.Socket,
    funko: funkoSchema
  ): void {
    readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.red("Error: ") + "No se pudo leer el archivo.");
        return;
      } else {
        console.log(chalk.green("Success: ") + "Archivo leído correctamente.");
        const funkoCollection: funkoSchema[] = JSON.parse(data.toString());

        if (!this.compruebafunko(funko.id, funkoCollection)) {
          funkoCollection.push(funko);
          writeFile(path, JSON.stringify(funkoCollection), (err) => {
            if (err) {
              console.log(
                chalk.red("Error: ") + "No se pudo escribir el archivo."
              );
              return;
            } else {
              console.log(
                chalk.green("Success: ") + "Archivo escrito correctamente."
              );
              connection.write(
                JSON.stringify({ type: "add", datos: "Funko agregado." }) + "\n"
              );
            }
          });
        } else {
          console.log(chalk.red("Error: ") + "El funko ya existe.");
          connection.write(
            JSON.stringify({ type: "error", datos: "El funko ya existe." }) +
              "\n"
          );
          return;
        }
      }
    });
  }
}

```

El servidor genera mensajes de error o éxito también en su consola.
## Conclusiones <a name="conclusiones"></a>
> [Volver al índice](#índice)
Respecto al primer ejercicio me ha hecho entender mejor como funcionan la pila de llamadas, el registro de eventos de la API y la cola de manejadores. Una vez entendido realizar la traza es solo fijarse bien en el código. Respecto al segundo, me ha ayudado a entender como se manejan los eventos y a crear procesos hijos en paralelo y así ejecutarse de forma asíncrona. Por último, gracias a la modificación de la aplicación de funkos, he podido entender del todo como realizar una aplicación cliente-servidor y como gestionar los datos de forma asíncrona.

## Referencias <a name="referencias"></a>
> [Volver al índice](#índice)

* [Yargs](https://www.npmjs.com/package/yargs)
* [Chalk](https://www.npmjs.com/package/chalk)
* [FS](https://nodejs.org/api/fs.html)
* [Net](https://nodejs.org/api/net.html)

* [Enunciado de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct09-filesystem-funko-app/)
* [Repositorio de la práctica](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101330778.github.io)

