import { type } from "../types/type.js";
import { genre } from "../types/genre.js";
/**
 * Funko Schema: Especiación de la estructura de un Funko
 * @type funkoSchema
 */
export type funkoSchema = {
  id: number;
  name: string;
  description: string;
  type: type;
  genre: genre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
};
