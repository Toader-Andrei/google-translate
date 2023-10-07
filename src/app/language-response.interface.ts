import { Language } from './language.interface';

export interface LanguageResponse {
  data: {
    languages: Language[];
  };
}
