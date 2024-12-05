import {Injectable} from '@angular/core';
import {Contact} from '../model/contact';
import {data} from '../data';
import {HttpClient} from '@angular/common/http';
import {ReadContactDto} from '../model/read-contact-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private client: HttpClient) {
  }

  getAll(): Observable<ReadContactDto[]> {
    return this.client.get<ReadContactDto[]>('/api/contacts');
  }

  getById(id: number): Contact {
    const contactById = data.find(contact => contact.id === id);
    if (contactById) {
      return contactById;
    }
    throw new Error(`Contact by id ${id} not found`);
  }

  edit(id: number, contactUpdate: Contact): Contact {

    return contactUpdate;
  }

  delete(id: number): void {
  }
}
