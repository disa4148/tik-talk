import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor() { }

  http = inject(HttpClient);

  baseUrl: string = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`)
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(
      `${this.baseUrl}account/subscribers/?page=1&size=3`
    ).pipe(
      map((res: Pageble<Profile>) => res.items)
    );
  }

  getMe() {
    return this.http.get<Profile>(
      `${this.baseUrl}account/me`
    ).pipe(
      tap((res: Profile) => this.me.set(res))
    )
  }
  
}
