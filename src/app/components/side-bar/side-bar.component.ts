import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";

type MenuItems = {
  label: string,
  icon: string,
  link: string,
}

@Component({
  selector: 'app-side-bar',
  imports: [SvgIconComponent, SubscriberCardComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {
  menuItems: MenuItems[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile'
    },
    {
      label: 'Чаты',
      icon: 'message',
      link: '/chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/'
    }
  ]
}
