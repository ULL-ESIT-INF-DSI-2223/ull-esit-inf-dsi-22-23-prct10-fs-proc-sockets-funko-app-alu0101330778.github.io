import { spawn } from "child_process";
import { access } from "fs";
import fs from "fs";

const lineas = spawn("wc", ["-l"]);
const caracteres = spawn("wc", ["-m"]);
const palabras = spawn("wc", ["-w"]);
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
  access(filename, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
      process.exit(1);
    } else {
      const cat = spawn("cat", [filename]);

      for (let i = 3; i < process.argv.length; i++) {
        if (process.argv[i] == "-l") {
          cat.stdout.pipe(lineas.stdin);
        }
        if (process.argv[i] == "-c") {
          cat.stdout.pipe(caracteres.stdin);
        }
        if (process.argv[i] == "-w") {
          cat.stdout.pipe(palabras.stdin);
        }
      }
    }
  });
} else {
  console.log("Error: Parámetros incorrectos");
}
//Leer la cantidad de lineas
lineas.stdout.on("data", (data) => {
  const result = parseInt(data.toString()) + 1;
  console.log(`El archivo tiene ` + result + ` lineas`);
});
//Leer la cantidad de caracteres
caracteres.stdout.on("data", (data) => {
  const result = parseInt(data.toString());
  console.log(`El archivo tiene ` + result + ` caracteres`);
});
//Leer la cantidad de palabras
palabras.stdout.on("data", (data) => {
  const result = parseInt(data.toString());
  console.log(`El archivo tiene ` + result + ` palabras`);
});
