import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  getISODateTime(date: Date): string {
    return date
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  getISODate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
