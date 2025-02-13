import { IsJSON, IsNumber, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsJSON()
  description: string;
}
