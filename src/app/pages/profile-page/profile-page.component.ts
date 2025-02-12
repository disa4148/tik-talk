import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { UserRoundPen, CirclePlus } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, LucideAngularModule, RouterLink, ImgUrlPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})

export class ProfilePageComponent {
  readonly userRoundPenIcon = UserRoundPen;
  readonly circlePlusIcon = CirclePlus;
  
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  subscribers$ = this.profileService.getSubscribersList(6);
  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getProfile(id);
    })
  );
}
