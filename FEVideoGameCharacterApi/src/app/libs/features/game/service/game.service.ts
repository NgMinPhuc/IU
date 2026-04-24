import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/data-access/response-data.model';
import { GameModel, CreateGameRequest, UpdateGameRequest } from '../data-access/model';
import { GameUrlConstant } from '../data-access/constant/game.constant';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<GameModel[]>> {
    return this.http.get<ApiResponse<GameModel[]>>(GameUrlConstant.API.BASE);
  }

  getById(id: string): Observable<ApiResponse<GameModel>> {
    return this.http.get<ApiResponse<GameModel>>(`${GameUrlConstant.API.BASE}/${id}`);
  }

  create(dto: CreateGameRequest): Observable<ApiResponse<GameModel>> {
    return this.http.post<ApiResponse<GameModel>>(GameUrlConstant.API.BASE, dto);
  }

  update(id: string, dto: UpdateGameRequest): Observable<ApiResponse<GameModel>> {
    return this.http.put<ApiResponse<GameModel>>(`${GameUrlConstant.API.BASE}/${id}`, dto);
  }

  delete(id: string): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${GameUrlConstant.API.BASE}/${id}`);
  }

  addCharacter(gameId: string, characterId: string): Observable<ApiResponse<GameModel>> {
    return this.http.post<ApiResponse<GameModel>>(`${GameUrlConstant.API.BASE}/${gameId}/characters/${characterId}`, {});
  }

  removeCharacter(gameId: string, characterId: string): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${GameUrlConstant.API.BASE}/${gameId}/characters/${characterId}`);
  }
}
