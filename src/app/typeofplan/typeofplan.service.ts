import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {AuthService} from "../auth.service";
import {TypeofplanData} from "./typeofplan-data.model";

@Injectable()
export class TypeofplanService {
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<TypeofplanData[]>();
  dataLoadFailed = new Subject<boolean>();
  userData: TypeofplanData;
  // @ts-ignore
  constructor(private http: Http,
              private authService: AuthService) {
  }

  onStoreData(data: TypeofplanData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);
    this.dataEdited.next(false);
    this.userData = data;
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      }
      this.http.post('https://5vlv6z38mk.execute-api.us-east-1.amazonaws.com/dev/console-paises', data, {
        headers: new Headers({Authorization: session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (result) => {
            this.dataLoadFailed.next(false);
            this.dataIsLoading.next(false);
            this.dataEdited.next(true);
          },
          (error) => {
            this.dataIsLoading.next(false);
            this.dataLoadFailed.next(true);
            this.dataEdited.next(false);
          }
        );
    });
  }

  onRetrieveData(all = true) {
    this.dataLoaded.next(null);
    this.dataLoadFailed.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      let urlParam = 'all';
      if (!all) {
        urlParam = 'single';
      }

      console.log('https://5vlv6z38mk.execute-api.us-east-1.amazonaws.com/dev/console-paises/' + urlParam + queryParam);

      this.http.get('https://5vlv6z38mk.execute-api.us-east-1.amazonaws.com/dev/console-paises/' + urlParam + queryParam, {
        headers: new Headers({Authorization: session.getIdToken().getJwtToken()})
      })
        .map(
          (response: Response) => response.json()
        )
        .subscribe(
          (data) => {
            if (all) {
              console.log(data);
              this.dataLoaded.next(data);
            } else {
              console.log(data);
              if (!data) {
                this.dataLoadFailed.next(true);
                return;
              }
              this.userData = data[0];
              this.dataEdited.next(true);
            }
          },
          (error) => {
            console.log(error);
            this.dataLoadFailed.next(true);
            this.dataLoaded.next(null);
          }
        );
    });
  }

  onDeleteData() {
    this.dataLoadFailed.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      this.http.delete('https://5vlv6z38mk.execute-api.us-east-1.amazonaws.com/dev/console-paises/?accessToken=XXX', {
        headers: new Headers({Authorization: session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.dataLoadFailed.next(true)
        );
    });
  }
}
