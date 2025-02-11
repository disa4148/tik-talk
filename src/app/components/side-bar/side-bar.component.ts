import { Component } from '@angular/core';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { LucideAngularModule, MessageCircle, Home, Search } from 'lucide-angular';

type MenuItems = {
  label: string,
  icon: typeof Home,
  link: string,
}

@Component({
  selector: 'app-side-bar',
  imports: [ SubscriberCardComponent, LucideAngularModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {
  readonly icons = {
    home: Home,
    message: MessageCircle,
    search: Search,
  };

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
