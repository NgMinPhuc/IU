import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/data-access/response-data.model';
import { CharacterModel, CreateCharacterRequest, UpdateCharacterRequest } from '../data-access/model';
import { CharacterUrlConstant } from '../data-access/constant/character.constant';

@Injectable()
export class CharacterService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<CharacterModel[]>> {
    return this.http.get<ApiResponse<CharacterModel[]>>(CharacterUrlConstant.API.BASE);
  }

  getById(id: string): Observable<ApiResponse<CharacterModel>> {
    return this.http.get<ApiResponse<CharacterModel>>(`${CharacterUrlConstant.API.BASE}/${id}`);
  }

  create(dto: CreateCharacterRequest): Observable<ApiResponse<CharacterModel>> {
    return this.http.post<ApiResponse<CharacterModel>>(CharacterUrlConstant.API.BASE, dto);
  }

  update(id: string, dto: UpdateCharacterRequest): Observable<ApiResponse<CharacterModel>> {
    return this.http.put<ApiResponse<CharacterModel>>(`${CharacterUrlConstant.API.BASE}/${id}`, dto);
  }

  delete(id: string): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${CharacterUrlConstant.API.BASE}/${id}`);
  }
}
