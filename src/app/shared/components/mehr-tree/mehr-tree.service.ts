import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MehrTreeService {
  private _requestNodeInfoSubject = new Subject<number>();
  requestNodeInfo$ = this._requestNodeInfoSubject.asObservable();

  private _responseNodeInfoSubject = new Subject<any>();
  responseNodeInfo$ = this._responseNodeInfoSubject.asObservable();

  private _submittedNodeFormSubject = new Subject<any>();
  submittedNodeForm$ = this._submittedNodeFormSubject.asObservable();

  private _updatedNodeSubject = new Subject<any>();
  updatedNode$ = this._updatedNodeSubject.asObservable();

  private _acceptedRemoveNodeSubject = new Subject<any>();
  acceptedRemoveNode$ = this._acceptedRemoveNodeSubject.asObservable();

  private _deletedNodeSubject = new Subject<any>();
  deletedNode$ = this._deletedNodeSubject.asObservable();

  setResponseNodeInfoSubject(value: any) {
    this._responseNodeInfoSubject.next(value);
  }

  setRequestInfoSubject(value: number) {
    this._requestNodeInfoSubject.next(value);
  }

  setSubmittedNodeForm(model: any) {
    this._submittedNodeFormSubject.next(model);
  }

  setUpdatedNodeSubject(model: any) {
    this._updatedNodeSubject.next(model);
  }

  setAcceptedRemoveNodeSubject(model: any) {
    this._acceptedRemoveNodeSubject.next(model);
  }

  setDeletedNodeSubject(model: any) {
    this._deletedNodeSubject.next(model);
  }

  // setOriginDataSubject(data: any[]) {
  //   this.originDataSubject.next(data);
  // }
}
