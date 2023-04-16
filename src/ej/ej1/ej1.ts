import { access, constants, watch } from "fs";

//Se tiene que introducir el path de un fichero por linea de comandos
if (process.argv.length !== 3) {
  console.log("Please, specify a file"); //Si no se especifica se acaba el programa
} else {
  const filename = process.argv[2]; //En caso de que se especifique se guarda el path en una variable

  access(filename, constants.F_OK, (err) => {
    //Se comprueba que se puede acceder al fichero
    if (err) {
      //Si no se puede se acaba el programa
      console.log(`File ${filename} does not exist`);
    } else {
      //Si se puede se empieza a observar el fichero
      console.log(`Starting to watch file ${filename}`); //1º mensaje que sale por pantalla

      const watcher = watch(process.argv[2]); //Se empieza a observar el fichero

      watcher.on("change", () => {
        //Si se modifica el fichero se muestra un mensaje por pantalla
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`); //2º mensaje que sale por pantalla
    }
  });
}
