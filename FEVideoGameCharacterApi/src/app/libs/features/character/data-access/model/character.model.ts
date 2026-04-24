export interface CharacterModel {
  id: string;
  name: string;
  role: string;
  power: number;
  blood: number;
  gameId?: string;
  gameName?: string;
}

export interface CreateCharacterRequest {
  name: string;
  role: string;
  power: number;
  blood: number;
}

export interface UpdateCharacterRequest {
  name: string;
  role: string;
  power: number;
  blood: number;
}
