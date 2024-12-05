import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {ReadContactDto} from '../model/read-contact-dto';
import {CreateContactDto} from '../model/create-contact-dto';
import {UpdateContactDto} from '../model/update-contact-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = '/api/contacts';

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<ReadContactDto> {
    return this.http.get<ReadContactDto>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<ReadContactDto[]> {
    return this.http.get<ReadContactDto[]>(this.apiUrl);
  }

  create(contact: CreateContactDto): Observable<ReadContactDto> {
    return this.http.post<ReadContactDto>(this.apiUrl, contact);
  }

  edit(contactId: number, contact: UpdateContactDto): Observable<ReadContactDto> {
    return this.http.put<ReadContactDto>(this.apiUrl, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
