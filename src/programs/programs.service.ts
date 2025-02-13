import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Program } from './program.entity';
import { UploadProgramDto } from './upload-program.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramsService {
  constructor(@InjectRepository(Program) private repo: Repository<Program>) {
    console.log('ProgramsService created');
  }

  createProgram(data: Partial<Program>) {
    console.log('data', data);

    const program = this.repo.create(data);
    return this.repo.save(program);
  }

  uploadProgram(data: Partial<UploadProgramDto>) {
    // TODO: Improve this mapping
    const expectedOutputStructure = {
      program_name: data.ProgramName,
      coverage_eligibilities: data.CoverageEligibilities, // Array
      program_type: data.AssistanceType,
      requirements: [
        {
          name: 'us_residency',
          value: 'true', // TODO: AI powered based on data.EligibilityDetails
        },
        {
          name: 'minimum_age',
          value: '18', // TODO: AI powered based on data.EligibilityDetails
        },
        {
          name: 'insurance_coverage',
          value: 'true', // TODO: AI powered based on data.EligibilityDetails
        },
        {
          name: 'eligibility_length',
          value: '12m', // TODO: AI powered based on data.EligibilityDetails
        },
      ],
      benefits: [
        {
          name: 'max_annual_savings',
          value: data.AnnualMax, // TODO: Fix format based on data.AnnualMax
        },
        {
          name: 'min_out_of_pocket',
          value: data.ProgramDetails, // TODO: AI powered based on data.ProgramDetails
        },
      ],
      forms: [
        {
          name: 'Enrollment Form',
          link: data.EnrollmentURL,
        },
      ],
      funding: {
        evergreen: true, // TODO: TBD. Not clear from the data
        current_funding_level: 'Data Not Available', // TODO: TBD. Not clear from the data
      },
      details: [
        {
          eligibility:
            'Patient must have commercial insurance and be a legal resident of the US',
          program:
            'Patients may pay as little as $0 for every month of Dupixent',
          renewal: data.AddRenewalDetails, // TODO: AI powered summary based on data.AddRenewalDetails
          income: data.IncomeDetails,
        },
      ],
    };

    const programData: Partial<Program> = {
      id: data.ProgramID,
      name: data.ProgramName,
      description: JSON.stringify(expectedOutputStructure),
    };

    const program = this.repo.create(programData);
    return this.repo.save(program);
  }

  async findOne(id: number) {
    const program = await this.repo.findOneBy({ id });

    if (!program?.description) {
      return null;
    }

    return JSON.parse(program.description) as Partial<Program>;
  }
}
