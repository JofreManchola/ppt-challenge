import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Program } from './program.entity';
import { UploadProgramDto } from './upload-program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

@Injectable()
export class ProgramsService {
  private openai: OpenAI;

  constructor(@InjectRepository(Program) private repo: Repository<Program>) {
    console.log('ProgramsService created');

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Set in .env file
    });
  }

  /**
   * WIP - Use OpenAI to generate text based on a prompt and then make it more structured
   */
  async convertEligibilityTextToJson(eligibilityText: string): Promise<any> {
    const prompt = `Convert the following text into a structured JSON array under the key "requirements":---${eligibilityText}---Use the following format:{  "requirements": [    { "name": "us_residency", "value": "true" },    { "name": "minimum_age", "value": "18" },    { "name": "insurance_coverage", "value": "true" },    { "name": "eligibility_length", "value": "12m" }  ]}Ensure all key names are in snake_case and represent the eligibility conditions accurately.    `;

    try {
      console.log('prompt', { prompt });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Use gpt-3.5-turbo if needed
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that converts text into structured JSON.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 300,
        // response_format: 'json',
      });

      console.log('response', { response });

      if (!response.choices[0].message.content) return {};

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to convert text to JSON');
    }
  }

  /**
   * WIP - Use OpenAI to generate text based on a prompt and then make it more structured
   */
  // async getRequirements(eligibilityDetails: string) {
  //   const expectedObject = {
  //     requirements: [
  //       {
  //         name: 'us_residency',
  //         value: `true`,
  //       },
  //       {
  //         name: `minimum_age`,
  //         value: `0`,
  //       },
  //       {
  //         name: `insurance_coverage`,
  //         value: `true`,
  //       },
  //       {
  //         name: `eligibility_length`,
  //         value: `12m`,
  //       },
  //     ],
  //   };

  //   const requirements = await this.generateText(
  //     `Fill all the values in the object ${JSON.stringify(expectedObject)} based on the text "${eligibilityDetails}"`,
  //   );

  //   return requirements ?? expectedObject;
  // }

  /**
   * WIP - Use OpenAI to generate text based on a prompt and then make it more structured
   */
  // async getMinOutOfPocket(ProgramDetails: string) {
  //   const minOutOfPocket = await this.generateText(
  //     `What is the "min out of pocket" based on the text "${ProgramDetails}"?`,
  //   );
  //
  //   return minOutOfPocket ?? '0.00';
  // }

  createProgram(data: Partial<Program>) {
    const program = this.repo.create(data);
    return this.repo.save(program);
  }

  async uploadProgram(data: Partial<UploadProgramDto>) {
    // TODO: Improve this mapping
    const expectedOutputStructure = {
      program_name: data.ProgramName,
      coverage_eligibilities: data.CoverageEligibilities, // Array
      program_type: data.AssistanceType,
      requirements: [
        {
          /**
           * TODO: rules-based logic
           * 1. Default true
           */
          name: 'us_residency',
          value: 'true', // TODO: AI powered based on data.EligibilityDetails,
        },
        {
          /**
           * TODO: rules-based logic
           * 1. Greater than 0
           */
          name: 'minimum_age',
          value: '18', // TODO: AI powered based on data.EligibilityDetails,
        },
        {
          /**
           * TODO: rules-based logic
           * 1. Default false
           */
          name: 'insurance_coverage',
          value: 'true', // TODO: AI powered based on data.EligibilityDetails,
        },
        {
          name: 'eligibility_length',
          value: '12m', // TODO: AI powered based on data.EligibilityDetails,
        },
      ],
      benefits: [
        {
          name: 'max_annual_savings',
          value: data.AnnualMax, // TODO: Fix format based on data.AnnualMax,
        },
        {
          name: 'min_out_of_pocket',
          value: data.ProgramDetails, // TODO: AI powered based on data.ProgramDetails,
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
          eligibility: data.EligibilityDetails, // TODO: AI powered summary based on data.EligibilityDetails
          program: data.ProgramDetails, // TODO: AI powered summary based on data.ProgramDetails
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
