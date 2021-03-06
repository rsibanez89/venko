import Joi from '@hapi/joi';
import { Mood, TrainingType } from './training-history.dto';

export const TrainingHistoryItemRequestSchema = Joi.object({
  date: Joi.date()
    .raw()
    .required(),
  routineId: Joi.number(),
  routineType: Joi.string()
    .valid(...Object.values(TrainingType))
    .required(),
  lapsCount: Joi.number(),
  dificulty: Joi.string(),
  duration: Joi.string(),
  weight: Joi.number().optional().allow(null),
  comments: Joi.string().optional().allow(null),
  energyLevel: Joi.number(),
  mood: Joi.valid(...Object.values(Mood)).required(),
});

export const TrainingHistoryRequestSchema = Joi.object({
  email: Joi.string(),
  period: Joi.string(),
  items: Joi.array().items(TrainingHistoryItemRequestSchema),
}).options({ allowUnknown: true });
