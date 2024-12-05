import {Injectable} from '@angular/core';
import {Contact} from '../model/contact';
import {HttpClient} from '@angular/common/http';
import {ReadContactDto} from '../model/read-contact-dto';
import {Observable} from 'rxjs';
import {CreateContactDto} from '../model/create-contact-dto';

const url = '/api/contacts';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private client: HttpClient) {
  }


  getAll(): Observable<ReadContactDto[]> {
    return this.client.get<ReadContactDto[]>(url);
  }

  getById(id: number): Observable<ReadContactDto> {
    return this.client.get<ReadContactDto>(`${url}/${id}`);
  }

  edit(id: number, contactUpdate: Contact): Observable<ReadContactDto> {
    return this.client.put<ReadContactDto>(`${url}/${id}`, contactUpdate);
  }

  delete(id: number): Observable<void> {
    return this.client.delete<void>(`${url}/${id}`);
  }

  create(result: CreateContactDto): Observable<ReadContactDto> {
    return this.client.post<ReadContactDto>(url, result);
  }
}
