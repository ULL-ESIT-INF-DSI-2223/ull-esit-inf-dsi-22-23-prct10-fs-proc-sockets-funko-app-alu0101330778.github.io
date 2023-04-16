import { client } from "./client.js";

const cliente = new client(process.argv.slice(2));

//Comandos
/*
node dist/ej/funko/cliente/ini_client.js list --user usu1
node dist/ej/funko/cliente/ini_client.js add --user usu1 --id 61 --name "Funko 1" --desc "Funko 1" --type "POP" --genre "ANIME" --franc "Dragon Ball" --number 1 --exclusive true --specialFeatures "Ninguna" --marketValue 100
node dist/ej/funko/cliente/ini_client.js remove --user usu1 --id 6
node dist/ej/funko/cliente/ini_client.js update --user usu1 --id 20 --name "Funko 100" --desc "Funko 1" --type "POP" --genre "ANIME" --franc "Dragon Ball" --number 1 --exclusive true --specialFeatures "Ninguna" --marketValue 15
node dist/ej/funko/cliente/ini_client.js read --user usu1 --id 6
*/
