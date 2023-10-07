import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateResponse } from './translate-response.interface';
import { LanguageResponse } from './language-response.interface';
import { DetectedLanguageResponse } from './detected-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) {}

  getTranslation(body: any): Observable<TranslateResponse> {
    return this.http.post<TranslateResponse>(
      'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDQepWeZaDiE81zKBt3FUbUU1aVxe5flqQ',
      body
    );
  }

  getLanguages(): Observable<LanguageResponse> {
    return this.http.get<LanguageResponse>(
      'https://translation.googleapis.com/language/translate/v2/languages?key=AIzaSyDQepWeZaDiE81zKBt3FUbUU1aVxe5flqQ'
    );
  }

  // getV3Languages() {
  //   return this.http.get(
  //     'https://translate.googleapis.com/v3/projects/1012647738305/supportedLanguages?key=AIzaSyDQepWeZaDiE81zKBt3FUbUU1aVxe5flqQ'
  //   );
  // }

  getDetectedLanguage(body: any): Observable<DetectedLanguageResponse> {
    return this.http.post<DetectedLanguageResponse>(
      'https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyDQepWeZaDiE81zKBt3FUbUU1aVxe5flqQ',
      body
    );
  }
}
