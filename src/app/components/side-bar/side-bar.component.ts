import { Component, inject } from '@angular/core';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { LucideAngularModule, MessageCircle, Home, Search, ChevronRight, Settings } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

type MenuItems = {
  label: string,
  icon: typeof Home,
  link: string,
}

@Component({
  selector: 'app-side-bar',
  imports: [SubscriberCardComponent, LucideAngularModule, RouterLink, AsyncPipe, ImgUrlPipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  readonly icons = {
    home: Home,
    message: MessageCircle,
    search: Search,
    chevronRight: ChevronRight,
    settings: Settings,
  };

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  menuItems: MenuItems[] = [
    {
      label: 'Моя страница',
      icon: this.icons.home,
      link: '/profile'
    },
    {
      label: 'Чаты',
      icon: this.icons.message,
      link: '/chats'
    },
    {
      label: 'Поиск',
      icon: this.icons.search,
      link: '/'
    }
  ]
}
