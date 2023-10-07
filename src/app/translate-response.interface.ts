import { TranslateLanguage } from './translate-language.interface';

export interface TranslateResponse {
  data: {
    translations: TranslateLanguage[];
  };
}
