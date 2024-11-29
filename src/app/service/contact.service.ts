import {Injectable} from '@angular/core';
import {Contact} from '../model/contact';
import {data} from '../data';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {
  }

  getAll(): Contact[] {
    return data;
  }

  getById(id: number): Contact {
    const contactById = data.find(contact => contact.id === id);
    if (contactById) {
      return contactById;
    }
    throw new Error(`Contact by id ${id} not found`);
  }

  edit(id: number, contactUpdate: Contact): Contact {
    const all = this.getAll();

    const contactIndex = all.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      throw new Error(`Contact by id ${id} not found`);
    }

    all[contactIndex] = contactUpdate;
    return all[contactIndex];
  }

  delete(id: number): Contact {
    const all = this.getAll();

    const contactIndex = all.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      throw new Error(`Contact by id ${id} not found`);
    }
    let contactToDelete = all[contactIndex];
    all.splice(contactIndex, 1);

    return contactToDelete;
  }
}
