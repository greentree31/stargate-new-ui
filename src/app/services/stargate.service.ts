import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeopleResponse } from '../models/person.model';
import { AstronautDutyResponse } from '../models/astronaut-duty.model';

@Injectable({ providedIn: 'root' })
export class StargateService {

    private readonly baseUrl = 'https://localhost:7204';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(`${this.baseUrl}/Person`);
  }

  getAstronautDuties(name: string): Observable<AstronautDutyResponse> {
    return this.http.get<AstronautDutyResponse>(
      `${this.baseUrl}/AstronautDuty/${encodeURIComponent(name)}`
    );
  }
}
