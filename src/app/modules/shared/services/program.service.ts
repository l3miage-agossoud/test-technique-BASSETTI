import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../interfaces/program.interface';
import { Material } from '../interfaces/material.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>('http://localhost:3000/programs');
  }

  getMaterial(id: Material): Observable<Material> {
    return this.http.get<Material>(`http://localhost:3000/materials/${id}`);
  }
}
