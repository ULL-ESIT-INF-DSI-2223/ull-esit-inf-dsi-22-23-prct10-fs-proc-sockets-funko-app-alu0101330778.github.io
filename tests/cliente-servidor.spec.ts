import { expect } from 'chai';
import 'mocha';
import { client } from '../src/ej/funko/cliente/client.js';
import { server } from '../src/ej/funko/server/server.js';
import { funkoSchema } from '../src/ej/funko/schema/funkoSchema.js';
import { readFile, readFileSync } from 'fs';
const servidor = new server();
const cliente = new client(["add", "--user", "Test", "--id", "61", "--name", "Funko 1", "--desc", "Funko 1", "--type", "POP", "--genre", "ANIME", "--franc", "Dragon Ball", "--number", "1", "--exclusive", "true", "--specialFeatures", "Ninguna", "--marketValue", "100"]);
const funko1 = {
    "id": 61,
    "name": "Funko 1",
    "description": "Funko 1",
    "type": "POP",
    "genre": "ANIME",
    "franchise": "Dragon Ball",
    "number": 1,
    "exclusive": true,
    "specialFeatures": "Ninguna",
    "marketValue": 100
};

setTimeout(() => {
describe ('Cliente-Servidor add', () => {
    it('Añade un funko a la coleccion', () => {
        const data: funkoSchema[] = JSON.parse(readFileSync('src/ej/funko/users/Test/funko-list.json').toString());
        const funkonuevo: funkoSchema | undefined = data.find((funko) => funko.id === 61);
        expect(funkonuevo).to.be.deep.equal(funko1);   
    });
});
}, 2000);
