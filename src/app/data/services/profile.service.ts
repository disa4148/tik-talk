import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor() { }

  http = inject(HttpClient)

  baseUrl: string = 'https://icherniakov.ru/yt-course/'

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`)
  }
}
