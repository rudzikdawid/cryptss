import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor() { }

  public toolbarTitle = new BehaviorSubject<string>('Cryptss');
  public routeButton = new BehaviorSubject(null);
}
