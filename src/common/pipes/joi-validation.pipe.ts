import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  public transform(val: any) {
    const { error, value } = this.schema.validate(val);
    if (error) {
      throw new BadRequestException('Validation failed', error.message);
    }
    return value;
  }
}
