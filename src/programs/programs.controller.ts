import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProgramDto } from './dtos/create-program.dto';
import { ProgramsService } from './programs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProgramDto } from './dtos/upload-program.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Program } from './program.entity';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {
    console.log('ProgramsController created');
  }

  @Post()
  createProgram(@Body() body: CreateProgramDto) {
    console.log('POST createProgram');
    return this.programsService.createProgram(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProgram(@UploadedFile() file: Express.Multer.File) {
    console.log('POST uploadProgram');
    try {
      const jsonData = JSON.parse(file.buffer.toString());
      console.log('jsonData', jsonData);

      const dtoInstance = plainToInstance(UploadProgramDto, jsonData);
      // const dtoInstance = plainToInstance(CreateProgramDto, jsonData);
      console.log('dtoInstance', dtoInstance);
      const errors = await validate(dtoInstance);
      console.log('errors', errors);

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      const program = await this.programsService.uploadProgram(dtoInstance);

      const partialProgram: Partial<Program> = program;
      delete partialProgram.description;

      return partialProgram;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/:id')
  async getProgram(@Param('id') id: number) {
    console.log('id', { id });

    const program = await this.programsService.findOne(id);

    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return program;
  }
}
