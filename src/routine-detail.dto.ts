interface Field {
  tags: string,
  youtubeUrl: string,
  video: string,
  group: string,
  subgroup: string,
  name: string,
  difficulty: string
}

interface Routine {
  fields: Field,
  model: string,
  pk: number,
}