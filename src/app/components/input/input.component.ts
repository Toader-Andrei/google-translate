import { Component } from '@angular/core';
import { Language } from 'src/app/language.interface';
import { LanguageResponse } from 'src/app/language-response.interface';
import { TranslateResponse } from 'src/app/translate-response.interface';
import { TranslateService } from 'src/app/translate.service';
import { Detected } from 'src/app/detected.interface';
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

  switchedsourceLanguageOption: string = '';
  switchedsourceLanguageValue: string = '';

  switchedtranslatedLanguageOption: string = '';
  switchedtranslatedLanguageValue: string = '';

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
        this.sourceLanguageOption = this.detectedLanguageValue;
        this.sourceLanguageOptions.push(this.detectedLanguageValue);
      });
  }

  onSwitchLanguages() {
    this.switchedsourceLanguageOption = this.sourceLanguageOption;

    this.switchedtranslatedLanguageOption = this.translatedLanguageOption;

    this.translatedLanguageOption = this.switchedsourceLanguageOption;

    this.sourceLanguageOption = this.switchedtranslatedLanguageOption;

    this.switchedsourceLanguageValue = this.sourceLanguageValue;

    this.switchedtranslatedLanguageValue = this.translatedLanguageValue;

    this.sourceLanguageValue = this.switchedtranslatedLanguageValue;

    this.translatedLanguageValue = this.switchedsourceLanguageValue;
  }

  ngOnInit() {
    this.translateService
      .getLanguages()
      .subscribe((response: LanguageResponse) => {
        this.sourceLanguageOptions = response.data.languages;
        this.translatedLanguageOptions = response.data.languages;
      });
    // this.translateService.getV3Languages().subscribe();
  }
}
