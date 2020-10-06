export enum TrainingType {
  Fire = 1,
  Burn = 2,
  Powerfull = 3,
  Strong = 4,
  ByeByePaunch = 5,
  Mobility = 6,
  flexibility = 7,
}

export enum Mood {
  Awesome = 1,
  Great = 2,
  Okay = 3,
  NoSoGood = 4,
  Bad = 5,
}

export class TrainingHistoryItem {
  date: Date;
  routineId: number;
  routineType: TrainingType;
  lapsCount: number;
  dificulty: string;
  duration: string;
  weight: string;
  comments: string;
  energyLevel: number;
  mood: Mood;
}

export class TrainingHistory {
  email: string; // Key
  period: string; // Secondary Key
  items: TrainingHistoryItem[];
}
