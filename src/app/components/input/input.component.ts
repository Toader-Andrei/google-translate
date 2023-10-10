import { Component } from '@angular/core';
import { Language } from 'src/app/language.interface';
import { LanguageResponse } from 'src/app/language-response.interface';
import { TranslateResponse } from 'src/app/translate-response.interface';
import { TranslateService } from 'src/app/translate.service';
import { DetectedLanguageResponse } from 'src/app/detected-response.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  sourceLanguageValue: string = '';
  sourceLanguageOption: string = '';
  sourceLanguageOptions: Language[] = [];

  translatedLanguageValue: string = '';
  translatedLanguageOption: string = '';
  translatedLanguageOptions: Language[] = [];

  detectedLanguageValue!: any;

  constructor(private translateService: TranslateService) {}

  onTranslateButton() {
    const body = {
      q: this.sourceLanguageValue,
      target: this.translatedLanguageOption,
    };

    this.translateService
      .getTranslation(body)
      .subscribe((translatedText: TranslateResponse) => {
        this.translatedLanguageValue =
          translatedText.data.translations[0].translatedText;
      });

    this.translateService
      .getDetectedLanguage(body)
      .subscribe((res: DetectedLanguageResponse) => {
        this.detectedLanguageValue = res.data.detections[0][0].language;
        this.sourceLanguageOption = this.detectedLanguageValue.toUpperCase();
        console.log(this.sourceLanguageOption);
        console.log(this.translatedLanguageOption);
      });
  }

  onSwitchLanguages() {
    let auxOption = '';
    let auxValue = '';

    auxOption = this.sourceLanguageOption;
    this.sourceLanguageOption = this.translatedLanguageOption;
    this.translatedLanguageOption = auxOption;

    auxValue = this.sourceLanguageValue;
    this.sourceLanguageValue = this.translatedLanguageValue;
    this.translatedLanguageValue = auxValue;

    this.detectedLanguageValue = '';
  }

  ngOnInit() {
    this.translateService
      .getLanguages()
      .subscribe((response: LanguageResponse) => {
        this.sourceLanguageOptions = response.data.languages;
        this.translatedLanguageOptions = response.data.languages;
      });
  }
}
