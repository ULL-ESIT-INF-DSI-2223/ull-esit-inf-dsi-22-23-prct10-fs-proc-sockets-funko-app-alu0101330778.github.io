import { spawn } from "child_process";
import { access } from "fs";
import fs from "fs";

if (process.argv.length >= 4 && process.argv.length <= 6) {
  for (let i = 3; i < process.argv.length; i++) {
    if (
      process.argv[i] != "-l" &&
      process.argv[i] != "-c" &&
      process.argv[i] != "-w"
    ) {
      console.log("Error: Parámetros incorrectos");
      process.exit(1);
    }
  }
  const filename = process.argv[2];
  const cat = spawn("cat", [filename]);
  access(filename, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
      process.exit(1);
    } else {
      const data = cat.stdout;
      data.on("data", (chunk) => {
        for (let i = 3; i < process.argv.length; i++) {
          if (process.argv[i] == "-c") {
            console.log("Numero de caracteres: " + chunk.toString().length);
          } else if (process.argv[i] == "-l") {
            console.log(
              "Número de lineas: " + chunk.toString().split("\n").length
            );
          } else if (process.argv[i] == "-w") {
            let words = 0;
            let datos: string[] = chunk.toString().split("\n");
            datos = datos.filter((line) => line.trim() !== "");
            datos.forEach((line) => {
              words += line.split(" ").length;
            });
            console.log("Número de palabras: " + words);
          }
        }
      });
    }
  });
} else {
  console.log("Error: Parámetros incorrectos");
}
