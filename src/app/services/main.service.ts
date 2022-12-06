import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../common/data-models/members';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Member[]> {
    return this.httpClient.get<Member[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
  }
}
