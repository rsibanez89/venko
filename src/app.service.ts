import { Injectable, HttpService } from '@nestjs/common';
import { S3Service } from './s3service';

@Injectable()
export class AppService {
  private Host = "http://64.225.9.210";

  constructor(
    private readonly httpService: HttpService,
    private readonly s3Service: S3Service
  ) {}

  async getRoutines(userId: string): Promise<Routines[]> {
    const response = await this.httpService
      .get(`${this.Host}/getRutinasAlumnoTablet/?login=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).toPromise();
    
    return await response.data.items.map(routine => 
      {
        var fileName = this.sanitizeFileName(routine.foto);
        this.s3Service.ensureObjectExists(routine.foto, fileName);
        return ({
          id: routine.id,
          name: routine.nombre,
          photo: fileName,
          youtubeUrl: routine.url_youtube
        });
      });
  }

  async getRoutine(routineId: string): Promise<Routine[]> {
    const response = await this.httpService
      .get(`${this.Host}/getRutinaMobile/?tiporutina=ejercitarse&rutina=${routineId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).toPromise();

    return await response.data.map(routine => 
      {
        var fileName = this.sanitizeFileName(routine.fields.video);
        this.s3Service.ensureObjectExists(routine.fields.video, fileName);
        return {
          fields: {
            tags: routine.fields.tags,
            youtubeUrl: routine.fields.url_youtube,
            video: fileName,
            group: routine.fields.grupo,
            subgroup: routine.fields.subgrupo,
            name: routine.fields.nombre,
            difficulty: routine.fields.dificultad
          },
          model: routine.model,
          pk: routine.pk
        };
      });
  }

  sanitizeFileName(fineName: string): string {
    return fineName.replace("ñ", "n");
  }
}
