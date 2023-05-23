import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFeedback } from '../../model/feedback.model';
import { HTTPResponse } from '../../model/HTTPResponse';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbackData: IFeedback;
  constructor(private http: HttpClient) {}


  public sendFeedback(feedback: IFeedback): Observable<HTTPResponse<IFeedback>> {
    return this.http.post<HTTPResponse<IFeedback>>(
      `${environment.server_Url}/feedback/`,
      feedback
    );
  }
  public getAllFeedback(): Observable<HTTPResponse<[]>> {
    return this.http.get<HTTPResponse<[]>>(
      `${environment.server_Url}/feedback/all`
    );
  }
  public getFeedbackById(feedbackId: string): Observable<HTTPResponse<IFeedback>> {
    return this.http.get<HTTPResponse<IFeedback>>(
      `${environment.server_Url}/feedback/one/${feedbackId}`
    );
  }
  public getAllUnactionedFeedback(): Observable<HTTPResponse<IFeedback[]>> {
    return this.http.get<HTTPResponse<IFeedback[]>>(
      `${environment.server_Url}/feedback/notActioned/`
    );
  }
  public actionFeedback(itemId: string): Observable<HTTPResponse<IFeedback[]>> {
    return this.http.get<HTTPResponse<IFeedback[]>>(
      `${environment.server_Url}/feedback/isActioned/${itemId}`
    );
  }

  public getNonActionedFeedback(): Observable<HTTPResponse<IFeedback>> {
    return this.http.get<HTTPResponse<IFeedback>>(
      `${environment.server_Url}/feedback/notActioned`
    );
  }
}

   
