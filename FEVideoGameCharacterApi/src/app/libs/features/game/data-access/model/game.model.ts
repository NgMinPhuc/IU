import { CharacterModel } from '../../../character/data-access/model';

export interface GameModel {
  id: string;
  name: string;
  genre: string;
  publisher: string;
  releaseDate: string;
  price: number;
  characters: CharacterModel[];
}

export interface CreateGameRequest {
  name: string;
  genre: string;
  publisher: string;
  releaseDate: string;
  price: number;
}

export interface UpdateGameRequest {
  name: string;
  genre: string;
  publisher: string;
  releaseDate: string;
  price: number;
}
