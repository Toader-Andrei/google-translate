import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateResponse } from './translate-response.interface';
import { LanguageResponse } from './language-response.interface';
import { DetectedLanguageResponse } from './detected-response.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private apiKey = `${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  getTranslation(body: any): Observable<TranslateResponse> {
    return this.http.post<TranslateResponse>(
      'https://translation.googleapis.com/language/translate/v2?key=' +
        this.apiKey,
      body
    );
  }

  getLanguages(): Observable<LanguageResponse> {
    return this.http.get<LanguageResponse>(
      'https://translation.googleapis.com/language/translate/v2/languages?key=' +
        this.apiKey
    );
  }

  getDetectedLanguage(body: any): Observable<DetectedLanguageResponse> {
    return this.http.post<DetectedLanguageResponse>(
      'https://translation.googleapis.com/language/translate/v2/detect?key=' +
        this.apiKey,
      body
    );
  }
}
