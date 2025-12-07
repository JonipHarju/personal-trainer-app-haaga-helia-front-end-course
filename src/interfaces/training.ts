import type { Links } from "./links";
export interface Training {
  activity: string;
  date: string;
  duration: number;
  _links: Links;
  customerName?: string;
}

export type TrainingData = Omit<Training, "_links">;
