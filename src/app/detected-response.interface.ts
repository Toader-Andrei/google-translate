import { Detected } from './detected.interface';

export interface DetectedLanguageResponse {
  data: {
    detections: Detected[][];
  };
}
