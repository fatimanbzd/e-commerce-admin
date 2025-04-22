import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {IEnvironmentModel} from '../interfaces/environment.model';
import {IUserModel} from '../../auth/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserInformationStorageService {
  private readonly information: string;

  constructor(
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: IEnvironmentModel,
  ) {
    this.information = this.environment.settings.auth.userInformation;
  }

  getUserInformation(): IUserModel {
    return this.localStorageService.getItem(this.information) as IUserModel;
  }

  saveUserInformation(user: IUserModel) {
    this.localStorageService.setItem(this.information, user);
  }

  removeUserInformation() {
    this.localStorageService.removeItem(this.information);
  }
}
