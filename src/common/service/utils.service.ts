import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  
    formatDate(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  }
}
