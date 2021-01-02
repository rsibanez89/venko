export enum TrainingType {
  Fire = 1,
  Burn = 2,
  Powerfull = 3,
  Strong = 4,
  ByeByePaunch = 5,
  Mobility = 6,
  Flexibility = 7,
}

export enum Mood {
  Bad = 1,
  NoSoGood = 2,
  Okay = 3,
  Great = 4,
  Awesome = 5,
}

export class TrainingHistoryItem {
  date: Date;
  routineId: number;
  routineType: TrainingType;
  lapsCount: number;
  dificulty: string;
  duration: string;
  weight: number;
  comments: string;
  energyLevel: number;
  mood: Mood;
}

export class TrainingHistory {
  email: string; // Key
  period: string; // Secondary Key
  items: TrainingHistoryItem[];
}

export class TrainingHistoryForPeriodItem {
  email: string;
  date: Date;
  routineId: number;
  routineType: TrainingType;
  lapsCount: number;
  dificulty: string;
  duration: string;
  weight: number;
  comments: string;
  energyLevel: number;
  mood: Mood;
}

export class TrainingHistoryForPeriod {
  period: string; // Secondary Key
  items: TrainingHistoryForPeriodItem[];
}