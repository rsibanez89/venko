import { Injectable, HttpService } from '@nestjs/common';
import { S3Service } from './s3.service';

@Injectable()
export class VenkoService {
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
        const fileName = this.sanitizeFileName(routine.foto);
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

    const routines: Routine[] = [];
    for(let i = 0; i < response.data.length; i++) {
      const routine = response.data[i];
      const fileName = this.sanitizeFileName(routine.fields.video);
      await this.s3Service.ensureObjectExists(routine.fields.video, fileName);
      routines.push({
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
      });
    }
    return routines;
  }

  sanitizeFileName(fineName: string): string {
    return fineName.replace("ñ", "n");
  }

  listBuckets() {
    return this.s3Service.listBuckets();
  }
}
