import net from "net";
import { writeFile, readFile, accessSync, mkdirSync, constants } from "fs";
import chalk from "chalk";
import { funkoSchema } from "../schema/funkoSchema.js";

/**
 * Clase que representa el servidor
 * @class server
 */
export class server {
  private puerto = 60300;
  /**
   * Constructor de la clase
   * Crea el servidor y escucha en el puerto 60300
   * En caso de que llege un mensaje, se comprueba el usuario y el comando
   * Se ejecuta la función correspondiente al comando
   */
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
  /**
   * Lee el fichero y comprueba que el id existe, en caso de que si, actualiza el funko de la base de datos
   * y devuelve el cliente un mensaje de éxito, en caso de que no, devuelve un mensaje de error
   * @param path Ruta del archivo
   * @param user Usuario
   * @param connection Conexión
   * @param funko Objeto funko
   */
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
  /**
   * Lee el fichero y comprueba que el id existe, en caso de que si, devuelve el funko al cliente
   * en caso de que no, devuelve un mensaje de error.
   * @param path Ruta del archivo
   * @param user Usuario
   * @param connection Conexión
   * @param id Id del funko
   */
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
  /**
   * Lee el fichero y comprueba que el id existe, en caso de que si, elimina el funko de la base de datos
   * en caso de que no, devuelve un mensaje de error.
   * @param path Ruta del archivo
   * @param user Usuario
   * @param connection Conexión
   * @param id Id del funko
   */
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
  /**
   * Comprueba si el funko existe en el array de funkos
   * @param id Id del funko
   * @param funkos Array de funkos
   * @returns true si existe, false si no existe
   */
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
  /**
   * Comprueba si el usuario existe
   * @param user Nombre del usuario
   * @param client Conexión
   * @returns true si existe, false si no existe
   */
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
  /**
   * Lee el fichero y devuelve al cliente una lista de funkos.
   * @param path Ruta del archivo
   * @param user Usuario
   * @param connection Conexión
   */
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
  /**
   * Lee el fichero y comprueba si el id existe, en caso de que si, devuelve un mensaje de error al cliente.
   * En caso de que no, añade el funko a la base de datos y devuelve un mensaje de éxito el cliente.
   * @param path Ruta del archivo
   * @param user Usuario
   * @param connection Conexión
   * @param funko Objeto funko
   */
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
