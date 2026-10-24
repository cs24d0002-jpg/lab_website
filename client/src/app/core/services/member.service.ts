import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private api = inject(ApiService);
  private readonly endpoint = '/members';

  getMembers(): Observable<Member[]> {
    return this.api.get<Member[]>(this.endpoint);
  }

  addMember(member: Member): Observable<Member> {
    return this.api.post<Member>(this.endpoint, member);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.api.put<Member>(`${this.endpoint}/${id}`, member);
  }

  deleteMember(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`${this.endpoint}/${id}`);
  }
}