import net from "net";
import yargs from "yargs";
import chalk from "chalk";
import { funkoSchema } from "../schema/funkoSchema.js";
import { type } from "../types/type.js";
import { genre } from "../types/genre.js";

/**
 * Clase cliente
 * @class client
 */
export class client {
  private puerto_ = 60300;
  private lineaComandos_: string[];
  private usuarioActual_: string | undefined;

  /**
   * Constructor de la clase cliente
   * @param lineasComandos Lineas de comandos
   */
  constructor(lineasComandos: string[]) {
    this.lineaComandos_ = lineasComandos;
    this.procesarComando();
  }
  /**
   * Procesa el comando introducido por el usuario.
   */
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
    /**
     * Gestiona los datos recibidos del servidor.
     */
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
  /**
   * Gestiona el comando update y envía los datos al servidor.
   * @param client Conexión con el servidor
   */
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
  /**
   * Gestiona el comando read y envía los datos al servidor.
   * @param client Conexión con el servidor
   */
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
  /**
   * Gestiona el comando remove y envía los datos al servidor.
   * @param client Conexión con el servidor
   */
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
  /**
   * Gestiona el comando add y envía los datos al servidor.
   * @param client Conexión con el servidor
   */
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
  /**
   * Gestiona el comando list y envía los datos al servidor.
   * @param client Conexión con el servidor
   */
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
  /**
   * Muestra la lista de Funkos recibida.
   * @param funkoCollection Colección de Funkos
   */
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
