import { ApiProperty } from "@nestjs/swagger";
import { Mood, TrainingType } from "./training-history.dto";

export class TrainingHistoryRequest {
  @ApiProperty({
    description: "Email",
    example: "rodrigo@mail.com",
  })
  email: string;

  @ApiProperty({
    description: "Period",
    example: "2020-10-01",
  })
  period: string;

  @ApiProperty({
    description: "Items",
  })
  items: TrainingHistoryRequestItem[];
};

export class TrainingHistoryRequestItem {
  @ApiProperty({
    description: "Date",
    example: "2020-01-20",
  })
  date: Date;

  @ApiProperty({
    description: "Routine id",
    example: "1331",
  })
  routineId: number;

  @ApiProperty({
    description: "Routine type",
    examples: [TrainingType.Burn, TrainingType.Strong],
  })
  routineType: TrainingType;

  @ApiProperty({
    description: "Laps count",
    example: "5",
  })
  lapsCount: number;

  @ApiProperty({
    description: "Dificulty",
    example: "Easy",
  })
  dificulty: string;

  @ApiProperty({
    description: "Duration",
    example: "00:33:25",
  })
  duration: string;

  @ApiProperty({
    description: "Weight in kilograms",
    example: "2",
  })
  weight: number;

  @ApiProperty({
    description: "Comments",
    example: "I felt tired.",
  })
  comments: string;

  @ApiProperty({
    description: "Energy level",
    example: "5",
  })
  energyLevel: number;

  @ApiProperty({
    description: "Mood",
    examples: [Mood.Awesome, Mood.Great, Mood.Okay],
  })
  mood: Mood;
}

export class TrainingHistoryByEmailRequest {
  @ApiProperty({
    description: "Email",
    example: "rodrigo@mail.com",
  })
  email: string;

  @ApiProperty({
    description: "Period",
    example: "2020-10-01",
  })
  period: string;
}

export class DeleteTrainingHistoryByEmailRequest {
  @ApiProperty({
    description: "Email",
    example: "rodrigo@mail.com",
  })
  email: string;

  @ApiProperty({
    description: "Period",
    example: "2020-10-01",
  })
  period: string;

  @ApiProperty({
    description: "Index",
    example: "1",
  })
  index: number;
}