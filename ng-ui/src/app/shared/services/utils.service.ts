import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public getISODateTime(date: Date): string {
    return date
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  public getISODate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  public getBeginningOfMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getMonth());
  }

  public getDate(date: Date): string {
    return date.toISOString().slice(0, 7);
  }
}
