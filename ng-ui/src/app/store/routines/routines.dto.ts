export class Field {
  tags: string;
  youtubeUrl: string;
  video: string;
  group: string;
  subgroup: string;
  name: string;
  difficulty: string;
}

export class Exercise {
  fields: Field;
  model: string;
  pk: number;
}

export class RoutineSummary {
  id: string;
  name: string;
  photo: string;
  youtubeUrl: string;
}
